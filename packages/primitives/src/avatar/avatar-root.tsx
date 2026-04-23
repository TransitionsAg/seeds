import {
  type Accessor,
  type Context,
  createContext,
  createMemo,
  createUniqueId,
  type JSX,
  mergeProps,
  splitProps,
  useContext,
  type ValidComponent,
} from "solid-js";
import { normalizeProps, useMachine } from "@zag-js/solid";
import * as avatar from "@zag-js/avatar";
import { Polymorphic, type PolymorphicProps } from "../polymorphic/index.tsx";

export type AvatarApi = ReturnType<typeof avatar.connect>;

export const AvatarApiContext: Context<Accessor<AvatarApi> | undefined> = createContext<
  Accessor<AvatarApi> | undefined
>();
export const useAvatarApi = (): Accessor<AvatarApi> | undefined => useContext(AvatarApiContext);

type AvatarRootProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  Omit<avatar.Props, "id"> & { id?: string; children: JSX.Element }
>;

/**
 * Root component for the avatar. Provides the zag-js avatar machine context
 * to descendant parts.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <Avatar.Fallback>JD</Avatar.Fallback>
 *   <Avatar.Image src="/john.jpg" alt="John Doe" />
 * </Avatar>
 * ```
 */
export function AvatarRoot<T extends ValidComponent = "div">(
  rawProps: AvatarRootProps<T>,
): JSX.Element {
  const id = createUniqueId();
  const [local, machineProps] = splitProps(rawProps, ["children", "as"]);
  const service = useMachine(avatar.machine, mergeProps({ id }, machineProps));
  const api = createMemo(() => avatar.connect(service, normalizeProps));
  const props = mergeProps(
    { as: local.as ?? ("div" as T), id },
    machineProps,
    api().getRootProps(),
  );

  return (
    <AvatarApiContext.Provider value={api}>
      <Polymorphic {...props}>{local.children}</Polymorphic>
    </AvatarApiContext.Provider>
  );
}
