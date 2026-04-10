import { type JSX, splitProps } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";
import { CaretRightIcon } from "@transitionsag/phosphor-solid/caret-right";

type BranchTriggerProps = Parameters<
  typeof TreeViewPrimitive.Branch.Trigger
>[0];

export function TreeViewBranchTrigger(
  rawProps: BranchTriggerProps,
): JSX.Element {
  const [local, others] = splitProps(rawProps, ["class"]);
  return (
    <TreeViewPrimitive.Branch.Trigger
      {...others}
      class={`flex items-center transition-transform duration-200 [&[data-expanded]]:rotate-90 ${
        local.class ?? ""
      }`}
    >
      <CaretRightIcon class="size-4 shrink-0" />
    </TreeViewPrimitive.Branch.Trigger>
  );
}
