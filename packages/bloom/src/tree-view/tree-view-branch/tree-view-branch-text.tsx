import type { JSX } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";

type BranchTextProps = Parameters<typeof TreeViewPrimitive.Branch.Text>[0];

export function TreeViewBranchText(props: BranchTextProps): JSX.Element {
  return <TreeViewPrimitive.Branch.Text {...props} class="typo-p" />;
}
