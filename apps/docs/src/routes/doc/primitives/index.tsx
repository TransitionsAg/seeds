import { A } from "@solidjs/router";
import { Title, Meta } from "@solidjs/meta";

const components = [
  { name: "Button", href: "/doc/primitives/button" },
  { name: "Checkbox", href: "/doc/primitives/checkbox" },
  { name: "Polymorphic", href: "/doc/primitives/polymorphic" },
  { name: "Tree View", href: "/doc/primitives/tree-view" },
];

export default function PrimitivesIndex() {
  return (
    <div>
      <Title>Primitives — Seeds</Title>
      <Meta
        name="description"
        content="Unstyled, accessible UI primitives built on zag-js machines. Bring your own styles."
      />
      <h1 class="typo-h1 mb-4">Primitives</h1>
      <p class="typo-p text-muted-foreground mb-8">
        Unstyled, accessible UI primitives built on zag-js machines. Bring your own styles.
      </p>

      <h2 class="typo-h3 mb-4">Components</h2>
      <div class="grid gap-4">
        {components.map((comp) => (
          <A
            href={comp.href}
            class="block p-6 border border-border rounded-lg hover:border-secondary-accent hover:bg-secondary/50 transition-colors"
          >
            <h3 class="typo-h4 mb-1">{comp.name}</h3>
          </A>
        ))}
      </div>
    </div>
  );
}
