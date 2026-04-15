import { mergeProps } from "solid-js";
import type { FieldInputProps } from "./field-input.tsx";
import { FieldInput } from "./field-input.tsx";

export type TextareaProps = FieldInputProps<"textarea">;

export function FieldTextarea(rawProps: TextareaProps) {
  return FieldInput(mergeProps({ as: "textarea" }, rawProps) as FieldInputProps<"textarea">);
}
