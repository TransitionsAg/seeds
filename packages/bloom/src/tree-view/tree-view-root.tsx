import { type JSX, splitProps } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";
import { cva } from "../cva.ts";

const rootVariants = cva({
  base: "bg-background ring-2 ring-secondary-accent",
});

type TreeViewProps = Parameters<typeof TreeViewPrimitive.Root>[0];

export function TreeViewRoot(rawProps: TreeViewProps): JSX.Element {
  const [local, others] = splitProps(rawProps, ["class"]);
  return (
    <TreeViewPrimitive.Root
      {...others}
      class={rootVariants({ class: local.class })}
    />
  );
}
