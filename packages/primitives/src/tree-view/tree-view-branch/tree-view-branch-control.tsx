import { type JSX, mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/index.tsx";
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
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  return (
    // @ts-ignore: polymorphic spread props are valid but too complex for TS
    <Dynamic {...mergeProps(api().getBranchControlProps(node), others)} component={local.as} />
  );
}
