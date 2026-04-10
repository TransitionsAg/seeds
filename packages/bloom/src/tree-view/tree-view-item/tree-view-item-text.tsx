import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";

type ItemTextProps = Parameters<typeof TreeViewPrimitive.Item.Text>[0];

export function TreeViewItemText(props: ItemTextProps) {
  return <TreeViewPrimitive.Item.Text {...props} class="typo-p" />;
}
