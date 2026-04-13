import { type ComponentProps, type JSX, mergeProps } from "solid-js";
import { useCheckboxApi } from "./checkbox-root.tsx";

/**
 * Hidden native input that keeps form state in sync with the checkbox.
 *
 * @example
 * ```tsx
 * <Checkbox.HiddenInput />
 * ```
 */
export function CheckboxHiddenInput(props: ComponentProps<"input">): JSX.Element {
  const api = useCheckboxApi();
  if (!api) {
    throw Error("Checkbox.Control component should be used inside of a Checkbox");
  }
  const inputProps = api().getHiddenInputProps();
  return <input {...mergeProps(inputProps, props)} />;
}
