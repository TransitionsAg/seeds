import type { JSX } from "solid-js";
import { TreeView as TreeViewPrimitive } from "@transitionsag/primitives/tree-view";

type LabelProps = Parameters<typeof TreeViewPrimitive.Label>[0];

export function TreeViewLabel(props: LabelProps): JSX.Element {
  return <TreeViewPrimitive.Label {...props} class="typo-h4 mb-2" />;
}
