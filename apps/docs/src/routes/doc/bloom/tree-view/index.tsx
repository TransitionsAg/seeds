import { collection, TreeView } from "@transitionsag/bloom";

const sampleCollection = collection({
  rootNode: {
    children: [
      {
        name: "Components",
        children: [{ name: "Button" }, { name: "Checkbox" }],
      },
      { name: "Forms" },
    ],
  },
  nodeToValue: (node) => node.name,
  nodeToString: (node) => node.name,
});

export default function BloomTreeViewDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Tree View</h1>
      <p class="typo-p mb-8">
        Styled tree view with CVA-based theming, built on the primitives layer.
      </p>

      <h2 class="typo-h3 mb-4">Usage</h2>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`import { TreeView, collection } from "@transitionsag/bloom";
import "@transitionsag/bloom/styles.css";

const coll = collection({
  rootNode: { children: [{ name: "Item" }] },
  nodeToValue: (node) => node.name,
  nodeToString: (node) => node.name,
});

<TreeView id="nav" collection={coll}>
  <TreeView.Tree>
    <TreeView.Item node={{ name: "Item" }} indexPath={[0]}>
      <TreeView.Item.Text>Item</TreeView.Item.Text>
    </TreeView.Item>
  </TreeView.Tree>
</TreeView>`}
      </pre>

      <h2 class="typo-h3 mb-4">Preview</h2>
      <TreeView id="docs-preview" collection={sampleCollection}>
        <TreeView.Label>Components</TreeView.Label>
        <TreeView.Tree>
          <TreeView.Branch
            node={{
              name: "Components",
              children: [{ name: "Button" }, { name: "Checkbox" }],
            }}
            indexPath={[0]}
          >
            <TreeView.Branch.Control>
              <TreeView.Branch.Trigger />
              <TreeView.Branch.Text>Components</TreeView.Branch.Text>
            </TreeView.Branch.Control>
            <TreeView.Branch.Content>
              <TreeView.Item node={{ name: "Button" }} indexPath={[0, 0]}>
                <TreeView.Item.Text>Button</TreeView.Item.Text>
              </TreeView.Item>
              <TreeView.Item node={{ name: "Checkbox" }} indexPath={[0, 1]}>
                <TreeView.Item.Text>Checkbox</TreeView.Item.Text>
              </TreeView.Item>
            </TreeView.Branch.Content>
          </TreeView.Branch>
          <TreeView.Item node={{ name: "Forms" }} indexPath={[1]}>
            <TreeView.Item.Text>Forms</TreeView.Item.Text>
          </TreeView.Item>
        </TreeView.Tree>
      </TreeView>
    </div>
  );
}
