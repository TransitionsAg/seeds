import type { InputAttrs } from "./attrs.ts";

/** Reactive ARIA state for a bound field. Properties that depend on store-backed data (e.g. `invalid`) are getters — reads inside `createEffect` / JSX are automatically tracked. */
export type BindingAria = {
  /** `true` when the field has validation errors. Reactive — tracks the errors store. */
  readonly invalid: boolean;
  /** `true` when the resolver marks the field as required. Static after binding creation. */
  readonly required: boolean;
  /** The ID of the associated error-message element. Use as `id` on your error element. */
  readonly describedby: string;
};

/**
 * The value returned by {@linkcode Binder} for a single field.
 * Carries the reactive value, setter, validation errors, and any
 * HTML constraint attributes derived from a resolver.
 */
export type Binding<T = unknown> = {
  /** Current field value (reactive getter). */
  value: T;
  /** Update the field value, marks the form as touched, and runs validation if a resolver is attached. */
  setValue(value: T): void;
  /** Current validation errors for this field, or `null` if valid. */
  errors: string[] | null;
  /** Manually set validation errors for this field. */
  setErrors(errors: string[] | null): void;
  /** HTML constraint attributes (e.g. `required`, `minLength`) derived from the resolver. */
  attrs: InputAttrs;
  /** Reactive ARIA state. `invalid` tracks the errors store; `describedby` is the error element ID. */
  aria: BindingAria;
};

/**
 * Type-safe factory that creates a {@linkcode Binding} for a nested key path
 * up to 5 levels deep.
 *
 * @example
 * ```ts
 * // flat field
 * form.binding("email")        // Binding<string>
 * // nested field
 * form.binding("address", "city") // Binding<string>
 * ```
 */
export interface Binder<T> {
  <K1 extends keyof T & string>(k1: K1): Binding<T[K1]>;
  <K1 extends keyof T & string, K2 extends keyof T[K1] & string>(
    k1: K1,
    k2: K2,
  ): Binding<T[K1][K2]>;
  <
    K1 extends keyof T & string,
    K2 extends keyof T[K1] & string,
    K3 extends keyof T[K1][K2] & string,
  >(
    k1: K1,
    k2: K2,
    k3: K3,
  ): Binding<T[K1][K2][K3]>;
  <
    K1 extends keyof T & string,
    K2 extends keyof T[K1] & string,
    K3 extends keyof T[K1][K2] & string,
    K4 extends keyof T[K1][K2][K3] & string,
  >(
    k1: K1,
    k2: K2,
    k3: K3,
    k4: K4,
  ): Binding<T[K1][K2][K3][K4]>;
  <
    K1 extends keyof T & string,
    K2 extends keyof T[K1] & string,
    K3 extends keyof T[K1][K2] & string,
    K4 extends keyof T[K1][K2][K3] & string,
    K5 extends keyof T[K1][K2][K3][K4] & string,
  >(
    k1: K1,
    k2: K2,
    k3: K3,
    k4: K4,
    k5: K5,
  ): Binding<T[K1][K2][K3][K4][K5]>;
}
