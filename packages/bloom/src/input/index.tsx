import { InputRoot } from "./input-root.tsx";
import { InputLabel } from "./input-label.tsx";
import { InputError } from "./input-error.tsx";

type InputType = typeof InputRoot & {
  Root: typeof InputRoot;
  Label: typeof InputLabel;
  Error: typeof InputError;
};

export const Input: InputType = Object.assign(InputRoot, {
  Root: InputRoot,
  Label: InputLabel,
  Error: InputError,
});
