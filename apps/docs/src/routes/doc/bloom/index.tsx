export default function BloomIndex() {
  return (
    <div>
      <h1 class="typo-h1 mb-4">Bloom</h1>
      <p class="typo-p text-muted-foreground mb-8">
        Styled component composition layer. Pre-styled variants of primitives
        with CVA-based theming and Branding context.
      </p>

      <h2 class="typo-h3 mb-4">Quick Start</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
 {`import { Button, Checkbox, TreeView, Branding } from "@transitionsag/bloom";
import "@transitionsag/bloom/styles.css";`}
      </pre>

      <h2 class="typo-h3 mb-4">Sections</h2>
      <div class="grid gap-4">
        <a
          href="/doc/bloom/button"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">Button</h3>
          <p class="text-muted-foreground">Styled button with CVA variants.</p>
        </a>
        <a
          href="/doc/bloom/checkbox"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">Checkbox</h3>
          <p class="text-muted-foreground">
            Self-contained styled checkbox with form support.
          </p>
        </a>
        <a
          href="/doc/bloom/input"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">Input</h3>
          <p class="text-muted-foreground">
            Styled input with floating label pattern.
          </p>
        </a>
        <a
          href="/doc/bloom/tree-view"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">Tree View</h3>
          <p class="text-muted-foreground">
            Styled tree view with collection helpers.
          </p>
        </a>
        <a
          href="/doc/bloom/card"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">Card</h3>
          <p class="text-muted-foreground">
            Container for grouping related content with header, body, and footer.
          </p>
        </a>
        <a
          href="/doc/bloom/branding"
          class="block p-4 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
        >
          <h3 class="typo-h4 mb-1">Branding</h3>
          <p class="text-muted-foreground">
            Theme context for runtime color customization.
          </p>
        </a>
      </div>
    </div>
  );
}
