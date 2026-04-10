import { Button } from "@transitionsag/bloom";

export default function BloomButtonDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Button</h1>
      <p class="typo-p mb-8">
        Styled button variants built on the primitives layer with CVA theming.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { Button } from "@transitionsag/bloom";
import "@transitionsag/bloom/styles.css";

<Button>Default</Button>
<Button intent="secondary">Secondary</Button>
<Button intent="destructive">Destructive</Button>`}
      </pre>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <div class="flex flex-col gap-6 mb-8">
        <div>
          <h3 class="typo-h4 mb-3">Variants</h3>
          <div class="flex gap-4">
            <Button>Primary</Button>
            <Button intent="secondary">Secondary</Button>
            <Button intent="destructive">Destructive</Button>
          </div>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Sizes</h3>
          <div class="flex gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Disabled</h3>
          <div class="flex gap-4">
            <Button disabled>Primary</Button>
            <Button intent="secondary" disabled>
              Secondary
            </Button>
            <Button intent="destructive" disabled>
              Destructive
            </Button>
          </div>
        </div>
      </div>

      <h2 class="typo-h3 mb-4">Variants</h2>
      <table class="w-full text-sm mb-8">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2 pr-4">Variant</th>
            <th class="text-left py-2 pr-4">Background</th>
            <th class="text-left py-2 pr-4">Hover</th>
            <th class="text-left py-2">Text</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">primary</td>
            <td class="py-2 pr-4">bg-primary</td>
            <td class="py-2 pr-4">bg-primary-accent</td>
            <td class="py-2">text-primary-foreground</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">secondary</td>
            <td class="py-2 pr-4">bg-secondary</td>
            <td class="py-2 pr-4">bg-secondary-accent</td>
            <td class="py-2">text-secondary-foreground</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">destructive</td>
            <td class="py-2 pr-4">bg-destructive</td>
            <td class="py-2 pr-4">bg-destructive-accent</td>
            <td class="py-2">text-destructive-foreground</td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">Sizes</h2>
      <table class="w-full text-sm mb-8">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2 pr-4">Size</th>
            <th class="text-left py-2 pr-4">Padding</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">sm</td>
            <td class="py-2 pr-4">px-5 py-3, text-sm</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">md</td>
            <td class="py-2 pr-4">px-5 py-3 (default)</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">lg</td>
            <td class="py-2 pr-4">px-5 py-3, text-lg</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">square</td>
            <td class="py-2 pr-4">p-2, size-10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
