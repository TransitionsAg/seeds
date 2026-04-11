import { ButtonRoot, buttonVariants } from "./button-root.tsx";

type ButtonType = typeof ButtonRoot & {
  Root: typeof ButtonRoot;
  variants: typeof buttonVariants;
};

export const Button: ButtonType = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
  variants: buttonVariants,
});
