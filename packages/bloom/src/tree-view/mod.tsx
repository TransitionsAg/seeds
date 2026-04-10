import { TreeViewRoot } from "./tree-view-root.tsx";
import { TreeViewLabel } from "./tree-view-label.tsx";
import { TreeViewTree } from "./tree-view-tree.tsx";
import { TreeViewItemRoot } from "./tree-view-item/tree-view-item-root.tsx";
import { TreeViewItemText } from "./tree-view-item/tree-view-item-text.tsx";
import { TreeViewItemIndicator } from "./tree-view-item/tree-view-item-indicator.tsx";
import { TreeViewBranchRoot } from "./tree-view-branch/tree-view-branch-root.tsx";
import { TreeViewBranchControl } from "./tree-view-branch/tree-view-branch-control.tsx";
import { TreeViewBranchContent } from "./tree-view-branch/tree-view-branch-content.tsx";
import { TreeViewBranchText } from "./tree-view-branch/tree-view-branch-text.tsx";
import { TreeViewBranchTrigger } from "./tree-view-branch/tree-view-branch-trigger.tsx";
import { TreeViewBranchIndicator } from "./tree-view-branch/tree-view-branch-indicator.tsx";
import { TreeViewBranchIndentGuide } from "./tree-view-branch/tree-view-branch-indent-guide.tsx";
import {
  collection,
  TreeView as TreeViewPrimitive,
  type TreeViewApi,
  type TreeViewNodeProps,
} from "@transitionsag/primitives/tree-view";

export { collection };
export type { TreeViewApi, TreeViewNodeProps };

const Node = {
  Checkbox: TreeViewPrimitive.Node.Checkbox,
  RenameInput: TreeViewPrimitive.Node.RenameInput,
};

const Item = Object.assign(TreeViewItemRoot, {
  Root: TreeViewItemRoot,
  Text: TreeViewItemText,
  Indicator: TreeViewItemIndicator,
  Checkbox: Node.Checkbox,
  RenameInput: Node.RenameInput,
});

const Branch = Object.assign(TreeViewBranchRoot, {
  Root: TreeViewBranchRoot,
  Control: TreeViewBranchControl,
  Content: TreeViewBranchContent,
  Text: TreeViewBranchText,
  Trigger: TreeViewBranchTrigger,
  Indicator: TreeViewBranchIndicator,
  IndentGuide: TreeViewBranchIndentGuide,
  Checkbox: Node.Checkbox,
  RenameInput: Node.RenameInput,
});

export const TreeView = Object.assign(TreeViewRoot, {
  Root: TreeViewRoot,
  Label: TreeViewLabel,
  Tree: TreeViewTree,
  Item,
  Branch,
  Node,
});
