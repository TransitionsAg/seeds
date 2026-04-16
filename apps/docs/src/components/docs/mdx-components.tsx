import { Dynamic, createComponent } from "solid-js/web";
import type { Component } from "solid-js";
import type { JSX } from "solid-js";

type MdxComponents = Record<string, Component<any>>;

function createMdxComponent<Tag extends keyof JSX.IntrinsicElements>(tag: Tag): Component<any> {
  return (props) => createComponent(Dynamic, { component: tag, ...props });
}

const components = {
  h1: createMdxComponent("h1"),
  h2: createMdxComponent("h2"),
  h3: createMdxComponent("h3"),
  h4: createMdxComponent("h4"),
  h5: createMdxComponent("h5"),
  h6: createMdxComponent("h6"),
  p: createMdxComponent("p"),
  a: createMdxComponent("a"),
  figure: createMdxComponent("figure"),
  pre: createMdxComponent("pre"),
  code: createMdxComponent("code"),
  blockquote: createMdxComponent("blockquote"),
  ul: createMdxComponent("ul"),
  ol: createMdxComponent("ol"),
  li: createMdxComponent("li"),
  table: createMdxComponent("table"),
  thead: createMdxComponent("thead"),
  tbody: createMdxComponent("tbody"),
  tr: createMdxComponent("tr"),
  th: createMdxComponent("th"),
  td: createMdxComponent("td"),
  hr: createMdxComponent("hr"),
  br: createMdxComponent("br"),
  span: createMdxComponent("span"),
  strong: createMdxComponent("strong"),
  em: createMdxComponent("em"),
  img: createMdxComponent("img"),
} satisfies MdxComponents;

export function useMDXComponents() {
  return components;
}
