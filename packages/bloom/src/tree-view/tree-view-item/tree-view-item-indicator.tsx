import { splitProps } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";
import { cva } from "../../cva.ts";

const itemIndicatorVariants = cva({
  base:
    "size-2 rounded-full bg-primary opacity-0 transition-opacity [&[data-selected]]:opacity-100",
});

type ItemIndicatorProps = Parameters<
  typeof TreeViewPrimitive.Item.Indicator
>[0];

export function TreeViewItemIndicator(rawProps: ItemIndicatorProps) {
  const [local, others] = splitProps(rawProps, ["class"]);
  return (
    <TreeViewPrimitive.Item.Indicator
      {...others}
      class={itemIndicatorVariants({ class: local.class })}
    />
  );
}
