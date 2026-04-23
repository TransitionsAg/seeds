import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";
import { useComboboxApi } from "./combobox-root.tsx";

export function ComboboxClearTrigger<T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useComboboxApi();
  if (!api) {
    throw Error("Combobox.ClearTrigger component should be used inside of a Combobox");
  }
  return (
    <Polymorphic {...mergeProps({ as: "button" as T }, api().getClearTriggerProps(), rawProps)} />
  );
}
