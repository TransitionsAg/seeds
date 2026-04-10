import type { JSX } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import type { Binding } from "./input/mod.ts";
import type { FormErrors } from "./errors/mod.ts";
import {
  createFormCore,
  type FormParameters,
  type FormState,
  type SubmitOptions,
} from "./form.ts";
import { createField, createForm, type FieldComponent } from "./field/mod.ts";

/** Everything returned by {@linkcode useForm}. */
export type FormReturn<T extends object> = {
  /** Current form values (store proxy — reads are reactive). */
  values: T;
  /** Per-field validation errors (store proxy — reads are reactive). */
  errors: FormErrors<T>;
  /** Reactive form lifecycle state (submitting, dirty, touched, valid, submitCount). */
  state: FormState;
  /** Raw setter for the values store. Does not trigger validation or mark touched. */
  setValues: SetStoreFunction<T>;
  /** Raw setter for the errors store. */
  setErrors: SetStoreFunction<FormErrors<T>>;
  /** Invoke the `onSubmit` handler. Uses `values` when called without arguments. Pass `{ force: true }` to skip validation. */
  submit(values?: T, options?: SubmitOptions): void;
  /** Restores values, errors, and meta state back to their initial values. */
  reset(): void;
  /** Typed `<form>` wrapper that calls `preventDefault` and invokes `submit()`. */
  Form: (
    props: Omit<JSX.FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
  ) => JSX.Element;
  /** Compound field component. Use `<Field name="path.to.field">` with `Field.Label`, `Field.Input`, `Field.Error` etc. */
  Field: FieldComponent<T>;
};

/**
 * Creates a reactive form backed by a single SolidJS store.
 *
 * Returns `Form` and `Field` components pre-wired to this form instance,
 * plus reactive reads (`values`, `errors`, `state`), raw setters (`setValues`,
 * `setErrors`), and actions (`submit`, `reset`).
 *
 * @example
 * ```tsx
 * const { Form, Field, submit } = useForm<{ email: string }>({
 *   initialValues: { email: "" },
 *   onSubmit: (v) => console.log(v.email),
 * });
 *
 * <Form>
 *   <Field name="email">
 *     <Field.Label>Email</Field.Label>
 *     <Field.Input type="email" />
 *     <Field.Error />
 *   </Field>
 *   <button type="submit">Send</button>
 * </Form>
 *
 * // Programmatic submission
 * submit();
 * submit({ email: "override@example.com" });
 * ```
 */
export function useForm<T extends object>(
  params: FormParameters<T>,
): FormReturn<T> {
  const core = createFormCore(params);
  return {
    values: core.values,
    errors: core.errors,
    state: core.state,
    setValues: core.setValues,
    setErrors: core.setErrors,
    submit: core.submit,
    reset: core.reset,
    Form: createForm(core.submit),
    // deno-lint-ignore no-explicit-any
    Field: createField<T>(core.binding as (...keys: string[]) => Binding<any>),
  };
}
