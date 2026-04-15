import { useForm, useFormComponents } from "@transitionsag/form";
import { zodResolver } from "@transitionsag/form/resolver/zod";
import { Card, Input, Button } from "@transitionsag/bloom";
import { Title, Meta } from "@solidjs/meta";
import * as z from "zod/v4/mini";

const schema = z.object({
  name: z.string().check(z.minLength(1, "Name is required")),
  email: z.email("Enter a valid email"),
  password: z.string().check(z.minLength(8, "Must be at least 8 characters")),
});

type Registration = z.infer<typeof schema>;

export default function FormExample() {
  const form = useForm<Registration>({
    initialValues: { name: "", email: "", password: "" },
    resolver: zodResolver(schema),
    onSubmit: async (v) => {
      await new Promise((r) => setTimeout(r, 1000));
      alert(JSON.stringify(v, null, 2));
    },
  });
  const { Form, Field } = useFormComponents(form);
  const { state, reset } = form;

  return (
    <div>
      <Title>Form Example — Seeds</Title>
      <Meta
        name="description"
        content="A working example of a registration form using useForm with Zod validation, Bloom Input, Button, and Card components."
      />
      <h1 class="typo-h1 mb-6">Example</h1>
      <p class="typo-p mb-8">
        A working registration form using <code>useForm</code> with Zod validation, bloom{" "}
        <code>Input</code>, <code>Button</code>, and <code>Card</code>.
      </p>

      <Card class="max-w-md">
        <Card.Header>
          <Card.Title>Create an account</Card.Title>
        </Card.Header>
        <Card.Content>
          <Form>
            <div class="flex flex-col gap-6 mb-6">
              <Field name="name">
                <Field.Input as={Input} type="text">
                  <Field.Label as={Input.Label}>Name</Field.Label>
                  <Field.Error as={Input.Error} />
                </Field.Input>
              </Field>
              <Field name="email">
                <Field.Input as={Input} type="email">
                  <Field.Label as={Input.Label}>E-mail</Field.Label>
                  <Field.Error as={Input.Error} />
                </Field.Input>
              </Field>
              <Field name="password">
                <Field.Input as={Input} type="password">
                  <Field.Label as={Input.Label}>Password</Field.Label>
                  <Field.Error as={Input.Error} />
                </Field.Input>
              </Field>
            </div>
            <Card.Footer>
              <Button type="submit" disabled={state.isSubmitting}>
                {state.isSubmitting ? "Creating..." : "Create account"}
              </Button>
              <Button type="button" intent="secondary" onClick={reset}>
                Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card.Content>
      </Card>

      <h2 class="typo-h3 mt-12 mb-4">Source</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { useForm, useFormComponents } from "@transitionsag/form";
import { zodResolver } from "@transitionsag/form/resolver/zod";
import { Card, Input, Button } from "@transitionsag/bloom";
import * as z from "zod/v4/mini";

const schema = z.object({
  name: z.string().check(z.minLength(1, "Name is required")),
  email: z.email("Enter a valid email"),
  password: z.string().check(z.minLength(8, "Must be at least 8 characters")),
});

function RegistrationForm() {
  const form = useForm({
    initialValues: { name: "", email: "", password: "" },
    resolver: zodResolver(schema),
    onSubmit: async (v) => {
      await new Promise((r) => setTimeout(r, 1000));
      console.log(v);
    },
  });
  const { Form, Field } = useFormComponents(form);
  const { state, reset } = form;

  return (
    <Card>
      <Card.Header>
        <Card.Title>Create an account</Card.Title>
      </Card.Header>
      <Form>
        <Card.Content>
          <Field name="name">
            <Field.Input as={Input} type="text">
              <Field.Label as={Input.Label}>Name</Field.Label>
              <Field.Error as={Input.Error} />
            </Field.Input>
          </Field>
          <Field name="email">
            <Field.Input as={Input} type="email">
              <Field.Label as={Input.Label}>E-mail</Field.Label>
              <Field.Error as={Input.Error} />
            </Field.Input>
          </Field>
          <Field name="password">
            <Field.Input as={Input} type="password">
              <Field.Label as={Input.Label}>Password</Field.Label>
              <Field.Error as={Input.Error} />
            </Field.Input>
          </Field>
        </Card.Content>
        <Card.Footer>
          <Button type="submit" disabled={state.isSubmitting}>
            {state.isSubmitting ? "Creating..." : "Create account"}
          </Button>
          <Button type="button" intent="secondary" onClick={reset}>
            Reset
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}`}
      </pre>
    </div>
  );
}
