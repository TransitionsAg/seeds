import { For, Show } from "solid-js";
import { collection, TreeView } from "@transitionsag/primitives/tree-view";

type TreeNode = { name: string; children?: TreeNode[] };

const sampleCollection = collection({
  rootNode: {
    name: "",
    children: [
      {
        name: "Components",
        children: [{ name: "Button" }, { name: "Checkbox" }],
      },
      { name: "Forms" },
    ],
  } satisfies TreeNode,
  nodeToValue: (node: TreeNode) => node.name,
  nodeToString: (node: TreeNode) => node.name,
});

const rootChildren = sampleCollection.rootNode.children ?? [];

function TreeNodePreview(props: { node: TreeNode; indexPath: number[] }) {
  return (
    <Show
      when={props.node.children?.length}
      fallback={
        <TreeView.Item node={props.node} indexPath={props.indexPath}>
          <TreeView.Item.Text>{props.node.name}</TreeView.Item.Text>
        </TreeView.Item>
      }
    >
      <TreeView.Branch node={props.node} indexPath={props.indexPath}>
        <TreeView.Branch.Control>
          <TreeView.Branch.Trigger />
          <TreeView.Branch.Text>{props.node.name}</TreeView.Branch.Text>
        </TreeView.Branch.Control>
        <TreeView.Branch.Content>
          <For each={props.node.children ?? []}>
            {(child, index) => (
              <TreeNodePreview node={child} indexPath={[...props.indexPath, index()]} />
            )}
          </For>
        </TreeView.Branch.Content>
      </TreeView.Branch>
    </Show>
  );
}

export function PrimitiveTreeViewPreview() {
  return (
    <TreeView id="docs-preview" collection={sampleCollection}>
      <TreeView.Label>Components</TreeView.Label>
      <TreeView.Tree>
        <For each={rootChildren}>
          {(node, index) => <TreeNodePreview node={node} indexPath={[index()]} />}
        </For>
      </TreeView.Tree>
    </TreeView>
  );
}
