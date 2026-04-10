import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../polymorphic/mod.tsx";
import { useCheckboxApi } from "./checkbox-root.tsx";

/**
 * The visual control element of the checkbox (the box itself).
 *
 * @example
 * ```tsx
 * <Checkbox.Control>
 *   <Checkbox.Indicator>...</Checkbox.Indicator>
 * </Checkbox.Control>
 * ```
 */
export function CheckboxControl<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
) {
  const api = useCheckboxApi();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  return (
    // @ts-ignore: Props are valid but not worth calculating
    <Dynamic
      {...mergeProps(api().getControlProps(), others)}
      component={local.as}
    />
  );
}
