import {
  type ComponentProps,
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../polymorphic/mod.tsx";
import { useTreeViewApi, useTreeViewNode } from "./tree-view-root.tsx";

/**
 * Checkbox for multi-selection on any node (item or branch).
 * Must be rendered inside an {@linkcode tree-view-item/tree-view-item-root.TreeViewItemRoot} or {@linkcode tree-view-branch/tree-view-branch-root.TreeViewBranchRoot}.
 *
 * @example
 * ```tsx
 * <TreeView.Item node={node} indexPath={[0]}>
 *   <TreeView.Item.Checkbox />
 *   <TreeView.Item.Text>{node.name}</TreeView.Item.Text>
 * </TreeView.Item>
 * ```
 */
export function TreeViewNodeCheckbox<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  return (
    // @ts-ignore: polymorphic spread props are valid but too complex for TS
    <Dynamic
      {...mergeProps(api.getNodeCheckboxProps(node), others)}
      component={local.as}
    />
  );
}

/**
 * Input field for inline renaming of a node.
 * Must be rendered inside an {@linkcode tree-view-item/tree-view-item-root.TreeViewItemRoot} or {@linkcode tree-view-branch/tree-view-branch-root.TreeViewBranchRoot}.
 *
 * @example
 * ```tsx
 * <TreeView.Item node={node} indexPath={[0]}>
 *   <TreeView.Item.RenameInput />
 * </TreeView.Item>
 * ```
 */
export function TreeViewNodeRenameInput(
  props: ComponentProps<"input">,
): JSX.Element {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  return <input {...mergeProps(api.getNodeRenameInputProps(node), props)} />;
}
