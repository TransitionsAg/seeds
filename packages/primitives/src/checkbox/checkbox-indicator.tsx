import {
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "../polymorphic/mod.tsx";
import { useCheckboxApi } from "./checkbox-root.tsx";

/**
 * Indicator element rendered inside the control, typically used
 * to display a checkmark or indeterminate icon.
 *
 * @example
 * ```tsx
 * <Checkbox.Indicator>...</Checkbox.Indicator>
 * ```
 */
export function CheckboxIndicator<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useCheckboxApi();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);
  return (
    // @ts-ignore: Props are valid but not worth calculating
    <Dynamic
      {...mergeProps(
        { style: { "pointer-events": "none" } },
        api.getIndicatorProps(),
        others,
      )}
      component={local.as}
    />
  );
}
