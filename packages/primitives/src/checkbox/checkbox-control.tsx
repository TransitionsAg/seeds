import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";
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
): JSX.Element {
  const api = useCheckboxApi();
  if (!api) {
    throw Error("Checkbox.Control component should be used inside of a Checkbox");
  }
  return <Polymorphic {...mergeProps({ as: "div" as T }, api().getControlProps(), rawProps)} />;
}
