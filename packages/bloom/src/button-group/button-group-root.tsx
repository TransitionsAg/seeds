import { createContext, createMemo, type JSX, type ValidComponent, splitProps } from "solid-js";
import { Polymorphic, type PolymorphicProps } from "@transitionsag/primitives/polymorphic";
import { buttonVariants } from "../button/button-root.tsx";
import { cva, type VariantProps } from "../cva.ts";

type ButtonIntent = VariantProps<typeof buttonVariants>["intent"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

export type ButtonGroupOrientation = "horizontal" | "vertical";

export type ButtonGroupContextValue = {
  intent?: ButtonIntent;
  size?: ButtonSize;
};

export const ButtonGroupContext = createContext<ButtonGroupContextValue>({});

export const buttonGroupVariants: (props?: {
  class?: string;
  orientation?: ButtonGroupOrientation;
}) => string = cva({
  base: "inline-flex w-fit items-stretch",
  variants: {
    orientation: {
      horizontal: [
        "flex-row",
        "[&>*]:rounded-none",
        "[&>*:first-child]:rounded-l",
        "[&>*:last-child]:rounded-r",
        "[&>*:not(:first-child)]:-ml-0.5",
        "[&>*:focus-visible]:z-10",
      ],
      vertical: [
        "flex-col",
        "[&>*]:rounded-none",
        "[&>*:first-child]:rounded-t",
        "[&>*:last-child]:rounded-b",
        "[&>*:not(:first-child)]:-mt-0.5",
        "[&>*:focus-visible]:z-10",
      ],
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type ButtonGroupRootProps<T extends ValidComponent = "div"> = Omit<PolymorphicProps<T>, "class"> & {
  class?: string;
  intent?: ButtonIntent;
  orientation?: ButtonGroupOrientation;
  size?: ButtonSize;
};

export function ButtonGroupRoot<T extends ValidComponent = "div">(
  rawProps: ButtonGroupRootProps<T>,
): JSX.Element {
  const [local, others] = splitProps(rawProps, ["class", "intent", "orientation", "size"]);
  const polymorphicProps = others as PolymorphicProps<T>;
  const defaults = createMemo(() => ({
    intent: local.intent,
    size: local.size,
  }));

  return (
    <ButtonGroupContext.Provider value={defaults()}>
      <Polymorphic
        {...polymorphicProps}
        class={buttonGroupVariants({ orientation: local.orientation, class: local.class })}
      />
    </ButtonGroupContext.Provider>
  );
}
