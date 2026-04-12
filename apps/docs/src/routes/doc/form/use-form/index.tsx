import { Title, Meta } from "@solidjs/meta";

export default function UseFormDocs() {
  return (
    <div>
      <Title>useForm — Seeds</Title>
      <Meta
        name="description"
        content="Creates a reactive form backed by a single SolidJS store. Returns Form and Field components pre-wired to this form instance."
      />
      <h1 class="typo-h1 mb-6">useForm</h1>
      <p class="typo-p mb-8">
        Creates a reactive form backed by a single SolidJS store. Returns <code>Form</code> and{" "}
        <code>Field</code> components pre-wired to this form instance.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { useForm } from "@transitionsag/form";

const { Form, Field, submit, reset, values, errors, state } = useForm({
  initialValues: { email: "", password: "" },
  onSubmit: (v) => console.log(v),
});`}
      </pre>

      <h2 class="typo-h3 mb-4">Parameters</h2>
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 pr-4 font-medium">Prop</th>
            <th class="text-left py-2 pr-4 font-medium">Type</th>
            <th class="text-left py-2 font-medium">Required</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>initialValues</code>
            </td>
            <td class="py-2 pr-4">
              <code>T</code>
            </td>
            <td class="py-2">No</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>resolver</code>
            </td>
            <td class="py-2 pr-4">
              <code>Resolver&lt;T&gt;</code>
            </td>
            <td class="py-2">No</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>onSubmit</code>
            </td>
            <td class="py-2 pr-4">
              <code>SubmitHandler&lt;T&gt;</code>
            </td>
            <td class="py-2">Yes</td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">Return</h2>
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 pr-4 font-medium">Property</th>
            <th class="text-left py-2 pr-4 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>values</code>
            </td>
            <td class="py-2 pr-4">Current form values (reactive store proxy)</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>errors</code>
            </td>
            <td class="py-2 pr-4">Per-field validation errors</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>state</code>
            </td>
            <td class="py-2 pr-4">
              Lifecycle state: isSubmitting, isDirty, isTouched, isValid, submitCount
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Form</code>
            </td>
            <td class="py-2 pr-4">Typed form wrapper</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Field</code>
            </td>
            <td class="py-2 pr-4">Compound field component</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>submit()</code>
            </td>
            <td class="py-2 pr-4">Trigger submission (validates first)</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>reset()</code>
            </td>
            <td class="py-2 pr-4">Restore to initial values</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
