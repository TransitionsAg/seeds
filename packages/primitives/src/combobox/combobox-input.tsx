import { type ComponentProps, type JSX, mergeProps } from "solid-js";
import { useComboboxApi } from "./combobox-root.tsx";

export function ComboboxInput(props: ComponentProps<"input">): JSX.Element {
  const api = useComboboxApi();
  if (!api) {
    throw Error("Combobox.Input component should be used inside of a Combobox");
  }
  return <input {...mergeProps(api().getInputProps(), props)} />;
}
