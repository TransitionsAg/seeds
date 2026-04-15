import { type ValidComponent, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "@transitionsag/primitives/polymorphic";
import { useFieldContext } from "./context.ts";

export type LabelProps<T extends ValidComponent = "label"> = PolymorphicProps<T>;

export function FieldLabel<T extends ValidComponent = "label">(rawProps: LabelProps<T>) {
  const ctx = useFieldContext();
  const merged = mergeProps({ as: "label" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);

  return (
    // @ts-ignore: Props are valid but not worth calculating
    <Dynamic {...others} component={local.as} for={ctx.inputId} />
  );
}
