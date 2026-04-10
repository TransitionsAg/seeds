import { Input } from "@transitionsag/bloom";

export default function BloomInputDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Input</h1>
      <p class="typo-p mb-8">
        Styled input with floating label pattern. The label acts as placeholder
        when empty, then animates above the value on input.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { Input } from "@transitionsag/bloom";
import "@transitionsag/bloom/styles.css";

<Input label="Email" type="email" />
<Input label="Name" value="John" />
<Input label="Password" error="Must be at least 8 characters" />`}
      </pre>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <div class="flex flex-col gap-8 max-w-sm mb-8">
        <div>
          <h3 class="typo-h4 mb-3">Default</h3>
          <Input type="email">
            <Input.Label>E-mail address</Input.Label>
          </Input>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">With Value</h3>
          <Input type="text" value="Jane Doe">
            <Input.Label>Full name</Input.Label>
          </Input>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Password</h3>
          <Input type="password" value="secret123">
            <Input.Label>Password</Input.Label>
          </Input>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Disabled</h3>
          <Input type="text" disabled value="Cannot edit">
            <Input.Label>Read-only field</Input.Label>
          </Input>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Invalid</h3>
          <Input type="email" value="not-an-email" aria-invalid="true">
            <Input.Label>E-mail address</Input.Label>
          </Input>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Textarea-style (large)</h3>
          <Input type="text" class="min-h-[100px]">
            <Input.Label>Bio</Input.Label>
          </Input>
        </div>
      </div>
    </div>
  );
}
