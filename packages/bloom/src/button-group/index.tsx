import { ButtonGroupRoot, buttonGroupVariants } from "./button-group-root.tsx";
import { ButtonGroupItem } from "./button-group-item.tsx";

type ButtonGroupType = typeof ButtonGroupRoot & {
  Root: typeof ButtonGroupRoot;
  Item: typeof ButtonGroupItem;
  variants: typeof buttonGroupVariants;
};

export const ButtonGroup: ButtonGroupType = Object.assign(ButtonGroupRoot, {
  Root: ButtonGroupRoot,
  Item: ButtonGroupItem,
  variants: buttonGroupVariants,
});
