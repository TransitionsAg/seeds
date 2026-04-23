import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
import { useTreeViewApi, useTreeViewNode } from "../tree-view-root.tsx";

/**
 * Toggle trigger for expanding/collapsing a branch.
 *
 * @example
 * ```tsx
 * <TreeView.Branch.Trigger />
 * ```
 */
export function TreeViewBranchTrigger<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  return (
    <Polymorphic {...mergeProps({ as: "div" as T }, api().getBranchTriggerProps(node), rawProps)} />
  );
}
