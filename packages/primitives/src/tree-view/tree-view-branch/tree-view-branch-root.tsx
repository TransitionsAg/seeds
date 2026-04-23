import { type JSX, mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
import { TreeViewNodeContext, type TreeViewNodeProps, useTreeViewApi } from "../tree-view-root.tsx";

type TreeViewBranchRootProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TreeViewNodeProps
>;

/**
 * A branch (folder) node in the tree. Can be expanded to reveal nested content.
 * Provides node context for all descendant parts.
 *
 * @example
 * ```tsx
 * <TreeView.Branch node={folderNode} indexPath={[1]}>
 *   <TreeView.Branch.Control>
 *     <TreeView.Branch.Trigger />
 *     <TreeView.Branch.Text>{folderNode.name}</TreeView.Branch.Text>
 *   </TreeView.Branch.Control>
 *   <TreeView.Branch.Content>
 *     ...
 *   </TreeView.Branch.Content>
 * </TreeView.Branch>
 * ```
 */
export function TreeViewBranchRoot<T extends ValidComponent = "div">(
  rawProps: TreeViewBranchRootProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const [nodeLocal, others] = splitProps(rawProps, ["node", "indexPath"]);

  return (
    <TreeViewNodeContext.Provider value={nodeLocal}>
      <Polymorphic {...mergeProps({ as: "div" as T }, api().getBranchProps(nodeLocal), others)} />
    </TreeViewNodeContext.Provider>
  );
}
