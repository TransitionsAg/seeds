import { Polymorphic } from "@transitionsag/primitives/polymorphic";
import { Title, Meta } from "@solidjs/meta";

export default function PolymorphicDocs() {
  return (
    <div>
      <Title>Polymorphic Primitive — Seeds</Title>
      <Meta
        name="description"
        content="A generic polymorphic component that renders as any HTML element or custom component via the as prop."
      />
      <h1 class="typo-h1 mb-6">Polymorphic</h1>
      <p class="typo-p mb-8">
        A generic polymorphic component that renders as any HTML element or custom component via the{" "}
        <code>as</code> prop.
      </p>

      <h2 class="typo-h3 mb-4">Installation</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { Polymorphic } from "@transitionsag/primitives/tree-view";`}
      </pre>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { Polymorphic } from "@transitionsag/primitives/tree-view";

<Polymorphic as="a" href="/home">Home</Polymorphic>
<Polymorphic as="button" type="submit">Send</Polymorphic>
<Polymorphic as={MyComponent} custom="prop" />`}
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
              <code>"div"</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <div class="flex gap-4 flex-wrap">
        <Polymorphic as="button" class="px-4 py-2 bg-foreground text-background rounded">
          As button
        </Polymorphic>
        <Polymorphic as="a" href="#" class="px-4 py-2 border border-border rounded">
          As link
        </Polymorphic>
      </div>
    </div>
  );
}
