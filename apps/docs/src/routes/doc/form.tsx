import { A, type RouteSectionProps } from "@solidjs/router";

const items = [
  { name: "Overview", href: "/doc/form" },
  { name: "useForm", href: "/doc/form/use-form" },
  { name: "Field", href: "/doc/form/field" },
  { name: "Resolver", href: "/doc/form/resolver" },
  { name: "Errors", href: "/doc/form/errors" },
  { name: "Example", href: "/doc/form/example" },
];

export default function FormLayout(props: RouteSectionProps) {
  return (
    <div class="flex flex-1">
      <aside class="w-64 border-r border-border bg-background flex flex-col flex-shrink-0 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
        <div class="p-4 border-b border-border">
          <h2 class="typo-h4 mb-1">Form</h2>
          <div class="flex gap-2 text-sm">
            <A
              href="/doc/primitives"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Primitives
            </A>
            <A href="/doc/form" class="text-foreground font-medium">
              Form
            </A>
            <A
              href="/doc/bloom"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Bloom
            </A>
          </div>
        </div>
        <nav class="p-4 flex-1 overflow-y-auto">
          <ul class="flex flex-col gap-1">
            {items.map((item) => (
              <li>
                <A
                  href={item.href}
                  class="block px-2 py-1 rounded text-foreground hover:bg-secondary transition-colors"
                  activeClass="bg-secondary-accent font-medium"
                  end
                >
                  {item.name}
                </A>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main class="flex-1 max-w-3xl p-8">{props.children}</main>
    </div>
  );
}
