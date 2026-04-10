import { type ComponentProps, splitProps } from "solid-js";
import { cva } from "../cva.ts";

const contentVariants = cva({
  base: "",
});

type CardContentProps = ComponentProps<"div">;

export function CardContent(props: CardContentProps) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div {...others} class={contentVariants({ class: local.class })} />
  );
}
