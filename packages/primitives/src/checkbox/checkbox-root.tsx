import {
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
import * as checkbox from "@zag-js/checkbox";
import type { PolymorphicProps } from "../polymorphic/mod.tsx";

export type CheckboxApi = ReturnType<typeof checkbox.connect>;

export const CheckboxApiContext: Context<CheckboxApi | undefined> =
  createContext<CheckboxApi | undefined>();
export const useCheckboxApi = (): CheckboxApi =>
  useContext(CheckboxApiContext)!;

type CheckboxRootProps<T extends ValidComponent = "label"> =
  & PolymorphicProps<T>
  & checkbox.Props
  & { children: JSX.Element };

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
    <CheckboxApiContext.Provider value={api()}>
      {/* @ts-ignore: Props are valid but not worth calculating */}
      <Dynamic
        {...mergeProps(api().getRootProps(), rest)}
        component={local.as}
      >
        {local.children}
      </Dynamic>
    </CheckboxApiContext.Provider>
  );
}
