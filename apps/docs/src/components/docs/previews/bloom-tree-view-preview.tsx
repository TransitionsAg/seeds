import { collection, TreeView } from "@transitionsag/bloom";

type TreeNode = { name: string; children?: TreeNode[] };

const sampleCollection = collection<TreeNode>({
  rootNode: {
    name: "",
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

export function BloomTreeViewPreview() {
  return (
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
  );
}
