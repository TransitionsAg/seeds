import { type JSX, splitProps } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";

type BranchContentProps = Parameters<typeof TreeViewPrimitive.Branch.Content>[0];

export function TreeViewBranchContent(rawProps: BranchContentProps): JSX.Element {
  const [local, others] = splitProps(rawProps, ["class"]);
  return <TreeViewPrimitive.Branch.Content {...others} class={`pl-4 ${local.class ?? ""}`} />;
}
