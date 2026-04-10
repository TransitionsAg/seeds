import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/mod.tsx";
import { useTreeViewApi, useTreeViewNode } from "../tree-view-root.tsx";

/**
 * Expandable content area for a branch. Contains nested items and branches.
 *
 * @example
 * ```tsx
 * <TreeView.Branch.Content>
 *   <TreeView.Item node={child} indexPath={[1, 0]}>
 *     <TreeView.Item.Text>{child.name}</TreeView.Item.Text>
 *   </TreeView.Item>
 * </TreeView.Branch.Content>
 * ```
 */
export function TreeViewBranchContent<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
) {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  // @ts-ignore: Props are valid but not worth calculating
  return (
    <Dynamic
      {...mergeProps(api.getBranchContentProps(node), others)}
      component={local.as}
    />
  );
}
