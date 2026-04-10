import { ButtonRoot, buttonVariants } from "./button-root.tsx";

export const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
  variants: buttonVariants,
});
