import { ButtonGroup } from "@transitionsag/bloom/button-group";
import { Meta, Title } from "@solidjs/meta";

export default function BloomButtonGroupDocs() {
  return (
    <div>
      <Title>Button Group — Seeds Bloom</Title>
      <Meta
        name="description"
        content="Layout-only grouped button wrapper with shared button defaults and orientation control."
      />
      <h1 class="typo-h1 mb-6">Button Group</h1>
      <p class="typo-p mb-8">
        Layout-only grouped button wrapper. Use <code>ButtonGroup.Item</code> for each button and
        set the root orientation to control the stack direction.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { ButtonGroup } from "@transitionsag/bloom/button-group";
import "@transitionsag/bloom/styles.css";

<ButtonGroup orientation="horizontal" intent="secondary" size="sm">
  <ButtonGroup.Item>Left</ButtonGroup.Item>
  <ButtonGroup.Item>Center</ButtonGroup.Item>
  <ButtonGroup.Item>Right</ButtonGroup.Item>
</ButtonGroup>

<ButtonGroup orientation="vertical">
  <ButtonGroup.Item>One</ButtonGroup.Item>
  <ButtonGroup.Item>Two</ButtonGroup.Item>
  <ButtonGroup.Item>Three</ButtonGroup.Item>
</ButtonGroup>`}
      </pre>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <div class="flex flex-col gap-6 mb-8">
        <div>
          <h3 class="typo-h4 mb-3">Horizontal</h3>
          <ButtonGroup orientation="horizontal" intent="secondary" size="sm">
            <ButtonGroup.Item>Left</ButtonGroup.Item>
            <ButtonGroup.Item>Center</ButtonGroup.Item>
            <ButtonGroup.Item>Right</ButtonGroup.Item>
          </ButtonGroup>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Vertical</h3>
          <ButtonGroup orientation="vertical" intent="secondary" size="sm">
            <ButtonGroup.Item>Day</ButtonGroup.Item>
            <ButtonGroup.Item>Week</ButtonGroup.Item>
            <ButtonGroup.Item>Month</ButtonGroup.Item>
          </ButtonGroup>
        </div>
      </div>

      <h2 class="typo-h3 mb-4">Parts</h2>
      <table class="w-full text-sm mb-8">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2 pr-4 font-medium">Part</th>
            <th class="text-left py-2 pr-4 font-medium">Element</th>
            <th class="text-left py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">ButtonGroup.Root</td>
            <td class="py-2 pr-4 font-mono">div</td>
            <td class="py-2">
              Grouped layout container that shares button defaults through context.
            </td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">ButtonGroup.Item</td>
            <td class="py-2 pr-4 font-mono">button</td>
            <td class="py-2">Styled button item. Inherits intent and size from the root.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">ButtonGroup.variants</td>
            <td class="py-2 pr-4 font-mono">cva</td>
            <td class="py-2">Exported variant recipe for extending the group layout.</td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">Props</h2>
      <p class="typo-p mb-4">
        <code class="font-mono text-sm bg-secondary px-1 rounded">ButtonGroup.Root</code> accepts
        polymorphic root props plus:
      </p>
      <table class="w-full text-sm mb-8">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2 pr-4 font-medium">Prop</th>
            <th class="text-left py-2 pr-4 font-medium">Type</th>
            <th class="text-left py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">orientation</td>
            <td class="py-2 pr-4 font-mono">"horizontal" | "vertical"</td>
            <td class="py-2">Controls the item layout direction.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">intent</td>
            <td class="py-2 pr-4 font-mono">Button intent</td>
            <td class="py-2">Shared button intent forwarded to each item.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">size</td>
            <td class="py-2 pr-4 font-mono">Button size</td>
            <td class="py-2">Shared button size forwarded to each item.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">class</td>
            <td class="py-2 pr-4 font-mono">string</td>
            <td class="py-2">Additional CSS classes merged via twMerge.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
