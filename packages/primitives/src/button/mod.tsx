import { ButtonRoot } from "./button-root.tsx";

export const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
}) as typeof ButtonRoot & { Root: typeof ButtonRoot };
