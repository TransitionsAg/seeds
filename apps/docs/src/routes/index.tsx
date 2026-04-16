import { A } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { Button } from "@transitionsag/bloom";
import { docsSections } from "~/lib/docs/navigation.ts";

const githubUrl = "https://github.com/TransitionsAg/seeds";
const siteUrl = "https://transitions.ag";
const title = "Seeds - SolidJS UI toolkit with headless primitives and type-safe forms";
const description =
  "Seeds is a modern SolidJS UI toolkit by Sebastien at TransitionsAg. Ship headless primitives, type-safe forms, and styled components with fine-grained reactivity and strong accessibility.";

const stackRows = [
  {
    label: "Primitives",
    description: "Headless, accessible building blocks powered by zag-js state machines.",
  },
  {
    label: "Form",
    description: "Reactive state, nested values, and validation without ceremony.",
  },
  {
    label: "Bloom",
    description: "Styled components and shared tokens for faster application UIs.",
  },
];

const packages = docsSections.map((section, index) => ({
  index: String(index + 1).padStart(2, "0"),
  name: section.title,
  href: section.href,
  short: section.title,
  description: section.description,
}));

const solidBenefits = [
  {
    title: "Fine-grained reactivity",
    text: "Signals update only the parts of the UI that depend on them, which keeps interactions precise and fast.",
  },
  {
    title: "Low runtime overhead",
    text: "SolidJS avoids virtual DOM churn, so the UI stays light even as the component tree grows.",
  },
  {
    title: "Library-friendly",
    text: "The same reactive model works well for shared packages, design systems, and product pages.",
  },
  {
    title: "SSR ready",
    text: "Server-rendered output stays close to the client experience, which keeps docs and production apps aligned.",
  },
];

