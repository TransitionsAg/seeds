import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { cva } from "../cva.ts";

const errorVariants = cva({
  base: ["text-destructive text-xs mt-1 leading-0"],
});

type InputErrorProps = ComponentProps<"span">;

export function InputError(props: InputErrorProps): JSX.Element {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <span {...rest} class={errorVariants({ class: local.class })}>
      {local.children}
    </span>
  );
}
