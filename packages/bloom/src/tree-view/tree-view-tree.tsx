import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";

type TreeProps = Parameters<typeof TreeViewPrimitive.Tree>[0];

export function TreeViewTree(props: TreeProps) {
  return <TreeViewPrimitive.Tree {...props} class="flex flex-col gap-0.5" />;
}
