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
import { normalizeProps, type PropTypes, useMachine } from "@zag-js/solid";
import * as combobox from "@zag-js/combobox";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";

export type ComboboxApi = combobox.Api<PropTypes>;

export const ComboboxApiContext: Context<Accessor<ComboboxApi> | undefined> = createContext<
  Accessor<ComboboxApi> | undefined
>();
export const useComboboxApi = (): Accessor<ComboboxApi> | undefined =>
  useContext(ComboboxApiContext);

type ComboboxRootProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  combobox.Props & { children: JSX.Element }
>;

/**
 * Root component for the combobox. Provides the zag-js combobox machine context
 * to descendant parts.
 *
 * @example
 * ```tsx
 * <Combobox id="frameworks" collection={frameworks}>
 *   <Combobox.Label>Framework</Combobox.Label>
 *   <Combobox.Control>
 *     <Combobox.Input />
 *     <Combobox.Trigger />
 *   </Combobox.Control>
 *   <Combobox.Positioner>
 *     <Combobox.Content>
 *       <Combobox.List>
 *         <Combobox.Item item={framework}>
 *           <Combobox.Item.Text>{framework.label}</Combobox.Item.Text>
 *         </Combobox.Item>
 *       </Combobox.List>
 *     </Combobox.Content>
 *   </Combobox.Positioner>
 * </Combobox>
 * ```
 */
export function ComboboxRoot<T extends ValidComponent = "div">(
  rawProps: ComboboxRootProps<T>,
): JSX.Element {
  const [local, machineProps] = splitProps(rawProps, ["children", "as"]);
  const service = useMachine(combobox.machine, machineProps);
  const api = createMemo(() => combobox.connect(service, normalizeProps));
  const props = mergeProps({ as: local.as ?? ("div" as T) }, machineProps, api().getRootProps());

  return (
    <ComboboxApiContext.Provider value={api}>
      <Polymorphic {...props}>{local.children}</Polymorphic>
    </ComboboxApiContext.Provider>
  );
}
