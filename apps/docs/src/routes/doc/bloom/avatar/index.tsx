import { Avatar } from "@transitionsag/bloom/avatar";
import { Meta, Title } from "@solidjs/meta";

export default function BloomAvatarDocs() {
  return (
    <div>
      <Title>Avatar — Seeds Bloom</Title>
      <Meta
        name="description"
        content="Self-contained avatar component with image and fallback content built on Bloom primitives."
      />
      <h1 class="typo-h1 mb-6">Avatar</h1>
      <p class="typo-p mb-8">
        Self-contained avatar component with image and fallback content. Pass <code>name</code>,{" "}
        <code>alt</code>, and <code>src</code> directly to the root.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { Avatar } from "@transitionsag/bloom/avatar";
import "@transitionsag/bloom/styles.css";

<Avatar name="Ada Lovelace" alt="Ada Lovelace" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces" />
<Avatar name="Grace Hopper" />`}
      </pre>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <div class="flex flex-wrap items-start gap-8 mb-8">
        <div class="flex flex-col items-center gap-2">
          <Avatar
            name="Ada Lovelace"
            alt="Ada Lovelace"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces"
          />
          <p class="text-sm text-muted-foreground">Image</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar name="Grace Hopper" />
          <p class="text-sm text-muted-foreground">Name fallback</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar alt="Marie Curie" />
          <p class="text-sm text-muted-foreground">Alt fallback</p>
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
            <td class="py-2 pr-4 font-mono">Avatar.Root</td>
            <td class="py-2 pr-4 font-mono">div</td>
            <td class="py-2">Styled avatar container with image and fallback content.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">Avatar.variants</td>
            <td class="py-2 pr-4 font-mono">cva</td>
            <td class="py-2">Exported variant recipe for extending the avatar styles.</td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">Props</h2>
      <p class="typo-p mb-4">
        <code class="font-mono text-sm bg-secondary px-1 rounded">Avatar.Root</code> accepts the
        primitive root props plus:
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
            <td class="py-2 pr-4 font-mono">name</td>
            <td class="py-2 pr-4 font-mono">string</td>
            <td class="py-2">Used for fallback content when no image is shown.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">alt</td>
            <td class="py-2 pr-4 font-mono">string</td>
            <td class="py-2">Image alt text and fallback source.</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 pr-4 font-mono">src</td>
            <td class="py-2 pr-4 font-mono">string</td>
            <td class="py-2">Optional image source.</td>
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
