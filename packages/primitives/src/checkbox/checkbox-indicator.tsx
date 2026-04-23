import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";
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
  if (!api) {
    throw Error("Checkbox.Indicator component should be used inside of a Checkbox");
  }
  return (
    <Polymorphic
      {...mergeProps(
        { as: "div" as T, style: { "pointer-events": "none" } },
        api().getIndicatorProps(),
        rawProps,
      )}
    />
  );
}
