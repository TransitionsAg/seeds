import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
import { useTreeViewApi, useTreeViewNode } from "../tree-view-root.tsx";

/**
 * Control wrapper for a branch. Contains the trigger and text.
 *
 * @example
 * ```tsx
 * <TreeView.Branch.Control>
 *   <TreeView.Branch.Trigger />
 *   <TreeView.Branch.Text>Folder</TreeView.Branch.Text>
 * </TreeView.Branch.Control>
 * ```
 */
export function TreeViewBranchControl<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  return (
    <Polymorphic {...mergeProps({ as: "div" as T }, api().getBranchControlProps(node), rawProps)} />
  );
}
