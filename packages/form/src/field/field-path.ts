/**
 * Recursively builds a union of dot-separated key paths for `T`.
 * Only plain objects (matching `Record<string, unknown>`) are recursed
 * into — primitives, `Date`, arrays, and other built-ins are leaves.
 * Recursion is capped at 5 levels to match {@linkcode Binder}.
 */
export type Path<T, Depth extends number[] = []> = Depth["length"] extends 5
  ? never
  : {
      [K in keyof T & string]: T[K] extends Record<string, unknown>
        ? K | `${K}.${Path<T[K], [...Depth, 0]>}`
        : K;
    }[keyof T & string];
