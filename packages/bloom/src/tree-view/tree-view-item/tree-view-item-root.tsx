import { splitProps } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";
import { cva } from "../../cva.ts";

const itemVariants = cva({
  base:
    "flex items-center gap-1 px-2 py-1 rounded cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-foreground hover:bg-secondary [&[data-selected]]:bg-secondary-accent",
});

type ItemRootProps = Parameters<typeof TreeViewPrimitive.Item.Root>[0];

export function TreeViewItemRoot(rawProps: ItemRootProps) {
  const [local, others] = splitProps(rawProps, ["class"]);
  return (
    <TreeViewPrimitive.Item.Root
      {...others}
      class={itemVariants({ class: local.class })}
    />
  );
}
