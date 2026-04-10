import {
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../polymorphic/mod.tsx";
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
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  // @ts-ignore: Props are valid but not worth calculating
  return (
    <Dynamic {...mergeProps(api.getTreeProps(), others)} component={local.as} />
  );
}
