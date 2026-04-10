import { type ComponentProps, splitProps } from "solid-js";
import { cva } from "../cva.ts";

const descriptionVariants = cva({
  base: "typo-span text-caption",
});

type CardDescriptionProps = ComponentProps<"p">;

export function CardDescription(props: CardDescriptionProps) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <p {...others} class={descriptionVariants({ class: local.class })} />
  );
}
