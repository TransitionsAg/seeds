import { CheckboxRoot, checkboxVariants } from "./checkbox-root.tsx";

export const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  variants: checkboxVariants,
});
