import { Button } from "@transitionsag/primitives/button";

export default function ButtonDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Button</h1>
      <p class="typo-p mb-8">An unstyled button primitive with polymorphic support.</p>

      <h2 class="typo-h3 mb-4">Installation</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`deno add @transitionsag/primitives/button`}
      </pre>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { Button } from "@transitionsag/primitives/button";

<Button>Click me</Button>
<Button as="a" href="/link">As a link</Button>`}
      </pre>

      <h2 class="typo-h3 mb-4">API</h2>
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 pr-4 font-medium">Prop</th>
            <th class="text-left py-2 pr-4 font-medium">Type</th>
            <th class="text-left py-2 font-medium">Default</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>as</code>
            </td>
            <td class="py-2 pr-4">
              <code>ValidComponent</code>
            </td>
            <td class="py-2">
              <code>"button"</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <div class="flex gap-4">
        <Button>Default</Button>
        <Button as="a" href="#">
          As anchor
        </Button>
      </div>
    </div>
  );
}
