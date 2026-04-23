import { type JSX, mergeProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
import { useComboboxItem } from "./combobox-item-root.tsx";
import { useComboboxApi } from "../combobox-root.tsx";

export function ComboboxItemIndicator<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const api = useComboboxApi();
  const item = useComboboxItem();
  if (!api || !item) {
    throw Error("Combobox.Item.Indicator component should be used inside of a Combobox.Item");
  }
  return (
    <Polymorphic {...mergeProps({ as: "div" as T }, api().getItemIndicatorProps(item), rawProps)} />
  );
}
