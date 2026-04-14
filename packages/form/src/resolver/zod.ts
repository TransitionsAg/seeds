import type { ZodMiniObject } from "zod/v4/mini";
import type { output } from "zod/v4/mini";
import type { Resolver } from "./index.ts";
import type { InputAttrs } from "../input/attrs.ts";
import type { FormErrors } from "../errors/index.ts";

type MiniSchema = {
  def: Record<string, unknown>;
  safeParseAsync(data: unknown): Promise<{
    success: boolean;
    error?: { issues: { path: (string | number)[]; message: string }[] };
    data?: unknown;
  }>;
};

/**
 * Unwrap Zod Mini wrapper types to reach the inner schema.
 * Handles optional, nullable, default, catch.
 */
function unwrap(schema: MiniSchema): MiniSchema {
  const type = schema.def.type as string;
  if (type === "optional" || type === "nullable" || type === "default" || type === "catch") {
    return schema.def.innerType as MiniSchema;
  }
  return schema;
}

/** Check if a schema is optional (or has a default) by walking wrappers. */
function isSchemaOptional(schema: MiniSchema): boolean {
  const type = schema.def.type as string;
  if (type === "optional" || type === "default") return true;
  if (type === "nullable" || type === "catch") {
    return isSchemaOptional(schema.def.innerType as MiniSchema);
  }
  return false;
}

/** Extract {@linkcode InputAttrs} from a Zod Mini schema's checks. */
function extractAttrs(schema: MiniSchema): InputAttrs {
  const attrs: InputAttrs = {};

  if (!isSchemaOptional(schema)) {
    attrs.required = true;
  }

  const inner = unwrap(schema);
  const def = inner.def;
  const type = def.type as string;

  if (type === "string") {
    for (const c of (def.checks as MiniSchema[] | undefined) ?? []) {
      const cd = (c as Record<string, unknown>)._zod as Record<string, unknown> | undefined;
      if (!cd) continue;
      const cdef = cd.def as Record<string, unknown>;
      if (cdef.check === "min_length") attrs.minLength = cdef.minimum as number;
      if (cdef.check === "max_length") attrs.maxLength = cdef.maximum as number;
      if (cdef.check === "string_format" && cdef.format === "regex" && cdef.pattern) {
        attrs.pattern = (cdef.pattern as RegExp).source;
      }
    }
  }

  if (type === "number") {
    for (const c of (def.checks as MiniSchema[] | undefined) ?? []) {
      const cd = (c as Record<string, unknown>)._zod as Record<string, unknown> | undefined;
      if (!cd) continue;
      const cdef = cd.def as Record<string, unknown>;
      if (cdef.check === "greater_than" && cdef.inclusive) attrs.min = cdef.value as number;
      if (cdef.check === "less_than" && cdef.inclusive) attrs.max = cdef.value as number;
      if (cdef.check === "multiple_of") attrs.step = cdef.value as number;
    }
  }

  return attrs;
}

/**
 * Walk a Zod Mini object schema by key path and return the sub-schema at that path.
 * Returns `undefined` if the path doesn't resolve to a schema.
 */
function schemaAtPath(root: MiniSchema, path: string[]): MiniSchema | undefined {
  let current: MiniSchema = root;
  for (const key of path) {
    current = unwrap(current);
    const shape = current.def.shape as Record<string, MiniSchema> | undefined;
    if (!shape || !(key in shape)) return undefined;
    current = shape[key];
  }
  return current;
}

/**
 * Build a {@linkcode FormErrors} tree from a Zod Mini error.
 * Each issue's `path` is used to place the error message at the correct leaf.
 */
function zodErrorsToFormErrors<T>(
  issues: { path: (string | number)[]; message: string }[],
  template: FormErrors<T>,
): FormErrors<T> {
  const result: Record<string, unknown> = structuredClone(template) as Record<string, unknown>;

  for (const issue of issues) {
    if (issue.path.length === 0) continue;
    let target: Record<string, unknown> = result;
    for (let i = 0; i < issue.path.length - 1; i++) {
      const key = issue.path[i] as string;
      if (target[key] === undefined || target[key] === null) {
        target[key] = {};
      }
      target = target[key] as Record<string, unknown>;
    }
    const leaf = issue.path[issue.path.length - 1] as string;
    const existing = target[leaf];
    if (Array.isArray(existing)) {
      existing.push(issue.message);
    } else {
      target[leaf] = [issue.message];
    }
  }

  return result as FormErrors<T>;
}

/** Build a blank {@linkcode FormErrors} template where every leaf is `null`. */
function errorsTemplate(schema: MiniSchema): Record<string, unknown> | null {
  const unwrapped = unwrap(schema);
  if ((unwrapped.def.type as string) === "object") {
    const result: Record<string, unknown> = {};
    const shape = unwrapped.def.shape as Record<string, MiniSchema>;
    for (const key in shape) {
      const inner = unwrap(shape[key]);
      if ((inner.def.type as string) === "object") {
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
 * Creates a {@linkcode Resolver} from a Zod Mini schema.
 *
 * Uses `safeParseAsync` for both per-field and full-form validation,
 * so async Zod refinements work out of the box.
 *
 * @example
 * ```ts
 * import * as z from "zod/v4/mini";
 * import { zodResolver } from "@transitionsag/form/resolver/zod";
 * import { useForm } from "@transitionsag/form";
 *
 * const schema = z.object({
 *   email: z.email(),
 *   password: z.string().check(z.minLength(8)),
 * });
 *
 * const { Form, Field } = useForm({
 *   initialValues: { email: "", password: "" },
 *   resolver: zodResolver(schema),
 *   onSubmit: (v) => console.log(v),
 * });
 * ```
 */
export function zodResolver<S extends ZodMiniObject>(schema: S): Resolver<output<S>> {
  if (
    typeof (schema as Record<string, unknown>)._def === "object" &&
    (schema as Record<string, unknown>)._def !== null &&
    !("def" in schema)
  ) {
    throw new Error(
      "zodResolver: Zod v3 schema detected. This resolver requires Zod Mini (zod/v4/mini). " +
        'Import from "zod/v4/mini" instead of "zod".',
    );
  }

  type T = output<S>;
  const template = errorsTemplate(schema as unknown as MiniSchema) as FormErrors<T>;

  return {
    attrs(path) {
      const sub = schemaAtPath(schema as unknown as MiniSchema, path);
      if (!sub) return {};
      return extractAttrs(sub);
    },

    async validate(path, value) {
      const sub = schemaAtPath(schema as unknown as MiniSchema, path);
      if (!sub) return null;
      const result = await sub.safeParseAsync(value);
      if (result.success) return null;
      return result.error!.issues.map((i) => i.message);
    },

    async validateAll(values: T) {
      const result = await (schema as unknown as MiniSchema).safeParseAsync(values);
      if (result.success) return structuredClone(template);
      return zodErrorsToFormErrors<T>(result.error!.issues, template);
    },
  };
}
