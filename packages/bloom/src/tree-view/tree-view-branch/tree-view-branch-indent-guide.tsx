import { type JSX, splitProps } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";

type BranchIndentGuideProps = Parameters<typeof TreeViewPrimitive.Branch.IndentGuide>[0];

export function TreeViewBranchIndentGuide(rawProps: BranchIndentGuideProps): JSX.Element {
  const [local, others] = splitProps(rawProps, ["class"]);
  return (
    <TreeViewPrimitive.Branch.IndentGuide
      {...others}
      class={`border-l border-border ml-2 ${local.class ?? ""}`}
    />
  );
}
