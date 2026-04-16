import { A } from "@solidjs/router";
import { For } from "solid-js";
import { getDocsSection, type DocsSectionId } from "~/lib/docs/navigation.ts";

type DocsSectionGridProps = {
  section: DocsSectionId;
  class?: string;
};

export function DocsSectionGrid(props: DocsSectionGridProps) {
  const section = () => getDocsSection(props.section);
  const items = () => section().pages.filter((page) => page.href !== section().href);
  const className = () =>
    props.class
      ? `grid gap-4 md:grid-cols-2 xl:grid-cols-3 ${props.class}`
      : "grid gap-4 md:grid-cols-2 xl:grid-cols-3";

  return (
    <div class={className()}>
      <For each={items()}>
        {(item) => (
          <A
            href={item.href}
            class="group rounded-3xl border border-border/70 bg-background/90 p-4 transition-colors hover:border-primary/30 hover:bg-secondary/15"
          >
            <p class="font-mono text-[10px] uppercase tracking-[0.28em] text-caption">Page</p>
            <h3 class="mt-2 text-lg font-semibold tracking-tight group-hover:text-primary">
              {item.title}
            </h3>
            <p class="mt-2 text-sm leading-6 text-caption">{item.description}</p>
          </A>
        )}
      </For>
    </div>
  );
}
