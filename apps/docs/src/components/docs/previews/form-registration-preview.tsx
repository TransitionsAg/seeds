import { Button, Card, Input } from "@transitionsag/bloom";
import { useForm, useFormComponents } from "@transitionsag/form";
import { zodResolver } from "@transitionsag/form/resolver/zod";
import * as z from "zod/v4/mini";

const schema = z.object({
  name: z.string().check(z.minLength(1, "Name is required")),
  email: z.email("Enter a valid email"),
  password: z.string().check(z.minLength(8, "Must be at least 8 characters")),
});

type Registration = z.infer<typeof schema>;

export function FormRegistrationPreview() {
  const form = useForm<Registration>({
    initialValues: { name: "", email: "", password: "" },
    resolver: zodResolver(schema),
    onSubmit: async (value) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(JSON.stringify(value, null, 2));
    },
  });

  const { Form, Field } = useFormComponents(form);
  const { state, reset } = form;

  return (
    <Card class="max-w-md">
      <Card.Header>
        <Card.Title>Create an account</Card.Title>
      </Card.Header>
      <Card.Content>
        <Form>
          <div class="mb-6 flex flex-col gap-6">
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
  );
}
