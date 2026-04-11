/**
 * Recursive error map that mirrors the shape of `T`.
 * Leaf fields hold `string[] | null`; nested objects recurse.
 */
export type FormErrors<T> = {
  // deno-lint-ignore no-explicit-any
  [K in keyof T]: T[K] extends any[]
    ? string[] | null
    : T[K] extends object
      ? FormErrors<T[K]>
      : string[] | null;
};

/** Returns `true` if any field in the error map contains a non-empty error array. */
export function hasErrors<T>(errs: FormErrors<T>): boolean {
  for (const key in errs) {
    const v = errs[key];
    if (Array.isArray(v) && v.length > 0) return true;
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      // deno-lint-ignore no-explicit-any
      if (hasErrors(v as FormErrors<any>)) return true;
    }
  }
  return false;
}

/** Builds an empty {@linkcode FormErrors} tree where every leaf is `null`, matching the shape of `values`. */
export function initErrors<T>(values: T): FormErrors<T> {
  // deno-lint-ignore no-explicit-any
  const result: any = {};
  for (const key in values) {
    const v = values[key];
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      result[key] = initErrors(v);
    } else {
      result[key] = null;
    }
  }
  return result;
}
