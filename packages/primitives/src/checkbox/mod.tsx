import { CheckboxRoot } from "./checkbox-root.tsx";
import { CheckboxControl } from "./checkbox-control.tsx";
import { CheckboxIndicator } from "./checkbox-indicator.tsx";
import { CheckboxLabel } from "./checkbox-label.tsx";
import { CheckboxHiddenInput } from "./checkbox-hidden-input.tsx";

export type { CheckboxApi } from "./checkbox-root.tsx";
export { CheckboxApiContext, useCheckboxApi } from "./checkbox-root.tsx";

export { CheckboxRoot } from "./checkbox-root.tsx";
export { CheckboxControl } from "./checkbox-control.tsx";
export { CheckboxIndicator } from "./checkbox-indicator.tsx";
export { CheckboxLabel } from "./checkbox-label.tsx";
export { CheckboxHiddenInput } from "./checkbox-hidden-input.tsx";

/**
 * Unstyled checkbox primitive wrapping `@zag-js/checkbox`.
 * Supports checked, unchecked, and indeterminate states with full
 * keyboard and screen-reader accessibility.
 *
 * @example
 * ```tsx
 * import { Checkbox } from "@transitionsag/primitives/checkbox"
 *
 * <Checkbox id="terms">
 *   <Checkbox.Control>
 *     <Checkbox.Indicator>...</Checkbox.Indicator>
 *   </Checkbox.Control>
 *   <Checkbox.Label>Accept terms</Checkbox.Label>
 *   <Checkbox.HiddenInput />
 * </Checkbox>
 * ```
 */
export const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
  HiddenInput: CheckboxHiddenInput,
});
