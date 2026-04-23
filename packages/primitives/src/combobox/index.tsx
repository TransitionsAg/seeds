import { ComboboxRoot } from "./combobox-root.tsx";
import { ComboboxLabel } from "./combobox-label.tsx";
import { ComboboxControl } from "./combobox-control.tsx";
import { ComboboxInput } from "./combobox-input.tsx";
import { ComboboxTrigger } from "./combobox-trigger.tsx";
import { ComboboxClearTrigger } from "./combobox-clear-trigger.tsx";
import { ComboboxPositioner } from "./combobox-positioner.tsx";
import { ComboboxContent } from "./combobox-content.tsx";
import { ComboboxList } from "./combobox-list.tsx";
import { ComboboxItemRoot } from "./combobox-item/combobox-item-root.tsx";
import { ComboboxItemText } from "./combobox-item/combobox-item-text.tsx";
import { ComboboxItemIndicator } from "./combobox-item/combobox-item-indicator.tsx";
import { ComboboxItemGroupRoot } from "./combobox-item-group/combobox-item-group-root.tsx";
import { ComboboxItemGroupLabel } from "./combobox-item-group/combobox-item-group-label.tsx";

export { collection } from "@zag-js/combobox";
export type {
  HighlightChangeDetails,
  InputValueChangeDetails,
  InputValueChangeReason,
  ItemGroupLabelProps,
  ItemGroupProps,
  ItemProps,
  NavigateDetails,
  OpenChangeDetails,
  OpenChangeReason,
  SelectionDetails,
  TriggerProps,
  ValueChangeDetails,
} from "@zag-js/combobox";

export type { ComboboxApi } from "./combobox-root.tsx";
export { ComboboxApiContext, useComboboxApi } from "./combobox-root.tsx";

export { ComboboxRoot } from "./combobox-root.tsx";
export { ComboboxLabel } from "./combobox-label.tsx";
export { ComboboxControl } from "./combobox-control.tsx";
export { ComboboxInput } from "./combobox-input.tsx";
export { ComboboxTrigger } from "./combobox-trigger.tsx";
export { ComboboxClearTrigger } from "./combobox-clear-trigger.tsx";
export { ComboboxPositioner } from "./combobox-positioner.tsx";
export { ComboboxContent } from "./combobox-content.tsx";
export { ComboboxList } from "./combobox-list.tsx";

export {
  ComboboxItemContext,
  useComboboxItem,
  ComboboxItemRoot,
} from "./combobox-item/combobox-item-root.tsx";
export { ComboboxItemText } from "./combobox-item/combobox-item-text.tsx";
export { ComboboxItemIndicator } from "./combobox-item/combobox-item-indicator.tsx";

export {
  ComboboxItemGroupContext,
  useComboboxItemGroup,
  ComboboxItemGroupRoot,
} from "./combobox-item-group/combobox-item-group-root.tsx";
export { ComboboxItemGroupLabel } from "./combobox-item-group/combobox-item-group-label.tsx";

const Item = Object.assign(ComboboxItemRoot, {
  Root: ComboboxItemRoot,
  Text: ComboboxItemText,
  Indicator: ComboboxItemIndicator,
}) as typeof ComboboxItemRoot & {
  Root: typeof ComboboxItemRoot;
  Text: typeof ComboboxItemText;
  Indicator: typeof ComboboxItemIndicator;
};

const ItemGroup = Object.assign(ComboboxItemGroupRoot, {
  Root: ComboboxItemGroupRoot,
  Label: ComboboxItemGroupLabel,
}) as typeof ComboboxItemGroupRoot & {
  Root: typeof ComboboxItemGroupRoot;
  Label: typeof ComboboxItemGroupLabel;
};

/**
 * Unstyled combobox primitive wrapping `@zag-js/combobox`.
 * Supports filtering, keyboard navigation, grouped items, and single or multiple selection.
 */
export const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  Label: ComboboxLabel,
  Control: ComboboxControl,
  Input: ComboboxInput,
  Trigger: ComboboxTrigger,
  ClearTrigger: ComboboxClearTrigger,
  Positioner: ComboboxPositioner,
  Content: ComboboxContent,
  List: ComboboxList,
  Item,
  ItemGroup,
}) as typeof ComboboxRoot & {
  Root: typeof ComboboxRoot;
  Label: typeof ComboboxLabel;
  Control: typeof ComboboxControl;
  Input: typeof ComboboxInput;
  Trigger: typeof ComboboxTrigger;
  ClearTrigger: typeof ComboboxClearTrigger;
  Positioner: typeof ComboboxPositioner;
  Content: typeof ComboboxContent;
  List: typeof ComboboxList;
  Item: typeof Item;
  ItemGroup: typeof ItemGroup;
};
