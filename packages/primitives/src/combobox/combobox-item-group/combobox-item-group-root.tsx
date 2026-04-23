import {
  type Context,
  createContext,
  type JSX,
  mergeProps,
  splitProps,
  useContext,
  type ValidComponent,
} from "solid-js";
import type { ItemGroupProps } from "@zag-js/combobox";
import { Polymorphic, type PolymorphicProps } from "../../polymorphic/index.tsx";
import { useComboboxApi } from "../combobox-root.tsx";

export const ComboboxItemGroupContext: Context<ItemGroupProps | undefined> = createContext<
  ItemGroupProps | undefined
>();
export const useComboboxItemGroup = (): ItemGroupProps | undefined =>
  useContext(ComboboxItemGroupContext);

type ComboboxItemGroupRootProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ItemGroupProps
>;

export function ComboboxItemGroupRoot<T extends ValidComponent = "div">(
  rawProps: ComboboxItemGroupRootProps<T>,
): JSX.Element {
  const api = useComboboxApi();
  if (!api) {
    throw Error("Combobox.ItemGroup component should be used inside of a Combobox");
  }
  const [groupProps, others] = splitProps(rawProps, ["id"]);

  return (
    <ComboboxItemGroupContext.Provider value={groupProps}>
      <Polymorphic
        {...mergeProps({ as: "div" as T }, api().getItemGroupProps(groupProps), others)}
      />
    </ComboboxItemGroupContext.Provider>
  );
}
