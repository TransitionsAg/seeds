import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";

type BranchTextProps = Parameters<typeof TreeViewPrimitive.Branch.Text>[0];

export function TreeViewBranchText(props: BranchTextProps) {
  return <TreeViewPrimitive.Branch.Text {...props} class="typo-p" />;
}
