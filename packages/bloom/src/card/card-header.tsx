import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { cva } from "../cva.ts";

const headerVariants = cva({
  base: "space-y-1",
});

type CardHeaderProps = ComponentProps<"div">;

export function CardHeader(props: CardHeaderProps): JSX.Element {
  const [local, others] = splitProps(props, ["class"]);
  return <div {...others} class={headerVariants({ class: local.class })} />;
}
