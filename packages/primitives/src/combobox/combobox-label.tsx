import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";
import { useComboboxApi } from "./combobox-root.tsx";

export function ComboboxLabel<T extends ValidComponent = "label">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useComboboxApi();
  if (!api) {
    throw Error("Combobox.Label component should be used inside of a Combobox");
  }
  return <Polymorphic {...mergeProps({ as: "label" as T }, api().getLabelProps(), rawProps)} />;
}
