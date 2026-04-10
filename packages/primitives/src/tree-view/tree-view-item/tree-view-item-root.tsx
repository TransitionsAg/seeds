import {
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/mod.tsx";
import {
  TreeViewNodeContext,
  type TreeViewNodeProps,
  useTreeViewApi,
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
): JSX.Element {
  const api = useTreeViewApi();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, nodeLocal, others] = splitProps(merged, ["as"], [
    "node",
    "indexPath",
  ]);

  const item = (
    // @ts-ignore: polymorphic spread props are valid but too complex for TS
    <Dynamic
      {...mergeProps(api.getItemProps(nodeLocal), others)}
      component={local.as}
    />
  );
  return (
    <TreeViewNodeContext.Provider value={nodeLocal}>
      {item}
    </TreeViewNodeContext.Provider>
  );
}
