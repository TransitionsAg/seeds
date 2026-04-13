import { type JSX, mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../../polymorphic/index.tsx";
import { useTreeViewApi, useTreeViewNode } from "../tree-view-root.tsx";

/**
 * Visual indent guide showing nesting depth for a branch.
 *
 * @example
 * ```tsx
 * <TreeView.Branch.IndentGuide />
 * ```
 */
export function TreeViewBranchIndentGuide<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const node = useTreeViewNode();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  return (
    // @ts-ignore: polymorphic spread props are valid but too complex for TS
    <Dynamic {...mergeProps(api().getBranchIndentGuideProps(node), others)} component={local.as} />
  );
}
