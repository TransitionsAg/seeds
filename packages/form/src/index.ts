/**
 * @module
 *
 * A reactive form library for SolidJS. Provides type-safe form state management
 * with built-in validation, dirty/touched tracking, and a component-based field
 * system via {@linkcode useForm} for state and {@linkcode useFormComponents} for UI.
 *
 * @example
 * ```tsx
 * import { useForm, useFormComponents } from "@transitionsag/form";
 *
 * type Login = { email: string; password: string };
 *
 * function LoginForm() {
 *   const form = useForm<Login>({
 *     initialValues: { email: "", password: "" },
 *     onSubmit: (v) => console.log(v),
 *   });
 *   const { Form, Field } = useFormComponents(form);
 *
 *   return (
 *     <Form>
 *       <Field name="email">
 *         <Field.Label>Email</Field.Label>
 *         <Field.Input type="email" />
 *         <Field.Error />
 *       </Field>
 *       <Field name="password">
 *         <Field.Label>Password</Field.Label>
 *         <Field.Input type="password" />
 *         <Field.Error />
 *       </Field>
 *       <button type="submit">Submit</button>
 *     </Form>
 *   );
 * }
 * ```
 */

export {
  type FormReturn,
  type FormParameters,
  type FormState,
  type SubmitHandler,
  type SubmitOptions,
  useForm,
} from "./use-form.tsx";
export { type FormComponents, useFormComponents } from "./use-form-components.tsx";
export { type InputAttrs, type ValidationMode } from "./binding/index.ts";
export { type FormErrors } from "./errors/index.ts";
export { type FieldComponent, type Path } from "./field/index.ts";
