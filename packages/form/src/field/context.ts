import { createContext, useContext } from "solid-js";
import type { Binding } from "../input/index.ts";

export type FieldContextValue = {
  /** Auto-generated ID for the input element. */
  inputId: string;
  /** ID for the description element. */
  descriptionId: string;
  /** ID for the error element (matches `binding.aria.describedby`). */
  errorId: string;
  /** Space-separated IDs for `aria-describedby` on the input. */
  describedby: string;
  /** The dot-path field name (e.g. `"address.city"`). */
  name: string;
  /** The binding for this field. */
  // deno-lint-ignore no-explicit-any
  binding: Binding<any>;
};

const FieldContext = createContext<FieldContextValue>();

export function useFieldContext(): FieldContextValue {
  const ctx = useContext(FieldContext);
  if (!ctx) {
    throw new Error("Field.* components must be used within a <Field>");
  }
  return ctx;
}

export { FieldContext };
