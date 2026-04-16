import { A } from "@solidjs/router";
import type { JSX } from "solid-js";
import { For } from "solid-js";
import { docsSections, getDocsSection, type DocsSectionId } from "~/lib/docs/navigation.ts";

type DocsSectionLayoutProps = {
  section: DocsSectionId;
  children: JSX.Element;
};

export function DocsSectionLayout(props: DocsSectionLayoutProps) {
  const section = () => getDocsSection(props.section);

  return (
    <div class="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div class="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
        <aside class="rounded-3xl border border-border/70 bg-background/90 p-4 shadow-sm backdrop-blur xl:sticky xl:top-[72px] xl:h-[calc(100vh-72px)] xl:overflow-y-auto">
          <div class="border-b border-border/70 pb-4">
            <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-caption">
              Documentation
            </p>
            <h2 class="mt-2 text-xl font-semibold tracking-tight">{section().title}</h2>
            <p class="mt-2 text-sm leading-6 text-caption">{section().description}</p>
          </div>

          <div class="mt-4 flex gap-2 overflow-x-auto pb-2 xl:flex-col xl:overflow-visible xl:pb-0">
            <For each={docsSections}>
              {(item) => (
                <A
                  href={item.href}
                  class="shrink-0 rounded-full border border-border/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.24em] text-caption transition-colors hover:border-primary/30 hover:text-primary xl:w-full xl:shrink"
                  activeClass="border-primary/30 bg-primary/10 text-primary"
                >
                  {item.title}
                </A>
              )}
            </For>
          </div>

          <nav class="mt-4 space-y-1">
            <For each={section().pages}>
              {(page) => (
                <A
                  href={page.href}
                  end
                  class="block rounded-2xl px-3 py-2 text-sm leading-5 text-foreground transition-colors hover:bg-secondary/50"
                  activeClass="bg-secondary-accent font-medium"
                >
                  <span class="block font-medium">{page.title}</span>
                  <span class="block text-xs leading-5 text-caption">{page.description}</span>
                </A>
              )}
            </For>
          </nav>
        </aside>

        <main class="min-w-0">{props.children}</main>
      </div>
    </div>
  );
}
