import { Checkbox } from "@transitionsag/primitives/checkbox";

export default function CheckboxDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Checkbox</h1>
      <p class="typo-p mb-8">
        An unstyled checkbox primitive wrapping <code>@zag-js/checkbox</code>. Supports checked,
        unchecked, and indeterminate states with full keyboard and screen-reader accessibility.
      </p>

      <h2 class="typo-h3 mb-4">Installation</h2>
      <pre class="bg-secondary p-4 rounded-lg mb-8 text-sm overflow-x-auto">
        {`deno add @transitionsag/primitives/checkbox`}
      </pre>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded-lg mb-8 text-sm overflow-x-auto">
        {`import { Checkbox } from "@transitionsag/primitives/checkbox";

<Checkbox id="terms">
  <Checkbox.Control>
    <Checkbox.Indicator>✓</Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Label>Accept terms</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox>`}
      </pre>

      <h2 class="typo-h3 mb-4">Compound Components</h2>
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 pr-4 font-medium">Part</th>
            <th class="text-left py-2 pr-4 font-medium">Default Element</th>
            <th class="text-left py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Root</code>
            </td>
            <td class="py-2 pr-4">
              <code>label</code>
            </td>
            <td class="py-2">Wraps all parts, provides machine context</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Control</code>
            </td>
            <td class="py-2 pr-4">
              <code>div</code>
            </td>
            <td class="py-2">Visual box element</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Indicator</code>
            </td>
            <td class="py-2 pr-4">
              <code>div</code>
            </td>
            <td class="py-2">Checkmark or indeterminate icon</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Label</code>
            </td>
            <td class="py-2 pr-4">
              <code>span</code>
            </td>
            <td class="py-2">Accessible text label</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>HiddenInput</code>
            </td>
            <td class="py-2 pr-4">
              <code>input</code>
            </td>
            <td class="py-2">Native input for form submission</td>
          </tr>
        </tbody>
      </table>

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
              <code>id</code>
            </td>
            <td class="py-2 pr-4">
              <code>string</code>
            </td>
            <td class="py-2">&mdash;</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>name</code>
            </td>
            <td class="py-2 pr-4">
              <code>string</code>
            </td>
            <td class="py-2">&mdash;</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>value</code>
            </td>
            <td class="py-2 pr-4">
              <code>string</code>
            </td>
            <td class="py-2">
              <code>"on"</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>checked</code>
            </td>
            <td class="py-2 pr-4">
              <code>boolean | "indeterminate"</code>
            </td>
            <td class="py-2">&mdash;</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>defaultChecked</code>
            </td>
            <td class="py-2 pr-4">
              <code>boolean | "indeterminate"</code>
            </td>
            <td class="py-2">&mdash;</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>disabled</code>
            </td>
            <td class="py-2 pr-4">
              <code>boolean</code>
            </td>
            <td class="py-2">
              <code>false</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>required</code>
            </td>
            <td class="py-2 pr-4">
              <code>boolean</code>
            </td>
            <td class="py-2">
              <code>false</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>invalid</code>
            </td>
            <td class="py-2 pr-4">
              <code>boolean</code>
            </td>
            <td class="py-2">
              <code>false</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>form</code>
            </td>
            <td class="py-2 pr-4">
              <code>string</code>
            </td>
            <td class="py-2">&mdash;</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>onCheckedChange</code>
            </td>
            <td class="py-2 pr-4">
              <code>(details) =&gt; void</code>
            </td>
            <td class="py-2">&mdash;</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>as</code>
            </td>
            <td class="py-2 pr-4">
              <code>ValidComponent</code>
            </td>
            <td class="py-2">
              <code>"label"</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="typo-h3 mb-4">Data Attributes</h3>
      <p class="typo-p mb-4">
        <code>Root</code> and <code>Control</code> expose a <code>data-state</code> attribute with
        values <code>"checked"</code>, <code>"unchecked"</code>, or <code>"indeterminate"</code> for
        conditional styling.
      </p>

      <h2 class="typo-h3 mb-4">Preview</h2>

      <div class="flex flex-col gap-6">
        <Checkbox id="preview-default" class="flex flex-row items-center">
          <Checkbox.Control class="size-5 border-2 border-foreground rounded flex items-center justify-center data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary transition-colors">
            <Checkbox.Indicator class="text-primary-foreground">
              <svg
                class="size-3"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2.5 6l2.5 3 4.5-5" />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label class="ml-2 typo-p select-none">Unchecked</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox>

        <Checkbox id="preview-checked" defaultChecked class="flex items-center">
          <Checkbox.Control class="size-5 border-2 border-foreground rounded flex items-center justify-center data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary transition-colors">
            <Checkbox.Indicator class="text-primary-foreground">
              <svg
                class="size-3"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2.5 6l2.5 3 4.5-5" />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label class="ml-2 typo-p select-none">Checked</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox>

        <Checkbox
          id="preview-indeterminate"
          defaultChecked="indeterminate"
          class="flex items-center"
        >
          <Checkbox.Control class="size-5 border-2 border-foreground rounded flex items-center justify-center data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary transition-colors">
            <Checkbox.Indicator class="text-primary-foreground">
              <svg
                class="size-3"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <path d="M2.5 6h7" />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label class="ml-2 typo-p select-none">Indeterminate</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox>

        <Checkbox id="preview-disabled" disabled class="flex items-center">
          <Checkbox.Control class="size-5 border-2 border-foreground/30 rounded flex items-center justify-center data-[state=checked]:bg-primary/40 data-[state=checked]:border-primary/40 cursor-not-allowed transition-colors">
            <Checkbox.Indicator class="text-primary-foreground/60">
              <svg
                class="size-3"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2.5 6l2.5 3 4.5-5" />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label class="ml-2 typo-p select-none opacity-50 cursor-not-allowed">
            Disabled
          </Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox>
      </div>
    </div>
  );
}
