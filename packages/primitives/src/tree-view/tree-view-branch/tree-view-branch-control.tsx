import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/mod.tsx";
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
) {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  // @ts-ignore: Props are valid but not worth calculating
  return (
    <Dynamic
      {...mergeProps(api.getBranchControlProps(node), others)}
      component={local.as}
    />
  );
}
