import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
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
  return (
    <Polymorphic
      {...mergeProps({ as: "div" as T }, api().getBranchIndentGuideProps(node), rawProps)}
    />
  );
}
