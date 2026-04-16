import { type JSX, mergeProps, useContext, type ValidComponent } from "solid-js";
import { ButtonRoot, type ButtonProps } from "../button/button-root.tsx";
import { ButtonGroupContext } from "./button-group-root.tsx";

type ButtonGroupItemProps<T extends ValidComponent = "button"> = ButtonProps<T>;

export function ButtonGroupItem<T extends ValidComponent = "button">(
  rawProps: ButtonGroupItemProps<T>,
): JSX.Element {
  const group = useContext(ButtonGroupContext);
  const props = mergeProps(group, rawProps) as ButtonGroupItemProps<T>;

  return <ButtonRoot {...props} />;
}
