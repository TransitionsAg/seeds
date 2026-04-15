import type { JSX } from "solid-js";
import type { Binding } from "./binding/index.ts";
import type { FormReturn } from "./use-form.tsx";
import { createField, createForm, type FieldComponent } from "./field/index.ts";

/** Components returned by {@linkcode useFormComponents}. */
export type FormComponents<T extends object> = {
  /** Typed `<form>` wrapper that calls `preventDefault` and invokes `submit()`. */
  Form: (props: Omit<JSX.FormHTMLAttributes<HTMLFormElement>, "onSubmit">) => JSX.Element;
  /** Compound field component. Use `<Field name="path.to.field">` with `Field.Label`, `Field.Input`, `Field.Error` etc. */
  Field: FieldComponent<T>;
};

/**
 * Creates `Form` and `Field` components wired to a form instance.
 *
 * @example
 * ```tsx
 * const form = useForm<Login>({ ... });
 * const { Form, Field } = useFormComponents(form);
 *
 * <Form>
 *   <Field name="email">
 *     <Field.Label>Email</Field.Label>
 *     <Field.Input type="email" />
 *     <Field.Error />
 *   </Field>
 *   <button type="submit">Send</button>
 * </Form>
 * ```
 */
export function useFormComponents<T extends object>(form: FormReturn<T>): FormComponents<T> {
  return {
    Form: createForm(form.submit),
    // deno-lint-ignore no-explicit-any
    Field: createField<T>(form.binding as (...keys: string[]) => Binding<any>),
  };
}
