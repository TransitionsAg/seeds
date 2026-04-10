# @transitionsag/form

A reactive, type-safe form library for SolidJS. Built on `solid-js/store` for
fine‑grained reactivity, with deep nested field support, built‑in validation,
and compound `Form`/`Field` components.

- **Type‑safe** – Full TypeScript inference for field paths and values
- **Reactive** – Uses SolidJS stores; changes propagate without re‑renders
- **Deep nesting** – Works with any object shape via dot‑notation paths
- **Two APIs** – Direct `binding()` for low‑level control, `Form`/`Field`
  components for declarative UIs
- **Built‑in validation** – Optional resolver interface (Zod adapter included)
- **Accessible** – ARIA attributes and error IDs wired automatically
- **Lightweight** – Zero dependencies beyond SolidJS

## Install

```bash
deno add @transitionsag/form
# or via JSR
jsr add @transitionsag/form
```

## Quick start

### Declarative `Form`/`Field` API (recommended)

```tsx
import { useForm } from "@transitionsag/form";

type Login = { email: string; password: string };

function LoginForm() {
  const { Form, Field } = useForm<Login>({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => console.log("Submitted:", values),
  });

  return (
    <Form>
      <Field name="email">
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" />
        <Field.Error />
      </Field>
      <Field name="password">
        <Field.Label>Password</Field.Label>
        <Field.Input type="password" />
        <Field.Error />
      </Field>
      <button type="submit">Log in</button>
    </Form>
  );
}
```

### Low‑level `binding()` API

```tsx
import { useForm } from "@transitionsag/form";

function Login() {
  const f = useForm<Login>({
    initialValues: { email: "", password: "" },
    onSubmit: (v) => console.log(v),
  });

  return (
    <form on:submit={f.handler((values) => console.log(values))}>
      <input use:bind={f.binding("email")} />
      <input use:bind={f.binding("password")} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Features

### Deeply nested fields

```tsx
type Profile = {
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
};

function ProfileForm() {
  const { Form, Field } = useForm<Profile>({/* ... */});

  return (
    <Form>
      <Field name="name">
        <Field.Input />
      </Field>
      <Field name="address.street">
        <Field.Input />
      </Field>
      <Field name="address.city">
        <Field.Input />
      </Field>
      <Field name="address.zip">
        <Field.Input />
      </Field>
    </Form>
  );
}
```

### Validation with Zod (or any resolver)

```tsx
import { useForm } from "@transitionsag/form";
import { zodResolver } from "@transitionsag/form/resolver/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function ValidatedForm() {
  const { Form, Field } = useForm({
    initialValues: { email: "", password: "" },
    resolver: zodResolver(schema),
    onSubmit: (v) => console.log(v),
  });

  return (
    <Form>
      <Field name="email">
        <Field.Input type="email" />
        <Field.Error />
      </Field>
      <Field name="password">
        <Field.Input type="password" />
        <Field.Error />
      </Field>
    </Form>
  );
}
```

### Programmatic control

```tsx
const { values, errors, state, submit, reset, setValues } = useForm({
  initialValues: { email: "" },
  onSubmit: (v) => console.log(v),
});

// Reactive reads
createEffect(() => console.log("Current email:", values.email));
createEffect(() => console.log("Is dirty?", state.isDirty));

// Manual updates (does not trigger validation or mark touched)
setValues("email", "new@example.com");

// Submit programmatically
submit();
submit({ email: "override@example.com" });

// Force submit (skip validation)
submit({ email: "test" }, { force: true });

// Reset to initial values
reset();
```

## API

### `useForm<T>(params: FormParameters<T>): FormReturn<T>`

Creates a reactive form instance.

```ts
type FormParameters<T> = {
  initialValues?: T;
  resolver?: Resolver<T>;
  onSubmit: (values: T) => void | Promise<void>;
};
```

Returns:

| Property    | Type                                                  | Description                                                                                  |
| ----------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `values`    | `T`                                                   | Reactive form values (Solid store proxy)                                                     |
| `errors`    | `FormErrors<T>`                                       | Per‑field validation errors (`string[]                                                       |
| `state`     | `FormState`                                           | Reactive lifecycle state (`isSubmitting`, `isDirty`, `isTouched`, `isValid`, `submitCount`)  |
| `setValues` | `SetStoreFunction<T>`                                 | Raw store setter for values (does not trigger validation)                                    |
| `setErrors` | `SetStoreFunction<FormErrors<T>>`                     | Raw store setter for errors                                                                  |
| `submit`    | `(values?: T, options?: { force?: boolean }) => void` | Submit the form                                                                              |
| `reset`     | `() => void`                                          | Reset to initial values                                                                      |
| `Form`      | `(props: JSX.FormHTMLAttributes) => JSX.Element`      | `<form>` wrapper that calls `preventDefault` and `submit()`                                  |
| `Field`     | `FieldComponent<T>`                                   | Compound field component with `Label`, `Input`, `Textarea`, `Select`, `Error` sub‑components |

### `<Form>`

A `<form>` wrapper that automatically calls `preventDefault` and invokes the
form's `submit()`. Accepts all standard form attributes.

### `<Field>`

Compound component for declarative field rendering.

```tsx
<Field name="path.to.field">
  <Field.Label>Field label</Field.Label>
  <Field.Input type="text" />
  <Field.Textarea />
  <Field.Select>
    <option value="a">Option A</option>
  </Field.Select>
  <Field.Error />
</Field>;
```

Sub‑components:

- `Field.Label` – `<label>` with `for` wired to the input's `id`
- `Field.Input` – `<input>` with `value`, `onChange`, ARIA attributes, and
  validation constraints
- `Field.Textarea` – `<textarea>` with same wiring
- `Field.Select` – `<select>` with same wiring
- `Field.Error` – Error message container with `role="alert"` and `id` for
  `aria-describedby`

### `binding(path: ...keys): Binding`

Low‑level API for wiring custom inputs. Returns a `Binding` object with:

```ts
{
  value: unknown;            // current field value
  setValue: (v: unknown) => void; // updates value, marks touched, triggers validation
  errors: string[] | null;   // field‑specific errors
  setErrors: (e: string[] | null) => void;
  attrs: InputAttrs;         // HTML attributes from resolver (required, min, max, etc.)
  aria: BindingAria;         // ARIA attributes (invalid, required, describedby)
}
```

Use with Solid's `use:` directive:

```tsx
<input use:bind={f.binding("email")} />;
```

### Resolvers

A resolver implements the `Resolver<T>` interface:

```ts
interface Resolver<T> {
  attrs?(path: string[]): InputAttrs;
  validate?(
    path: string[],
    value: unknown,
  ): string[] | null | Promise<string[] | null>;
  validateAll?(values: T): FormErrors<T> | Promise<FormErrors<T>>;
}
```

Built‑in adapters:

- `@transitionsag/form/resolver/zod` – `zodResolver(schema: ZodSchema)`

## Examples

See the [docs app](https://github.com/transitionsag/seeds/tree/main/apps/docs)
for live examples.

## Development

```bash
# Run tests
deno task test

# Lint & format
deno lint
deno fmt

# Type check
deno check src/mod.ts
```
