import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/mod.tsx";
import {
  TreeViewNodeContext,
  type TreeViewNodeProps,
  useTreeViewApi,
  useTreeViewNode,
} from "../tree-view-root.tsx";

type TreeViewItemRootProps<T extends ValidComponent = "div"> =
  & PolymorphicProps<T>
  & TreeViewNodeProps;

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
        {...mergeProps(api.getItemProps(nodeLocal), others)}
        component={local.as}
      />
    </TreeViewNodeContext.Provider>
  );
}
