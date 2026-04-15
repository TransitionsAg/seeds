import type { InputAttrs } from "../binding/index.ts";
import type { FormErrors } from "../errors/index.ts";

export type { InputAttrs };

/**
 * A resolver bridges an external schema (e.g. Zod, Valibot, ArkType) to the form.
 * Implement this interface to supply per-field HTML constraint attributes,
 * per-field validation, and full-form validation (used to gate submit).
 *
 * Both {@linkcode Resolver.validate validate} and {@linkcode Resolver.validateAll validateAll}
 * may return a `Promise` for async validation (e.g. Zod async refinements).
 *
 * @example
 * ```ts
 * import type { Resolver } from "@transitionsag/form/resolver";
 *
 * const myResolver: Resolver<{ email: string }> = {
 *   attrs(path) {
 *     return {};
 *   },
 *   validate(path, value) {
 *     return value === "" ? ["Required"] : null;
 *   },
 *   async validateAll(values) {
 *     return { email: values.email ? null : ["Required"] };
 *   },
 * };
 * ```
 */
export type Resolver<T extends object = object> = {
  /** Returns HTML constraint attributes for the field at `path`. */
  attrs?(path: string[]): InputAttrs;
  /** Validates the field at `path` with the given `value`. Returns error messages or `null`. May be async. */
  validate?(path: string[], value: unknown): string[] | null | Promise<string[] | null>;
  /** Validates the entire form. Returns a {@linkcode FormErrors} tree. May be async. Used by `submit()` to gate submission. */
  validateAll?(values: T): FormErrors<T> | Promise<FormErrors<T>>;
};
