import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../polymorphic/mod.tsx";
import { useCheckboxApi } from "./checkbox-root.tsx";

/**
 * Accessible label for the checkbox.
 *
 * @example
 * ```tsx
 * <Checkbox.Label>Accept terms</Checkbox.Label>
 * ```
 */
export function CheckboxLabel<T extends ValidComponent = "span">(
  rawProps: PolymorphicProps<T>,
) {
  const api = useCheckboxApi();
  const merged = mergeProps({ as: "span" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  return (
    // @ts-ignore: Props are valid but not worth calculating
    <Dynamic
      {...mergeProps(api().getLabelProps(), others)}
      component={local.as}
    />
  );
}
