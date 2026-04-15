import { mergeProps } from "solid-js";
import type { FieldInputProps } from "./field-input.tsx";
import { FieldInput } from "./field-input.tsx";

export type SelectProps = FieldInputProps<"select">;

export function FieldSelect(rawProps: SelectProps) {
  return FieldInput(mergeProps({ as: "select" }, rawProps) as FieldInputProps<"select">);
}
