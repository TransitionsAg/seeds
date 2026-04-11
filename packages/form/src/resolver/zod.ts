import type { z } from "zod";
import type { Resolver } from "./index.ts";
import type { InputAttrs } from "../input/attrs.ts";
import type { FormErrors } from "../errors/index.ts";

/**
 * Unwrap Zod wrapper types to reach the inner schema.
 * Handles ZodOptional, ZodNullable, ZodDefault, ZodCatch,
 * ZodBranded, ZodPipeline, ZodLazy, and ZodEffects (refinements).
 */
function unwrap(schema: z.ZodTypeAny): z.ZodTypeAny {
  // deno-lint-ignore no-explicit-any
  const def = schema._def as any;
  switch (def.typeName) {
    case "ZodOptional":
    case "ZodNullable":
      return unwrap(def.innerType);
    case "ZodDefault":
    case "ZodCatch":
      return unwrap(def.innerType);
    case "ZodBranded":
      return unwrap(def.type);
    case "ZodPipeline":
      return unwrap(def.in);
    case "ZodLazy":
      return unwrap(def.getter());
    case "ZodEffects":
      return unwrap(def.schema);
    default:
      return schema;
  }
}

/** Check if a schema is optional (or has a default) by walking wrappers. */
function isSchemaOptional(schema: z.ZodTypeAny): boolean {
  // deno-lint-ignore no-explicit-any
  const def = schema._def as any;
  switch (def.typeName) {
    case "ZodOptional":
    case "ZodDefault":
      return true;
    case "ZodNullable":
    case "ZodCatch":
    case "ZodBranded":
    case "ZodEffects":
      return isSchemaOptional(def.innerType ?? def.type ?? def.schema);
    case "ZodPipeline":
      return isSchemaOptional(def.in);
    case "ZodLazy":
      return isSchemaOptional(def.getter());
    default:
      return false;
  }
}

/** Extract {@linkcode InputAttrs} from a Zod schema's internal checks. */
function extractAttrs(schema: z.ZodTypeAny): InputAttrs {
  const attrs: InputAttrs = {};

  if (!isSchemaOptional(schema)) {
    attrs.required = true;
  }

  const inner = unwrap(schema);
  // deno-lint-ignore no-explicit-any
  const def = inner._def as any;
  const checks: { kind: string; value?: number; regex?: RegExp }[] = def.checks ?? [];

  switch (def.typeName) {
    case "ZodString":
      for (const c of checks) {
        if (c.kind === "min" && c.value !== undefined) {
          attrs.minLength = c.value;
        }
        if (c.kind === "max" && c.value !== undefined) {
          attrs.maxLength = c.value;
        }
        if (c.kind === "regex" && c.regex) attrs.pattern = c.regex.source;
      }
      break;
    case "ZodNumber":
      for (const c of checks) {
        if (c.kind === "min" && c.value !== undefined) attrs.min = c.value;
        if (c.kind === "max" && c.value !== undefined) attrs.max = c.value;
        if (c.kind === "multipleOf" && c.value !== undefined) {
          attrs.step = c.value;
        }
      }
      break;
  }

  return attrs;
}

/**
 * Walk a Zod object schema by key path and return the sub-schema at that path.
 * Returns `undefined` if the path doesn't resolve to a schema.
 */
function schemaAtPath(root: z.ZodTypeAny, path: string[]): z.ZodTypeAny | undefined {
  // deno-lint-ignore no-explicit-any
  let current: any = root;
  for (const key of path) {
    current = unwrap(current);
    const shape = current._def?.shape?.();
    if (!shape || !(key in shape)) return undefined;
    current = shape[key];
  }
  return current;
}

/**
 * Build a {@linkcode FormErrors} tree from a Zod error.
 * Each issue's `path` is used to place the error message at the correct leaf.
 */
function zodErrorsToFormErrors<T>(
  // deno-lint-ignore no-explicit-any
  error: z.ZodError<any>,
  template: FormErrors<T>,
): FormErrors<T> {
  // deno-lint-ignore no-explicit-any
  const result: any = structuredClone(template);

  for (const issue of error.issues) {
    if (issue.path.length === 0) continue;
    // deno-lint-ignore no-explicit-any
    let target: any = result;
    for (let i = 0; i < issue.path.length - 1; i++) {
      const key = issue.path[i];
      if (target[key] === undefined || target[key] === null) {
        target[key] = {};
      }
      target = target[key];
    }
    const leaf = issue.path[issue.path.length - 1];
    const existing = target[leaf];
    if (Array.isArray(existing)) {
      existing.push(issue.message);
    } else {
      target[leaf] = [issue.message];
    }
  }

  return result;
}

/** Build a blank {@linkcode FormErrors} template where every leaf is `null`. */
// deno-lint-ignore no-explicit-any
function errorsTemplate(schema: z.ZodTypeAny): any {
  const unwrapped = unwrap(schema);
  // deno-lint-ignore no-explicit-any
  const def = unwrapped._def as any;
  if (def.typeName === "ZodObject") {
    // deno-lint-ignore no-explicit-any
    const result: any = {};
    const shape = def.shape();
    for (const key in shape) {
      const inner = unwrap(shape[key]);
      // deno-lint-ignore no-explicit-any
      if ((inner._def as any).typeName === "ZodObject") {
        result[key] = errorsTemplate(inner);
      } else {
        result[key] = null;
      }
    }
    return result;
  }
  return null;
}

/**
 * Creates a {@linkcode Resolver} from a Zod schema.
 *
 * Uses `safeParseAsync` for both per-field and full-form validation,
 * so async Zod refinements work out of the box.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 * import { zodResolver } from "@transitionsag/form/resolver/zod";
 * import { useForm } from "@transitionsag/form";
 *
 * const schema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * });
 *
 * const { Form, Field } = useForm({
 *   initialValues: { email: "", password: "" },
 *   resolver: zodResolver(schema),
 *   onSubmit: (v) => console.log(v),
 * });
 * ```
 */
export function zodResolver<S extends z.ZodObject<z.ZodRawShape>>(schema: S): Resolver<z.infer<S>> {
  type T = z.infer<S>;
  const template = errorsTemplate(schema) as FormErrors<T>;

  return {
    attrs(path) {
      const sub = schemaAtPath(schema, path);
      if (!sub) return {};
      return extractAttrs(sub);
    },

    async validate(path, value) {
      const sub = schemaAtPath(schema, path);
      if (!sub) return null;
      const result = await sub.safeParseAsync(value);
      if (result.success) return null;
      return result.error.issues.map((i) => i.message);
    },

    async validateAll(values: T) {
      const result = await schema.safeParseAsync(values);
      if (result.success) return structuredClone(template);
      return zodErrorsToFormErrors<T>(result.error, template);
    },
  };
}
