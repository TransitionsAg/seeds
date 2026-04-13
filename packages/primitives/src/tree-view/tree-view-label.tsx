import { type JSX, mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../polymorphic/index.tsx";
import { useTreeViewApi } from "./tree-view-root.tsx";

/**
 * Accessible label for the tree view.
 *
 * @example
 * ```tsx
 * <TreeView.Label>Project Files</TreeView.Label>
 * ```
 */
export function TreeViewLabel<T extends ValidComponent = "label">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useTreeViewApi();
  const merged = mergeProps({ as: "label" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  return (
    // @ts-ignore: polymorphic spread props are valid but too complex for TS
    <Dynamic {...mergeProps(api().getLabelProps(), others)} component={local.as} />
  );
}
