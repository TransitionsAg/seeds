import { type ComponentProps, splitProps } from "solid-js";
import { cva } from "../cva.ts";

const titleVariants = cva({
  base: "typo-h4",
});

type CardTitleProps = ComponentProps<"h3">;

export function CardTitle(props: CardTitleProps) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <h3 {...others} class={titleVariants({ class: local.class })} />
  );
}
