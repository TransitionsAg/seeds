import {
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import {
  Polymorphic,
  type PolymorphicProps,
} from "../polymorphic/polymorphic-root.tsx";

function ButtonRoot<T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T>,
): JSX.Element {
  const merged = mergeProps({ type: "button" }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);

  return <Polymorphic as={local.as ?? ("button" as T)} {...others} />;
}

export { ButtonRoot };
