import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";
import { useComboboxApi } from "./combobox-root.tsx";

export function ComboboxControl<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useComboboxApi();
  if (!api) {
    throw Error("Combobox.Control component should be used inside of a Combobox");
  }
  return <Polymorphic {...mergeProps({ as: "div" as T }, api().getControlProps(), rawProps)} />;
}
