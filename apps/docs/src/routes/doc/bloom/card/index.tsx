import { Card } from "@transitionsag/bloom";
import { Button } from "@transitionsag/bloom";

export default function BloomCardDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Card</h1>
      <p class="typo-p mb-8">
        A container for grouping related content. Supports polymorphism and
        provides semantic sub-components for header, content, and footer.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { Card, Button } from "@transitionsag/bloom";
import "@transitionsag/bloom/styles.css";

<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description goes here.</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card body content.</p>
  </Card.Content>
  <Card.Footer>
    <Button intent="secondary">Cancel</Button>
    <Button>Confirm</Button>
  </Card.Footer>
</Card>`}
      </pre>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <div class="flex flex-col gap-6 mb-8">
        <div>
          <h3 class="typo-h4 mb-3">Default</h3>
          <div class="max-w-sm">
            <Card>
              <Card.Header>
                <Card.Title>Notification Settings</Card.Title>
                <Card.Description>
                  Manage how you receive notifications.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <p class="typo-p">
                  You will receive email notifications for important updates.
                </p>
              </Card.Content>
              <Card.Footer>
                <Button intent="secondary">Cancel</Button>
                <Button>Save</Button>
              </Card.Footer>
            </Card>
          </div>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Title and Description Only</h3>
          <div class="max-w-sm">
            <Card>
              <Card.Header>
                <Card.Title>Team Plan</Card.Title>
                <Card.Description>
                  Collaborate with up to 10 team members.
                </Card.Description>
              </Card.Header>
            </Card>
          </div>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Polymorphic</h3>
          <div class="max-w-sm">
            <Card as="section">
              <Card.Header>
                <Card.Title>As Section</Card.Title>
                <Card.Description>
                  Rendered as a semantic &lt;section&gt; element.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <p class="typo-p">
                  This card uses the{" "}
                  <code class="font-mono text-sm bg-secondary px-1 rounded">
                    as
                  </code>{" "}
                  prop.
                </p>
              </Card.Content>
            </Card>
          </div>
        </div>

        <div>
          <h3 class="typo-h4 mb-3">Sizes</h3>
          <div class="flex flex-col gap-4 max-w-sm">
            <Card size="normal">
              <Card.Header>
                <Card.Title>Normal</Card.Title>
                <Card.Description>px-5 py-4</Card.Description>
              </Card.Header>
            </Card>
            <Card size="sm">
              <Card.Header>
                <Card.Title>Small</Card.Title>
                <Card.Description>px-4 py-3</Card.Description>
              </Card.Header>
            </Card>
            <Card size="fit">
              <Card.Header>
                <Card.Title>Fit</Card.Title>
                <Card.Description>px-3 py-2</Card.Description>
              </Card.Header>
            </Card>
          </div>
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
            <td class="py-2 pr-4 font-mono">Card.Root</td>
            <td class="py-2 pr-4 font-mono">div</td>
            <td class="py-2">
              Polymorphic container. Ring border, background, flex column with
              gap-4.
            </td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">Card.Header</td>
            <td class="py-2 pr-4 font-mono">div</td>
            <td class="py-2">Groups title and description with space-y-1.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">Card.Title</td>
            <td class="py-2 pr-4 font-mono">h3</td>
            <td class="py-2">Card heading using typo-h4.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">Card.Description</td>
            <td class="py-2 pr-4 font-mono">p</td>
            <td class="py-2">Secondary text using typo-span text-caption.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">Card.Content</td>
            <td class="py-2 pr-4 font-mono">div</td>
            <td class="py-2">Unstyled container for body content.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">Card.Footer</td>
            <td class="py-2 pr-4 font-mono">div</td>
            <td class="py-2">
              Flex row, right-justified. For actions and buttons.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">Props</h2>
      <p class="typo-p mb-4">
        <code class="font-mono text-sm bg-secondary px-1 rounded">
          Card.Root
        </code>{" "}
        accepts all native element props plus:
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
            <td class="py-2 pr-4 font-mono">as</td>
            <td class="py-2 pr-4 font-mono">ValidComponent</td>
            <td class="py-2">Element to render. Defaults to "div".</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">class</td>
            <td class="py-2 pr-4 font-mono">string</td>
            <td class="py-2">Additional CSS classes merged via twMerge.</td>
          </tr>
        </tbody>
      </table>
      <p class="typo-p mb-8">
        All other parts (
        <code class="font-mono text-sm bg-secondary px-1 rounded">Header</code>,
        {" "}
        <code class="font-mono text-sm bg-secondary px-1 rounded">Title</code>,
        {" "}
        <code class="font-mono text-sm bg-secondary px-1 rounded">
          Description
        </code>
        ,{" "}
        <code class="font-mono text-sm bg-secondary px-1 rounded">Content</code>
        ,{" "}
        <code class="font-mono text-sm bg-secondary px-1 rounded">Footer</code>)
        accept native props for their respective elements plus a{" "}
        <code class="font-mono text-sm bg-secondary px-1 rounded">class</code>
        {" "}
        prop.
      </p>
    </div>
  );
}
