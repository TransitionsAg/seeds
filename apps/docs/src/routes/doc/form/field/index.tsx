import { Title, Meta } from "@solidjs/meta";

export default function FieldDocs() {
  return (
    <div>
      <Title>Field — Seeds</Title>
      <Meta
        name="description"
        content="Compound field component returned by useForm. Use with Field.Label, Field.Input, Field.Error, and more."
      />
      <h1 class="typo-h1 mb-6">Field</h1>
      <p class="typo-p mb-8">
        Compound field component returned by <code>useForm</code>. Use with <code>Field.Label</code>
        , <code>Field.Input</code>, <code>Field.Error</code>, and more.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`function LoginForm() {
  const { Form, Field } = useForm({
    initialValues: { email: "" },
    onSubmit: (v) => console.log(v),
  });

  return (
    <Form>
      <Field name="email">
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" />
        <Field.Error />
      </Field>
    </Form>
  );
}`}
      </pre>

      <h2 class="typo-h3 mb-4">Compound Parts</h2>
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 pr-4 font-medium">Part</th>
            <th class="text-left py-2 pr-4 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Label</code>
            </td>
            <td class="py-2 pr-4">Field label, linked via htmlFor</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Input</code>
            </td>
            <td class="py-2 pr-4">Bound input element (auto-detects type)</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Error</code>
            </td>
            <td class="py-2 pr-4">Displays validation errors for the field</td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">Nested Paths</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`<Field name="address.street">
  <Field.Label>Street</Field.Label>
  <Field.Input />
  <Field.Error />
</Field>`}
      </pre>
    </div>
  );
}
