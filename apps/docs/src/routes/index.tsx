import { A } from "@solidjs/router";
import { Button } from "@transitionsag/bloom";

const packages = [
  {
    name: "Primitives",
    href: "/doc/primitives",
    description: "Unstyled, accessible UI primitives built on zag-js machines.",
    icon: "🌱",
  },
  {
    name: "Form",
    href: "/doc/form",
    description:
      "Reactive form library with type-safe state management and validation.",
    icon: "📋",
  },
  {
    name: "Bloom",
    href: "/doc/bloom",
    description: "Styled component composition layer with CVA theming.",
    icon: "🌸",
  },
];

const principles = [
  {
    title: "Layered by design",
    text:
      "Each package stands alone. Primitives ship zero styling. Form is independent of component choice. Bloom composes them both. Pick one layer or the full stack.",
  },
  {
    title: "Reactive by nature",
    text:
      "Built on SolidJS fine-grained reactivity — no virtual DOM, no stale closures, no wasted renders. State updates flow exactly where they need to.",
  },
  {
    title: "Accessible from the start",
    text:
      "Primitives wrap zag-js state machines for WAI-ARIA compliance. Accessibility isn't an afterthought or a plugin — it's the foundation every component grows from.",
  },
];

export default function Home() {
  return (
    <div class="min-h-screen">
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div class="relative max-w-5xl mx-auto px-8 pt-28 pb-32">
          <h2 class="text-5xl lg:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
            SolidJS UI,
            <br />
            <span class="text-primary">from seed to bloom</span>
          </h2>
          <p class="text-xl text-caption mb-12 max-w-2xl leading-relaxed">
            Three layers on one{" "}
            <span class="inline-flex items-center gap-1 relative">
              <img src="/solid-logo.svg" alt="SolidJS" class="size-4" />
              <a
                href="https://solidjs.com"
                target="_blank"
                rel="noopener noreferrer"
                class="underline underline-offset-4 decoration-[#2c4f7c] decoration-2 text-[#2c4f7c]"
              >
                reactive foundation
              </a>
            </span>
            . Headless primitives, type-safe forms, and styled components —
            designed to work together, ready to use independently.
          </p>
          <div class="flex gap-4">
            <Button as={A} href="/doc" size="lg">
              Get Started
            </Button>
            <Button
              as="a"
              href="https://github.com/TransitionsAg/seeds"
              target="_blank"
              rel="noopener noreferrer"
              intent="secondary"
              size="lg"
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      <section class="border-y border-border">
        <div class="max-w-5xl mx-auto px-8 py-20">
          <h3 class="typo-h2 mb-4">One ecosystem, three layers</h3>
          <p class="text-caption text-lg mb-10 max-w-xl">
            Seeds grows from headless primitives through reactive forms to
            styled components — pick what you need.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <A
                href={pkg.href}
                class="group block p-6 border border-border rounded-xl hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div class="text-3xl mb-3">{pkg.icon}</div>
                <h4 class="typo-h4 mb-2 group-hover:text-primary transition-colors">
                  {pkg.name}
                </h4>
                <p class="text-caption leading-relaxed">{pkg.description}</p>
              </A>
            ))}
          </div>
        </div>
      </section>

      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <div class="relative max-w-5xl mx-auto px-8 py-20">
          <h3 class="typo-h2 mb-4">
            Built on <span class="text-primary">principles</span>
          </h3>
          <p class="text-caption text-lg mb-10 max-w-2xl leading-relaxed">
            Primitives, Form, and Bloom aren't three separate libraries thrown
            together. They share the same reactive DNA — designed so each layer
            builds naturally on the last.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((p) => (
              <div class="p-6 border-l-4 border-primary bg-primary/5 rounded-r-xl">
                <h4 class="typo-h4 mb-2">{p.title}</h4>
                <p class="text-caption leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-8 pb-24 text-center">
        <h3 class="typo-h2 mb-4">Ready to grow?</h3>
        <p class="text-caption text-lg mb-8">
          Explore the docs, star us on GitHub, or start building today.
        </p>
        <div class="flex justify-center gap-4">
          <Button as={A} href="/doc" size="lg">
            Read the Docs
          </Button>
          <Button
            as="a"
            href="https://github.com/TransitionsAg/seeds"
            target="_blank"
            rel="noopener noreferrer"
            intent="secondary"
            size="lg"
          >
            Star on GitHub
          </Button>
        </div>
      </section>

      <footer class="border-t border-border">
        <div class="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <span class="text-caption typo-sm">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://transitions.ag"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              transitions.ag
            </a>
          </span>
          <span class="text-caption typo-sm">
            Planted with 💚 in open source
          </span>
        </div>
      </footer>
    </div>
  );
}
