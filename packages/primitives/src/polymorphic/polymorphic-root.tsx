import {
  type ComponentProps,
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";

/**
 * Props for a polymorphic component that can render as any valid SolidJS component.
 *
 * @example
 * ```tsx
 * function Button<T extends ValidComponent = "button">(props: PolymorphicProps<T>) {
 *   return <Dynamic component={props.as || "button"} {...props} />
 * }
 * ```
 */
export type PolymorphicProps<T extends ValidComponent> = {
  as?: T;
} & Omit<ComponentProps<T>, "as">;

/**
 * A generic polymorphic component that renders as any HTML element or
 * custom component via the `as` prop, forwarding all remaining props
 * with full type safety.
 *
 * @example
 * ```tsx
 * <Polymorphic as="a" href="/home">Home</Polymorphic>
 * <Polymorphic as="button" type="submit">Send</Polymorphic>
 * <Polymorphic as={MyComponent} custom="prop" />
 * ```
 */
function PolymorphicRoot<T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);

  // @ts-ignore: Props are valid but not worth calculating
  return <Dynamic {...others} component={local.as} />;
}

export const Polymorphic = Object.assign(PolymorphicRoot, {
  Root: PolymorphicRoot,
}) as typeof PolymorphicRoot & { Root: typeof PolymorphicRoot };
