# @transitionsag/seeds-form

Simple and lightweight type-safe form management. Inspired by `react-hook-form`,
modernized by Solid

## Install

```ts
import { bind, useForm } from "@transitionsag/seeds-form";
```

## Usage

```tsx
import { bind, useForm } from "@transitionsag/seeds-form";

type LoginForm = {
  email: string;
  password: string;
  address: {
    city: string;
    zip: string;
  };
};

function Login() {
  const f = useForm<LoginForm>({
    initialValues: {
      email: "",
      password: "",
      address: { city: "", zip: "" },
    },
  });

  return (
    <form on:submit={f.handler((values) => console.log(values))}>
      <input use:bind={f.binding("email")} />
      <input use:bind={f.binding("address", "city")} />
      <button type="submit">Submit</button>
    </form>
  );
}
```
