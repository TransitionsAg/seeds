import { CheckboxRoot, checkboxVariants } from "./checkbox-root.tsx";

type CheckboxType = typeof CheckboxRoot & {
  Root: typeof CheckboxRoot;
  variants: typeof checkboxVariants;
};

export const Checkbox: CheckboxType = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  variants: checkboxVariants,
});
