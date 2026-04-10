import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { cva } from "../cva.ts";

const footerVariants = cva({
  base: "flex flex-row justify-end gap-2",
});

type CardFooterProps = ComponentProps<"div">;

export function CardFooter(props: CardFooterProps): JSX.Element {
  const [local, others] = splitProps(props, ["class"]);
  return <div {...others} class={footerVariants({ class: local.class })} />;
}
