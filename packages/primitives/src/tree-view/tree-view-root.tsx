import {
  type Accessor,
  type Context,
  createContext,
  createMemo,
  type JSX,
  mergeProps,
  splitProps,
  useContext,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { normalizeProps, useMachine } from "@zag-js/solid";
import * as treeView from "@zag-js/tree-view";
import type { PolymorphicProps } from "../polymorphic/index.tsx";

export type TreeViewApi = ReturnType<typeof treeView.connect>;
export type TreeViewNodeProps = treeView.NodeProps;

export const TreeViewApiContext: Context<Accessor<TreeViewApi> | undefined> = createContext<
  Accessor<TreeViewApi> | undefined
>();
export const useTreeViewApi = (): Accessor<TreeViewApi> => useContext(TreeViewApiContext)!;

export const TreeViewNodeContext: Context<TreeViewNodeProps | undefined> = createContext<
  TreeViewNodeProps | undefined
>();
export const useTreeViewNode = (): TreeViewNodeProps => useContext(TreeViewNodeContext)!;

type TreeViewRootProps<T extends ValidComponent = "div"> = PolymorphicProps<T> &
  treeView.Props & { children: JSX.Element };

/**
 * Root component for the tree view. Provides the zag-js tree view machine context
 * to all descendant parts.
 *
 * @example
 * ```tsx
 * <TreeView id="files" collection={myCollection}>
 *   <TreeView.Label>Files</TreeView.Label>
 *   <TreeView.Tree>
 *     <TreeView.Item node={node} indexPath={[0]}>
 *       <TreeView.Item.Text>{node.name}</TreeView.Item.Text>
 *     </TreeView.Item>
 *   </TreeView.Tree>
 * </TreeView>
 * ```
 */
export function TreeViewRoot<T extends ValidComponent = "div">(
  rawProps: TreeViewRootProps<T>,
): JSX.Element {
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, rest] = splitProps(merged, ["children", "as"]);
  const service = useMachine(treeView.machine, rest);
  const api = createMemo(() => treeView.connect(service, normalizeProps));

  return (
    <TreeViewApiContext.Provider value={api}>
      {/* @ts-ignore: polymorphic spread props are valid but too complex for TS */}
      <Dynamic {...mergeProps(api().getRootProps(), rest)} component={local.as}>
        {local.children}
      </Dynamic>
    </TreeViewApiContext.Provider>
  );
}
