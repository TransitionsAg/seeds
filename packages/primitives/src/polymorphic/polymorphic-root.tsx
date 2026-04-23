import { type ComponentProps, type JSX, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";

/**
 * Override source props with a more specific prop shape.
 */
export type OverrideProps<SourceProps extends {}, OverrideProps extends {}> = Omit<
  SourceProps,
  keyof OverrideProps
> &
  OverrideProps;

/**
 * Props for a polymorphic component that can render as any valid SolidJS component.
 */
export type PolymorphicAttributes<T extends ValidComponent> = {
  as?: T;
};

/**
 * Props used by a polymorphic component.
 */
export type PolymorphicProps<T extends ValidComponent, Props extends {} = {}> = OverrideProps<
  ComponentProps<T>,
  Props & PolymorphicAttributes<T>
>;

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
function PolymorphicRoot(props: { as: ValidComponent } & Record<string, unknown>): JSX.Element {
  const [local, others] = splitProps(props, ["as"]);

  if (!local.as) {
    throw Error("Polymorphic component requires an `as` prop");
  }

  // @ts-ignore: Props are valid but not worth calculating
  return <Dynamic {...others} component={local.as} />;
}

export const Polymorphic = Object.assign(PolymorphicRoot, {
  Root: PolymorphicRoot,
}) as typeof PolymorphicRoot & { Root: typeof PolymorphicRoot };
