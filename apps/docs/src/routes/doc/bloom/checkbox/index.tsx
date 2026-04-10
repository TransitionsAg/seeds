import { Checkbox } from "@transitionsag/bloom/checkbox";
import "@transitionsag/bloom/styles.css";

export default function BloomCheckboxDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Checkbox</h1>
      <p class="typo-p mb-8">
        A self-contained styled checkbox. Wraps all primitive parts (control,
        indicator, label, hidden input) into a single callable component.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
{`import { Checkbox } from "@transitionsag/bloom/checkbox";
import "@transitionsag/bloom/styles.css";

<Checkbox id="terms" name="terms" value="yes">Accept terms</Checkbox>
<Checkbox id="newsletter" name="newsletter" value="yes" defaultChecked>Subscribe</Checkbox>
<Checkbox id="confirm" name="confirm" value="yes" disabled>Disabled</Checkbox>`}
      </pre>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <div class="flex flex-col gap-6 mb-8">
        <div>
          <h3 class="typo-h4 mb-3">States</h3>
          <div class="flex flex-col gap-3">
            <Checkbox id="bloom-unchecked" name="state" value="unchecked">
              Unchecked
            </Checkbox>
            <Checkbox
              id="bloom-checked"
              name="state"
              value="checked"
              defaultChecked
            >
              Checked
            </Checkbox>
            <Checkbox
              id="bloom-indeterminate"
              name="state"
              value="indeterminate"
              defaultChecked="indeterminate"
            >
              Indeterminate
            </Checkbox>
            <Checkbox
              id="bloom-disabled"
              name="state"
              value="disabled"
              disabled
            >
              Disabled
            </Checkbox>
          </div>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Invalid</h3>
          <Checkbox
            id="bloom-invalid"
            name="state"
            value="invalid"
            invalid
          >
            Invalid
          </Checkbox>
        </div>
      </div>

      <h2 class="typo-h3 mb-4">Props</h2>
      <p class="typo-p mb-4">
        Accepts all{" "}
        <a
          href="/doc/primitives/checkbox"
          class="text-primary hover:underline"
        >
          primitive checkbox root props
        </a>{" "}
        plus hidden input props directly on the same component.
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
            <td class="py-2 pr-4 font-mono">id</td>
            <td class="py-2 pr-4 font-mono">string</td>
            <td class="py-2">Required. Unique identifier.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">children</td>
            <td class="py-2 pr-4 font-mono">JSX.Element</td>
            <td class="py-2">Label text rendered inside the checkbox.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">name</td>
            <td class="py-2 pr-4 font-mono">string</td>
            <td class="py-2">Forwarded to hidden input for form submission.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">value</td>
            <td class="py-2 pr-4 font-mono">string</td>
            <td class="py-2">Forwarded to hidden input.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">checked</td>
            <td class="py-2 pr-4 font-mono">boolean | "indeterminate"</td>
            <td class="py-2">Controlled checked state.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">defaultChecked</td>
            <td class="py-2 pr-4 font-mono">boolean | "indeterminate"</td>
            <td class="py-2">Uncontrolled initial state.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">disabled</td>
            <td class="py-2 pr-4 font-mono">boolean</td>
            <td class="py-2">Disables the checkbox.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">invalid</td>
            <td class="py-2 pr-4 font-mono">boolean</td>
            <td class="py-2">Shows destructive ring state.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">onCheckedChange</td>
            <td class="py-2 pr-4 font-mono">{"(details) => void"}</td>
            <td class="py-2">Callback when checked state changes.</td>
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
