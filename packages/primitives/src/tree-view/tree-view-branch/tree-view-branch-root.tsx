import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/mod.tsx";
import {
  TreeViewNodeContext,
  type TreeViewNodeProps,
  useTreeViewApi,
  useTreeViewNode,
} from "../tree-view-root.tsx";

type TreeViewBranchRootProps<T extends ValidComponent = "div"> =
  & PolymorphicProps<T>
  & TreeViewNodeProps;

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
) {
  const api = useTreeViewApi();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, nodeLocal, others] = splitProps(merged, ["as"], [
    "node",
    "indexPath",
  ]);

  return (
    <TreeViewNodeContext.Provider value={nodeLocal}>
      {/* @ts-ignore: Props are valid but not worth calculating */}
      <Dynamic
        {...mergeProps(api.getBranchProps(nodeLocal), others)}
        component={local.as}
      />
    </TreeViewNodeContext.Provider>
  );
}
