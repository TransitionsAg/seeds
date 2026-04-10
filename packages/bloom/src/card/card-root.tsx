import { type JSX, splitProps, type ValidComponent } from "solid-js";
import {
  Polymorphic,
  type PolymorphicProps,
} from "@transitionsag/primitives/polymorphic";
import { cva, type VariantProps } from "../cva.ts";

export const cardVariants: (props?: {
  size?: "normal" | "sm" | "fit";
  class?: string;
}) => string = cva({
  base: "rounded-lg ring-2 ring-border bg-background! flex flex-col gap-4",
  variants: {
    size: {
      normal: "px-5 py-4",
      sm: "px-4 py-3",
      fit: "px-3 py-2",
    },
  },
  defaultVariants: {
    size: "normal",
  },
});

type CardRootProps<T extends ValidComponent = "div"> =
  & VariantProps<typeof cardVariants>
  & PolymorphicProps<T>;

export function CardRoot<T extends ValidComponent = "div">(
  rawProps: CardRootProps<T>,
): JSX.Element {
  const [local, others] = splitProps(rawProps as CardRootProps, [
    "size",
    "class",
  ]);

  return (
    <Polymorphic
      {...others}
      class={cardVariants({ size: local.size, class: local.class as string })}
    />
  );
}
