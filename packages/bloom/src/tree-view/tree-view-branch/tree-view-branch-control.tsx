import { type JSX, splitProps } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";
import { cva } from "../../cva.ts";

const branchControlVariants = cva({
  base: "flex items-center gap-1 px-2 py-1 rounded cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-foreground hover:bg-secondary [&[data-selected]]:bg-secondary-accent",
});

type BranchControlProps = Parameters<typeof TreeViewPrimitive.Branch.Control>[0];

export function TreeViewBranchControl(rawProps: BranchControlProps): JSX.Element {
  const [local, others] = splitProps(rawProps, ["class"]);
  return (
    <TreeViewPrimitive.Branch.Control
      {...others}
      class={branchControlVariants({ class: local.class })}
    />
  );
}
