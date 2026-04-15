import { type JSX, type ValidComponent, mergeProps, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "@transitionsag/primitives/polymorphic";
import { useFieldContext } from "./context.ts";

export type ErrorProps<T extends ValidComponent = "div"> = Omit<PolymorphicProps<T>, "children"> & {
  children?: JSX.Element;
};

/**
 * Error message container. Only renders when the field has validation errors.
 * When no children are provided, renders the error messages joined by `", "`.
 */
export function FieldError<T extends ValidComponent = "div">(rawProps: ErrorProps<T>) {
  const ctx = useFieldContext();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as", "children"]);

  return (
    <Show when={ctx.binding.aria.invalid}>
      {/* @ts-ignore: Props are valid but not worth calculating */}
      <Dynamic {...others} component={local.as} id={ctx.errorId}>
        {local.children !== undefined ? local.children : ctx.binding.errors?.join(", ")}
      </Dynamic>
    </Show>
  );
}
