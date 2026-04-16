import { Meta, Title } from "@solidjs/meta";
import type { JSX } from "solid-js";
import { getDocsSection, type DocsSectionId } from "~/lib/docs/navigation.ts";

type DocsPageProps = {
  section: DocsSectionId;
  title: string;
  description: string;
  children: JSX.Element;
  class?: string;
};

export function DocsPage(props: DocsPageProps) {
  const section = () => getDocsSection(props.section);
  const className = () =>
    props.class
      ? `mx-auto w-full max-w-5xl rounded-3xl border border-border/70 bg-background/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10 ${props.class}`
      : "mx-auto w-full max-w-5xl rounded-3xl border border-border/70 bg-background/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10";

  return (
    <>
      <Title>{`${props.title} — Seeds`}</Title>
      <Meta name="description" content={props.description} />

      <article class={className()}>
        <div class="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-caption">
          <span class="rounded-full border border-border/70 bg-secondary/30 px-3 py-1 font-mono text-[10px] tracking-[0.24em] text-foreground">
            {section().title}
          </span>
          <span>{section().description}</span>
        </div>

        <div class="docs-content mt-6 max-w-none">{props.children}</div>
      </article>
    </>
  );
}
