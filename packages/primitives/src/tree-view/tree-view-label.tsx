import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../polymorphic/mod.tsx";
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
) {
  const api = useTreeViewApi();
  const merged = mergeProps({ as: "label" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  // @ts-ignore: Props are valid but not worth calculating
  return (
    <Dynamic
      {...mergeProps(api.getLabelProps(), others)}
      component={local.as}
    />
  );
}
