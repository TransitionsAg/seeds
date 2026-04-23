import { type JSX, mergeProps, splitProps, type ValidComponent } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";
import type { TriggerProps } from "@zag-js/combobox";
import { useComboboxApi } from "./combobox-root.tsx";

export type ComboboxTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  TriggerProps
>;

export function ComboboxTrigger<T extends ValidComponent = "button">(
  rawProps: ComboboxTriggerProps<T>,
): JSX.Element {
  const api = useComboboxApi();
  if (!api) {
    throw Error("Combobox.Trigger component should be used inside of a Combobox");
  }
  const [triggerProps, others] = splitProps(rawProps, ["focusable"]);
  return (
    <Polymorphic
      {...mergeProps({ as: "button" as T }, api().getTriggerProps(triggerProps), others)}
    />
  );
}
