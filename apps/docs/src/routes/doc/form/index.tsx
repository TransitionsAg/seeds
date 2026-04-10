export default function FormIndex() {
  return (
    <div>
      <h1 class="typo-h1 mb-4">Form</h1>
      <p class="typo-p text-muted-foreground mb-8">
        A reactive form library for SolidJS with type-safe state management,
        validation, and compound field components.
      </p>

      <h2 class="typo-h3 mb-4">Quick Start</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
{`import { useForm } from "@transitionsag/form";

function LoginForm() {
  const { Form, Field } = useForm({
    initialValues: { email: "", password: "" },
    onSubmit: (v) => console.log(v),
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
      <button type="submit">Submit</button>
    </Form>
  );
}`}
      </pre>

      <h2 class="typo-h3 mb-4">Sections</h2>
      <div class="grid gap-4">
        <a
          href="/doc/form/use-form"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">useForm</h3>
          <p class="text-muted-foreground">
            Main hook — returns Form, Field, state, and actions.
          </p>
        </a>
        <a
          href="/doc/form/field"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">Field</h3>
          <p class="text-muted-foreground">
            Compound field component with Label, Input, Error, and more.
          </p>
        </a>
        <a
          href="/doc/form/resolver"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">Resolver</h3>
          <p class="text-muted-foreground">
            Schema validation adapters (Zod supported).
          </p>
        </a>
        <a
          href="/doc/form/errors"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">Errors</h3>
          <p class="text-muted-foreground">
            FormErrors type and error utilities.
          </p>
        </a>
      </div>
    </div>
  );
}
