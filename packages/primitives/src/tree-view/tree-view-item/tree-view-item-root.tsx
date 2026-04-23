import { type JSX, mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
import { TreeViewNodeContext, type TreeViewNodeProps, useTreeViewApi } from "../tree-view-root.tsx";

type TreeViewItemRootProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TreeViewNodeProps
>;

/**
 * A leaf node in the tree. Provides node context for descendant parts like
 * {@linkcode TreeViewItemText}, {@linkcode TreeViewNodeCheckbox}, and {@linkcode TreeViewNodeRenameInput}.
 *
 * @example
 * ```tsx
 * <TreeView.Item node={fileNode} indexPath={[0]}>
 *   <TreeView.Item.Text>{fileNode.name}</TreeView.Item.Text>
 * </TreeView.Item>
 * ```
 */
export function TreeViewItemRoot<T extends ValidComponent = "div">(
  rawProps: TreeViewItemRootProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const [nodeLocal, others] = splitProps(rawProps, ["node", "indexPath"]);

  return (
    <TreeViewNodeContext.Provider value={nodeLocal}>
      <Polymorphic {...mergeProps({ as: "div" as T }, api().getItemProps(nodeLocal), others)} />
    </TreeViewNodeContext.Provider>
  );
}
