import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
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
  return (
    <Polymorphic {...mergeProps({ as: "span" as T }, api().getBranchTextProps(node), rawProps)} />
  );
}
