import {
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/mod.tsx";
import { useTreeViewApi, useTreeViewNode } from "../tree-view-root.tsx";

/**
 * Text label for a tree view item.
 *
 * @example
 * ```tsx
 * <TreeView.Item node={node} indexPath={[0]}>
 *   <TreeView.Item.Text>{node.name}</TreeView.Item.Text>
 * </TreeView.Item>
 * ```
 */
export function TreeViewItemText<T extends ValidComponent = "span">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  const merged = mergeProps({ as: "span" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  return (
    // @ts-ignore: polymorphic spread props are valid but too complex for TS
    <Dynamic
      {...mergeProps(api.getItemTextProps(node), others)}
      component={local.as}
    />
  );
}
