import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
import { useTreeViewApi, useTreeViewNode } from "../tree-view-root.tsx";

/**
 * Visual indicator (chevron/arrow) for a branch's expanded state.
 *
 * @example
 * ```tsx
 * <TreeView.Branch.Indicator />
 * ```
 */
export function TreeViewBranchIndicator<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  return (
    <Polymorphic
      {...mergeProps({ as: "div" as T }, api().getBranchIndicatorProps(node), rawProps)}
    />
  );
}
