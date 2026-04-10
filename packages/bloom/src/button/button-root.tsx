import { type JSX, splitProps, type ValidComponent } from "solid-js";
import { Button as ButtonPrimitive } from "@transitionsag/primitives/button";
import { cva, type VariantProps } from "../cva.ts";

export const buttonVariants = cva({
  base:
    "inline-flex items-center justify-center rounded font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  variants: {
    intent: {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary-accent active:bg-primary-accent",
      secondary:
        "bg-secondary text-secondary-foreground ring-2 ring-border hover:bg-secondary-accent active:bg-secondary-accent",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive-accent active:bg-destructive-accent",
      link:
        "bg-transparent relative [&::after]:content-[''] [&::after]:absolute [&::after]:left-0 [&::after]:-bottom-1 [&::after]:block [&::after]:h-[2px] [&::after]:w-full [&::after]:bg-current [&::after]:scale-x-0 [&::after]:transition-transform [&::after]:duration-200 [&::after]:origin-center hover:[&::after]:scale-x-100",
    },
    size: {
      sm: "px-5 py-3 text-sm",
      md: "px-5 py-3",
      lg: "px-5 py-3 text-lg",
      square: "p-2 size-10",
      fit: "",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});

export type ButtonProps<T extends ValidComponent = "button"> =
  & VariantProps<
    typeof buttonVariants
  >
  & Parameters<typeof ButtonPrimitive.Root<T>>[0];

export function ButtonRoot<T extends ValidComponent = "button">(
  rawProps: ButtonProps<T>,
): JSX.Element {
  const [local, others] = splitProps(rawProps as ButtonProps, [
    "intent",
    "size",
    "class",
  ]);

  return (
    // @ts-ignore: Props are valid but not worth calculating
    <ButtonPrimitive.Root
      {...others}
      class={buttonVariants({
        intent: local.intent,
        size: local.size,
        class: local.class as string,
      })}
    />
  );
}
