import { type ComponentProps, mergeProps } from "solid-js";
import { useCheckboxApi } from "./checkbox-root.tsx";

/**
 * Hidden native input that keeps form state in sync with the checkbox.
 *
 * @example
 * ```tsx
 * <Checkbox.HiddenInput />
 * ```
 */
export function CheckboxHiddenInput(props: ComponentProps<"input">) {
  const api = useCheckboxApi();
  const inputProps = api().getHiddenInputProps();
  return <input {...mergeProps(inputProps, props)} />;
}
