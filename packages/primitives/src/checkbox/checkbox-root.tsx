import {
  type Context,
  createContext,
  createMemo,
  type JSX,
  mergeProps,
  splitProps,
  useContext,
  type ValidComponent,
  Accessor,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { normalizeProps, PropTypes, useMachine } from "@zag-js/solid";
import * as checkbox from "@zag-js/checkbox";
import type { PolymorphicProps } from "../polymorphic/index.tsx";

export type CheckboxApi = checkbox.Api<PropTypes>;

export const CheckboxApiContext: Context<Accessor<checkbox.Api<PropTypes>> | undefined> =
  createContext<Accessor<checkbox.Api<PropTypes>> | undefined>();
export const useCheckboxApi = (): Accessor<checkbox.Api<PropTypes>> | undefined =>
  useContext(CheckboxApiContext)!;

type CheckboxRootProps<T extends ValidComponent = "label"> = PolymorphicProps<T> &
  checkbox.Props & { children: JSX.Element };

/**
 * Root component for the checkbox. Provides the zag-js checkbox machine context
 * to all descendant parts.
 *
 * @example
 * ```tsx
 * <Checkbox id="terms">
 *   <Checkbox.Control>
 *     <Checkbox.Indicator>...</Checkbox.Indicator>
 *   </Checkbox.Control>
 *   <Checkbox.Label>Accept terms</Checkbox.Label>
 *   <Checkbox.HiddenInput />
 * </Checkbox>
 * ```
 */
export function CheckboxRoot<T extends ValidComponent = "label">(
  rawProps: CheckboxRootProps<T>,
): JSX.Element {
  const merged = mergeProps({ as: "label" as T }, rawProps);
  const [local, rest] = splitProps(merged, ["children", "as"]);
  const service = useMachine(checkbox.machine, rest);
  const api = createMemo(() => checkbox.connect(service, normalizeProps));

  return (
    <CheckboxApiContext.Provider value={api}>
      {/* @ts-ignore: Props are valid but not worth calculating */}
      <Dynamic {...mergeProps(api().getRootProps(), rest)} component={local.as}>
        {local.children}
      </Dynamic>
    </CheckboxApiContext.Provider>
  );
}
