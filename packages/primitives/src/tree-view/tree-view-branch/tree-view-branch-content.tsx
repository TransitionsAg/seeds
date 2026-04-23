import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
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
): JSX.Element {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  return (
    <Polymorphic {...mergeProps({ as: "div" as T }, api().getBranchContentProps(node), rawProps)} />
  );
}
