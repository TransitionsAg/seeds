import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";
import { useTreeViewApi } from "./tree-view-root.tsx";

/**
 * The scrollable tree container that holds all items and branches.
 *
 * @example
 * ```tsx
 * <TreeView.Tree>
 *   ...
 * </TreeView.Tree>
 * ```
 */
export function TreeViewTree<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  return <Polymorphic {...mergeProps({ as: "div" as T }, api().getTreeProps(), rawProps)} />;
}
