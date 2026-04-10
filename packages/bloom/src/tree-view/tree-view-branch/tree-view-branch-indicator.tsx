import { type JSX, splitProps } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";
import { cva } from "../../cva.ts";

const branchIndicatorVariants = cva({
  base:
    "size-4 shrink-0 transition-transform duration-200 [&[data-expanded]]:rotate-90",
});

type BranchIndicatorProps = Parameters<
  typeof TreeViewPrimitive.Branch.Indicator
>[0];

export function TreeViewBranchIndicator(
  rawProps: BranchIndicatorProps,
): JSX.Element {
  const [local, others] = splitProps(rawProps, ["class"]);
  return (
    <TreeViewPrimitive.Branch.Indicator
      {...others}
      class={branchIndicatorVariants({ class: local.class })}
    />
  );
}
