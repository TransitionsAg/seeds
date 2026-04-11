import { Branding } from "@transitionsag/bloom";

export default function BrandingDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Branding</h1>
      <p class="typo-p mb-8">
        Theme context for runtime color customization. Wraps children in a div with CSS custom
        properties derived from the theme object.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { Branding } from "@transitionsag/bloom";

<Branding theme={{
  primary: "#3b82f6",
  "primary-accent": "#2563eb",
  background: "#ffffff",
  foreground: "#111827",
}}>
  {children}
</Branding>`}
      </pre>

      <h2 class="typo-h3 mb-4">Theme Tokens</h2>
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 pr-4 font-medium">Token</th>
            <th class="text-left py-2 pr-4 font-medium">CSS Variable</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>primary</code>
            </td>
            <td class="py-2">
              <code>--color-primary</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>primary-accent</code>
            </td>
            <td class="py-2">
              <code>--color-primary-accent</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>primary-foreground</code>
            </td>
            <td class="py-2">
              <code>--color-primary-foreground</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>secondary</code>
            </td>
            <td class="py-2">
              <code>--color-secondary</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>secondary-accent</code>
            </td>
            <td class="py-2">
              <code>--color-secondary-accent</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>secondary-foreground</code>
            </td>
            <td class="py-2">
              <code>--color-secondary-foreground</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>border</code>
            </td>
            <td class="py-2">
              <code>--color-border</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>background</code>
            </td>
            <td class="py-2">
              <code>--color-background</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>foreground</code>
            </td>
            <td class="py-2">
              <code>--color-foreground</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>destructive</code>
            </td>
            <td class="py-2">
              <code>--color-destructive</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>destructive-accent</code>
            </td>
            <td class="py-2">
              <code>--color-destructive-accent</code>
            </td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>destructive-foreground</code>
            </td>
            <td class="py-2">
              <code>--color-destructive-foreground</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">useBranding Hook</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { Branding } from "@transitionsag/bloom";

const theme = Branding.useBranding();`}
      </pre>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <Branding
        theme={{
          primary: "#3b82f6",
          "primary-accent": "#2563eb",
          "primary-foreground": "#ffffff",
          secondary: "#f3f4f6",
          "secondary-accent": "#e5e7eb",
          "secondary-foreground": "#374151",
          border: "#d1d5db",
          background: "#ffffff",
          foreground: "#111827",
          destructive: "#ef4444",
          "destructive-accent": "#dc2626",
          "destructive-foreground": "#ffffff",
        }}
      >
        <div class="p-4 border border-border rounded">
          <p class="text-foreground">Themed content here</p>
          <div class="mt-2 w-8 h-8 bg-[var(--color-primary)] rounded" />
        </div>
      </Branding>
    </div>
  );
}
