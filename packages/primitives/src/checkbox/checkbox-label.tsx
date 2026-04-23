import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";
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
): JSX.Element {
  const api = useCheckboxApi();
  if (!api) {
    throw Error("Checkbox.Label component should be used inside of a Checkbox");
  }
  return <Polymorphic {...mergeProps({ as: "span" as T }, api().getLabelProps(), rawProps)} />;
}
