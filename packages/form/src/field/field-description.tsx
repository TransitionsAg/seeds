import { type ValidComponent, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "@transitionsag/primitives/polymorphic";
import { useFieldContext } from "./context.ts";

export type DescriptionProps<T extends ValidComponent = "div"> = PolymorphicProps<T>;

export function FieldDescription<T extends ValidComponent = "div">(rawProps: DescriptionProps<T>) {
  const ctx = useFieldContext();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);

  // @ts-ignore: Props are valid but not worth calculating
  return <Dynamic {...others} component={local.as} id={ctx.descriptionId} />;
}
