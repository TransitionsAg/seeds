import {
  type Context,
  createContext,
  type JSX,
  mergeProps,
  splitProps,
  useContext,
  type ValidComponent,
} from "solid-js";
import type { ItemProps } from "@zag-js/combobox";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
import { useComboboxApi } from "../combobox-root.tsx";

export const ComboboxItemContext: Context<ItemProps | undefined> = createContext<
  ItemProps | undefined
>();
export const useComboboxItem = (): ItemProps | undefined => useContext(ComboboxItemContext);

type ComboboxItemRootProps<T extends ValidComponent = "div"> = PolymorphicProps<T, ItemProps>;

export function ComboboxItemRoot<T extends ValidComponent = "div">(
  rawProps: ComboboxItemRootProps<T>,
): JSX.Element {
  const api = useComboboxApi();
  if (!api) {
    throw Error("Combobox.Item component should be used inside of a Combobox");
  }
  const [itemProps, others] = splitProps(rawProps, ["item", "persistFocus"]);

  return (
    <ComboboxItemContext.Provider value={itemProps}>
      <Polymorphic {...mergeProps({ as: "div" as T }, api().getItemProps(itemProps), others)} />
    </ComboboxItemContext.Provider>
  );
}
