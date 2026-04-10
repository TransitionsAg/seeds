import type { JSX } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";

type BranchRootProps = Parameters<typeof TreeViewPrimitive.Branch.Root>[0];

export function TreeViewBranchRoot(props: BranchRootProps): JSX.Element {
  return <TreeViewPrimitive.Branch.Root {...props} />;
}
