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
 * Text label for a branch node.
 *
 * @example
 * ```tsx
 * <TreeView.Branch.Text>Folder Name</TreeView.Branch.Text>
 * ```
 */
export function TreeViewBranchText<T extends ValidComponent = "span">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  const merged = mergeProps({ as: "span" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  return (
    // @ts-ignore: polymorphic spread props are valid but too complex for TS
    <Dynamic
      {...mergeProps(api.getBranchTextProps(node), others)}
      component={local.as}
    />
  );
}
