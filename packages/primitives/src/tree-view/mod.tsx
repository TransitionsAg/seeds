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
  TreeViewNodeCheckbox,
  TreeViewNodeRenameInput,
} from "./tree-view-node.tsx";

export { collection, filePathCollection } from "@zag-js/tree-view";
export type { NodeProps } from "@zag-js/tree-view";

export type { TreeViewApi, TreeViewNodeProps } from "./tree-view-root.tsx";
export {
  TreeViewApiContext,
  TreeViewNodeContext,
  useTreeViewApi,
  useTreeViewNode,
} from "./tree-view-root.tsx";

export { TreeViewRoot } from "./tree-view-root.tsx";
export { TreeViewLabel } from "./tree-view-label.tsx";
export { TreeViewTree } from "./tree-view-tree.tsx";

export { TreeViewItemRoot } from "./tree-view-item/tree-view-item-root.tsx";
export { TreeViewItemText } from "./tree-view-item/tree-view-item-text.tsx";
export { TreeViewItemIndicator } from "./tree-view-item/tree-view-item-indicator.tsx";

export { TreeViewBranchRoot } from "./tree-view-branch/tree-view-branch-root.tsx";
export { TreeViewBranchControl } from "./tree-view-branch/tree-view-branch-control.tsx";
export { TreeViewBranchContent } from "./tree-view-branch/tree-view-branch-content.tsx";
export { TreeViewBranchText } from "./tree-view-branch/tree-view-branch-text.tsx";
export { TreeViewBranchTrigger } from "./tree-view-branch/tree-view-branch-trigger.tsx";
export { TreeViewBranchIndicator } from "./tree-view-branch/tree-view-branch-indicator.tsx";
export { TreeViewBranchIndentGuide } from "./tree-view-branch/tree-view-branch-indent-guide.tsx";

export {
  TreeViewNodeCheckbox,
  TreeViewNodeRenameInput,
} from "./tree-view-node.tsx";

const Item = Object.assign(TreeViewItemRoot, {
  Root: TreeViewItemRoot,
  Text: TreeViewItemText,
  Indicator: TreeViewItemIndicator,
  Checkbox: TreeViewNodeCheckbox,
  RenameInput: TreeViewNodeRenameInput,
}) as typeof TreeViewItemRoot & {
  Root: typeof TreeViewItemRoot;
  Text: typeof TreeViewItemText;
  Indicator: typeof TreeViewItemIndicator;
  Checkbox: typeof TreeViewNodeCheckbox;
  RenameInput: typeof TreeViewNodeRenameInput;
};

const Branch = Object.assign(TreeViewBranchRoot, {
  Root: TreeViewBranchRoot,
  Control: TreeViewBranchControl,
  Content: TreeViewBranchContent,
  Text: TreeViewBranchText,
  Trigger: TreeViewBranchTrigger,
  Indicator: TreeViewBranchIndicator,
  IndentGuide: TreeViewBranchIndentGuide,
  Checkbox: TreeViewNodeCheckbox,
  RenameInput: TreeViewNodeRenameInput,
}) as typeof TreeViewBranchRoot & {
  Root: typeof TreeViewBranchRoot;
  Control: typeof TreeViewBranchControl;
  Content: typeof TreeViewBranchContent;
  Text: typeof TreeViewBranchText;
  Trigger: typeof TreeViewBranchTrigger;
  Indicator: typeof TreeViewBranchIndicator;
  IndentGuide: typeof TreeViewBranchIndentGuide;
  Checkbox: typeof TreeViewNodeCheckbox;
  RenameInput: typeof TreeViewNodeRenameInput;
};

const Node = {
  Checkbox: TreeViewNodeCheckbox,
  RenameInput: TreeViewNodeRenameInput,
};

/**
 * Unstyled tree view primitive wrapping `@zag-js/tree-view`.
 * Supports expandable branches, item selection, checkboxes, and inline renaming.
 *
 * @example
 * ```tsx
 * import { TreeView, collection } from "@transitionsag/primitives/tree-view"
 *
 * const myCollection = collection({
 *   rootNode: { children: [{ name: "readme.md" }, { name: "src", children: [...] }] },
 *   nodeToValue: (node) => node.name,
 *   nodeToString: (node) => node.name,
 * })
 *
 * <TreeView id="explorer" collection={myCollection}>
 *   <TreeView.Label>Explorer</TreeView.Label>
 *   <TreeView.Tree>
 *     <TreeView.Item node={file} indexPath={[0]}>
 *       <TreeView.Item.Text>{file.name}</TreeView.Item.Text>
 *     </TreeView.Item>
 *     <TreeView.Branch node={folder} indexPath={[1]}>
 *       <TreeView.Branch.Control>
 *         <TreeView.Branch.Trigger />
 *         <TreeView.Branch.Text>{folder.name}</TreeView.Branch.Text>
 *       </TreeView.Branch.Control>
 *       <TreeView.Branch.Content>
 *         ...
 *       </TreeView.Branch.Content>
 *     </TreeView.Branch>
 *   </TreeView.Tree>
 * </TreeView>
 * ```
 */
export const TreeView = Object.assign(TreeViewRoot, {
  Root: TreeViewRoot,
  Label: TreeViewLabel,
  Tree: TreeViewTree,
  Item,
  Branch,
  Node,
}) as typeof TreeViewRoot & {
  Root: typeof TreeViewRoot;
  Label: typeof TreeViewLabel;
  Tree: typeof TreeViewTree;
  Item: typeof Item;
  Branch: typeof Branch;
  Node: typeof Node;
};
