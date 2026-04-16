import type { JSX } from "solid-js";

type DocsExampleProps = {
  title?: string;
  children: JSX.Element;
  class?: string;
};

export function DocsExample(props: DocsExampleProps) {
  const className = () =>
    props.class
      ? `rounded-3xl border border-border/70 bg-secondary/10 p-4 shadow-sm sm:p-5 ${props.class}`
      : "rounded-3xl border border-border/70 bg-secondary/10 p-4 shadow-sm sm:p-5";

  return (
    <section class={className()}>
      {props.title ? <p class="mb-4 text-sm font-semibold text-foreground">{props.title}</p> : null}
      {props.children}
    </section>
  );
}
