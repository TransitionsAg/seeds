import { type JSX, mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
import type { ItemGroupLabelProps } from "@zag-js/combobox";
import { useComboboxApi } from "../combobox-root.tsx";

type ComboboxItemGroupLabelProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ItemGroupLabelProps
>;

export function ComboboxItemGroupLabel<T extends ValidComponent = "div">(
  rawProps: ComboboxItemGroupLabelProps<T>,
): JSX.Element {
  const api = useComboboxApi();
  if (!api) {
    throw Error("Combobox.ItemGroup.Label component should be used inside of a Combobox");
  }
  const [groupLabelProps, others] = splitProps(rawProps, ["htmlFor"]);
  return (
    <Polymorphic
      {...mergeProps({ as: "div" as T }, api().getItemGroupLabelProps(groupLabelProps), others)}
    />
  );
}
