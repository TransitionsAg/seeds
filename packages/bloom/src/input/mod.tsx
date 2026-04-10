import { InputRoot } from "./input-root.tsx";
import { InputLabel } from "./input-label.tsx";

type InputType = typeof InputRoot & {
  Root: typeof InputRoot;
  Label: typeof InputLabel;
};

export const Input: InputType = Object.assign(InputRoot, {
  Root: InputRoot,
  Label: InputLabel,
});
