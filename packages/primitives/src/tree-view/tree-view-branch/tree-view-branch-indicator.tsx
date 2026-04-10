import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/mod.tsx";
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
) {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  // @ts-ignore: Props are valid but not worth calculating
  return (
    <Dynamic
      {...mergeProps(api.getBranchIndicatorProps(node), others)}
      component={local.as}
    />
  );
}