const faqs = [
  {
    question: "Is Seeds only for TransitionsAg?",
    answer:
      "No. It is built for any SolidJS project that wants a lean UI foundation with accessible primitives, forms, and styled components.",
  },
  {
    question: "Do I need the whole stack?",
    answer:
      "No. Primitives, Form, and Bloom can be used independently, so you can adopt only the layer you need.",
  },
  {
    question: "Why SolidJS?",
    answer:
      "Because its fine-grained reactivity makes shared UI code feel fast, predictable, and easy to reason about.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Seeds",
  description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: siteUrl,
  author: {
    "@type": "Person",
    name: "Sebastien",
  },
  publisher: {
    "@type": "Organization",
    name: "TransitionsAg",
    url: siteUrl,
  },
  sameAs: [githubUrl],
};

export default function Home() {
  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:url" content={siteUrl} />
      <Meta property="og:site_name" content="Seeds" />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={description} />
      <Meta name="theme-color" content="#0f172a" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <main class="relative overflow-hidden">
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
          <div class="absolute -right-24 top-10 size-[28rem] rounded-full bg-primary/10 blur-3xl" />
          <div class="absolute left-[-8rem] top-[24rem] size-[18rem] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <section class="relative">
          <div class="mx-auto max-w-[1400px] px-6 pb-20 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pb-24">
            <div class="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p class="inline-flex items-center rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-caption shadow-sm backdrop-blur">
                  Open source SolidJS toolkit
                </p>
                <h1 class="typo-h1 mt-6 max-w-4xl leading-[1.02] tracking-tight">
                  A SolidJS UI toolkit for fast, accessible front ends.
                </h1>
                <p class="mt-6 max-w-2xl text-lg leading-relaxed text-caption sm:text-xl">
                  I am Sebastien, and Seeds is the small set of libraries I keep reaching for when a
                  front end needs to stay sharp, minimal, and easy to reuse. It combines headless
                  primitives, type-safe forms, and a polished layer built for TransitionsAg projects
                  and any SolidJS app that values real performance.
                </p>
                <p class="mt-4 max-w-2xl text-base leading-relaxed text-caption">
                  SolidJS is the reason this stack feels powerful: fine-grained updates, a lean
                  runtime, and a component model that keeps library code close to the DOM instead of
                  wrapping it in noise.
                </p>
                <div class="mt-8 flex flex-wrap gap-4">
                  <Button as={A} href="/doc/primitives" size="lg">
                    Start with Primitives
                  </Button>
                  <Button
                    as="a"
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    intent="secondary"
                    size="lg"
                  >
                    View source
                  </Button>
                </div>
                <div class="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#packages"
                    class="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-caption transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    Packages
                  </a>
                  <a
                    href="#solidjs"
                    class="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-caption transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    Why SolidJS
                  </a>
                  <a
                    href="#about"
                    class="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-caption transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    Why it exists
                  </a>
                </div>
              </div>

              <div class="rounded-3xl border border-border/70 bg-background/80 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur">
                <div class="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
                  <div>
                    <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-caption">
                      Reactive stack
                    </p>
                    <h2 class="mt-3 text-xl font-semibold leading-tight">
                      Small enough to understand. Strong enough to scale.
                    </h2>
                  </div>
                  <span class="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                    Open source
                  </span>
                </div>

                <div class="mt-5 space-y-4">
                  {stackRows.map((row, index) => (
                    <div class="flex items-start gap-4 rounded-2xl border border-border/60 bg-secondary/20 px-4 py-3">
                      <span class="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 class="text-sm font-semibold">{row.label}</h3>
                        <p class="mt-1 text-sm leading-relaxed text-caption">{row.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <dl class="mt-6 grid grid-cols-3 gap-3">
                  <div class="rounded-2xl border border-border/60 bg-secondary/15 px-3 py-4 text-center">
                    <dt class="font-mono text-[10px] uppercase tracking-[0.28em] text-caption">
                      Packages
                    </dt>
                    <dd class="mt-2 text-xl font-semibold text-foreground">3</dd>
                  </div>
                  <div class="rounded-2xl border border-border/60 bg-secondary/15 px-3 py-4 text-center">
                    <dt class="font-mono text-[10px] uppercase tracking-[0.28em] text-caption">
                      Foundation
                    </dt>
                    <dd class="mt-2 text-xl font-semibold text-foreground">1</dd>
                  </div>
                  <div class="rounded-2xl border border-border/60 bg-secondary/15 px-3 py-4 text-center">
                    <dt class="font-mono text-[10px] uppercase tracking-[0.28em] text-caption">
                      Lock-in
                    </dt>
                    <dd class="mt-2 text-xl font-semibold text-foreground">0</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="packages" class="border-y border-border/70 bg-secondary/10">
          <div class="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
            <div class="max-w-3xl">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                What is inside
              </p>
              <h2 class="typo-h2 mt-4 leading-tight">Three libraries, one design philosophy</h2>
              <p class="mt-4 max-w-2xl text-lg leading-relaxed text-caption">
                Seeds stays intentionally small. Each package covers one layer of the front end
                stack, and each one can stand alone if that is all you need.
              </p>
            </div>

            <div class="mt-10 grid gap-5 lg:grid-cols-3">
              {packages.map((pkg) => (
                <A
                  href={pkg.href}
                  class="group block h-full rounded-3xl border border-border/70 bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
                >
                  <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-caption">
                    {pkg.index}
                  </p>
                  <h3 class="mt-4 typo-h4 transition-colors group-hover:text-primary">
                    {pkg.name}
                  </h3>
                  <p class="mt-3 text-caption leading-relaxed">{pkg.description}</p>
                  <span class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 transition-colors group-hover:underline">
                    Explore {pkg.short}
                  </span>
                </A>
              ))}
            </div>
          </div>
        </section>

        <section id="solidjs" class="relative overflow-hidden">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_55%)]" />
          <div class="relative mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
            <div class="max-w-3xl">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                Why SolidJS
              </p>
              <h2 class="typo-h2 mt-4 leading-tight">
                The runtime is what makes this stack feel unusually sharp
              </h2>
              <p class="mt-4 max-w-3xl text-lg leading-relaxed text-caption">
                SolidJS gives Seeds a reactive graph instead of a broad rerender cycle. Signals
                update exactly what depends on them, which keeps library code precise, front ends
                fast, and state changes easy to reason about.
              </p>
            </div>

            <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {solidBenefits.map((item) => (
                <article class="rounded-3xl border border-border/70 bg-background/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)] backdrop-blur">
                  <h3 class="typo-h4 leading-tight">{item.title}</h3>
                  <p class="mt-3 text-caption leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" class="border-y border-border/70 bg-background">
          <div class="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
            <div>
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                Why I built it
              </p>
              <h2 class="typo-h2 mt-4 leading-tight">
                A small toolkit for the front ends I keep building
              </h2>
              <p class="mt-4 max-w-xl text-lg leading-relaxed text-caption">
                I like technologies that deliver real value even when they are still under-adopted.
                Seeds is my way of turning that bias into reusable front-end infrastructure for
                TransitionsAg and any SolidJS project that needs a clean starting point.
              </p>
            </div>

            <blockquote class="rounded-3xl border border-border/70 bg-secondary/20 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.06)] lg:p-10">
              <p class="text-xl leading-relaxed text-foreground">
                Seeds started as the shared front-end layer I kept rebuilding across TransitionsAg
                projects. I wanted a toolkit that made experimentation easy, but still felt precise
                enough for production UI.
              </p>
              <footer class="mt-6 text-sm text-caption">Sebastien, TransitionsAg</footer>
            </blockquote>
          </div>
        </section>

        <section id="faq" class="border-b border-border/70">
          <div class="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
            <div class="max-w-3xl">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                Common questions
              </p>
              <h2 class="typo-h2 mt-4 leading-tight">A few quick answers</h2>
            </div>

            <div class="mt-10 grid gap-4">
              {faqs.map((faq) => (
                <article class="rounded-2xl border border-border/70 bg-background p-6">
                  <h3 class="typo-h4 leading-tight">{faq.question}</h3>
                  <p class="mt-3 text-caption leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer class="border-t border-border">
        <div class="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span class="text-sm text-caption">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              TransitionsAg
            </a>
          </span>
          <span class="text-sm text-caption">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              Open source on GitHub
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
