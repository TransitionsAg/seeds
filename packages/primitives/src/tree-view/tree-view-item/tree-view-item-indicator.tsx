import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/mod.tsx";
import { useTreeViewApi, useTreeViewNode } from "../tree-view-root.tsx";

/**
 * Selection indicator for a tree view item.
 *
 * @example
 * ```tsx
 * <TreeView.Item node={node} indexPath={[0]}>
 *   <TreeView.Item.Indicator />
 *   <TreeView.Item.Text>{node.name}</TreeView.Item.Text>
 * </TreeView.Item>
 * ```
 */
export function TreeViewItemIndicator<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
) {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  // @ts-ignore: Props are valid but not worth calculating
  return (
    <Dynamic
      {...mergeProps(api.getItemIndicatorProps(node), others)}
      component={local.as}
    />
  );
}
