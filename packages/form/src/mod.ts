/**
 * @module
 *
 * A reactive form library for SolidJS. Provides type-safe form state management
 * with built-in validation, dirty/touched tracking, and a component-based field
 * system via compound `Form` and `Field` components returned by {@linkcode useForm}.
 *
 * @example
 * ```tsx
 * import { useForm } from "@transitionsag/form";
 *
 * type Login = { email: string; password: string };
 *
 * function LoginForm() {
 *   const { Form, Field } = useForm<Login>({
 *     initialValues: { email: "", password: "" },
 *     onSubmit: (v) => console.log(v),
 *   });
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

export { type FormReturn, useForm } from "./use-form.tsx";
export {
  type FormParameters,
  type FormState,
  type SubmitHandler,
  type SubmitOptions,
} from "./form.ts";
export { type InputAttrs } from "./input/mod.ts";
export { type FormErrors } from "./errors/mod.ts";
export { type FieldComponent, type Path } from "./field/mod.ts";
