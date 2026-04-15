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

type AvatarRootProps<T extends ValidComponent = "div"> = PolymorphicProps<T> &
  Omit<avatar.Props, "id"> & { id?: string; children: JSX.Element };

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
  const merged = mergeProps({ as: "div" as T, id: createUniqueId() }, rawProps);
  const [local, rest] = splitProps(merged, ["children", "as"]);
  const service = useMachine(avatar.machine, rest);
  const api = createMemo(() => avatar.connect(service, normalizeProps));

  return (
    <AvatarApiContext.Provider value={api}>
      {/* @ts-ignore: polymorphic spread props are valid but too complex for TS */}
      <Polymorphic {...mergeProps(api().getRootProps(), rest)} as={local.as}>
        {local.children}
      </Polymorphic>
    </AvatarApiContext.Provider>
  );
}
