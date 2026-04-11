export default function ResolverDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Resolver</h1>
      <p class="typo-p mb-8">
        Schema validation adapters. The form package ships with a Zod resolver out of the box.
      </p>

      <h2 class="typo-h3 mb-4">Zod Resolver</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { useForm } from "@transitionsag/form";
import { zodResolver } from "@transitionsag/form/resolver/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { Form, Field } = useForm({
  initialValues: { email: "", password: "" },
  resolver: zodResolver(schema),
  onSubmit: (v) => console.log(v),
});`}
      </pre>

      <h2 class="typo-h3 mb-4">Resolver Interface</h2>
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 pr-4 font-medium">Method</th>
            <th class="text-left py-2 pr-4 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>validate(path, value)</code>
            </td>
            <td class="py-2 pr-4">Validate a single field. Returns errors or Promise.</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>validateAll(values)</code>
            </td>
            <td class="py-2 pr-4">Validate entire form. Returns FormErrors.</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>attrs(path)</code>
            </td>
            <td class="py-2 pr-4">HTML constraint attributes (required, min, max, etc.)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
