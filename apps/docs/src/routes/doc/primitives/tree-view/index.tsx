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

function TreeNodeEl(props: { node: TreeNode; indexPath: number[] }) {
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
          <For each={props.node.children}>
            {(child, i) => <TreeNodeEl node={child} indexPath={[...props.indexPath, i()]} />}
          </For>
        </TreeView.Branch.Content>
      </TreeView.Branch>
    </Show>
  );
}

export default function TreeViewDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Tree View</h1>
      <p class="typo-p mb-8">A tree view primitive for hierarchical navigation, built on zag-js.</p>

      <h2 class="typo-h3 mb-4">Installation</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { TreeView, collection } from "@transitionsag/primitives/tree-view";`}
      </pre>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`const coll = collection({
  rootNode: { children: [{ name: "Item" }] },
  nodeToValue: (node) => node.name,
  nodeToString: (node) => node.name,
});

function TreeNode({ node, indexPath }) {
  return (
    <Show when={node.children?.length} fallback={
      <TreeView.Item node={node} indexPath={indexPath}>
        <TreeView.Item.Text>{node.name}</TreeView.Item.Text>
      </TreeView.Item>
    }>
      <TreeView.Branch node={node} indexPath={indexPath}>
        <TreeView.Branch.Control>
          <TreeView.Branch.Trigger />
          <TreeView.Branch.Text>{node.name}</TreeView.Branch.Text>
        </TreeView.Branch.Control>
        <TreeView.Branch.Content>
          <For each={node.children}>
            {(child, i) => (
              <TreeNode node={child} indexPath={[...indexPath, i()]} />
            )}
          </For>
        </TreeView.Branch.Content>
      </TreeView.Branch>
    </Show>
  );
}

<TreeView id="nav" collection={coll}>
  <TreeView.Tree>
    <For each={coll.rootNode.children}>
      {(node, i) => <TreeNode node={node} indexPath={[i()]} />}
    </For>
  </TreeView.Tree>
</TreeView>`}
      </pre>

      <h2 class="typo-h3 mb-4">Compound Components</h2>
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 pr-4 font-medium">Part</th>
            <th class="text-left py-2 pr-4 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Root</code>
            </td>
            <td class="py-2 pr-4">Tree container</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Label</code>
            </td>
            <td class="py-2 pr-4">Accessible label</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Tree</code>
            </td>
            <td class="py-2 pr-4">Tree list container</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Item.Root</code>
            </td>
            <td class="py-2 pr-4">Leaf node</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Item.Text</code>
            </td>
            <td class="py-2 pr-4">Item label text</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Branch.Root</code>
            </td>
            <td class="py-2 pr-4">Expandable node</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Branch.Control</code>
            </td>
            <td class="py-2 pr-4">Branch interactive area</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Branch.Trigger</code>
            </td>
            <td class="py-2 pr-4">Expand/collapse toggle</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Branch.Content</code>
            </td>
            <td class="py-2 pr-4">Collapsible children container</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Branch.Indicator</code>
            </td>
            <td class="py-2 pr-4">Expand/collapse icon</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>Branch.IndentGuide</code>
            </td>
            <td class="py-2 pr-4">Visual indentation line</td>
          </tr>
        </tbody>
      </table>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <TreeView id="docs-preview" collection={sampleCollection}>
        <TreeView.Label>Components</TreeView.Label>
        <TreeView.Tree>
          <For each={sampleCollection.rootNode.children}>
            {(node, i) => <TreeNodeEl node={node} indexPath={[i()]} />}
          </For>
        </TreeView.Tree>
      </TreeView>
    </div>
  );
}
