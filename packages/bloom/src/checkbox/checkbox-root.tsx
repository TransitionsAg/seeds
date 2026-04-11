import { type JSX, splitProps } from "solid-js";
import { Checkbox as CheckboxPrimitive } from "@transitionsag/primitives/checkbox";
import { cva, type VariantProps } from "../cva.ts";
import { CheckIcon } from "@transitionsag/phosphor-solid/check";

export const checkboxVariants: (props?: { class?: string }) => string = cva({
  base: "inline-flex items-center gap-2 cursor-pointer select-none",
});

const controlVariants = cva({
  base: "size-5 rounded flex items-center justify-center transition-colors ring-2 ring-border [&[data-state=checked]]:bg-primary [&[data-state=checked]]:ring-primary [&[data-state=indeterminate]]:bg-primary [&[data-state=indeterminate]]:ring-primary invalid:ring-destructive disabled:opacity-50 disabled:cursor-not-allowed",
});

const indicatorVariants = cva({
  base: "size-3 text-primary-foreground",
});

const labelVariants = cva({
  base: "typo-p",
});

type CheckboxRootProps = VariantProps<typeof checkboxVariants> &
  Parameters<typeof CheckboxPrimitive.Root>[0] & {
    children?: JSX.Element;
    name?: string;
    value?: string;
    form?: string;
  };

export function CheckboxRoot(rawProps: CheckboxRootProps): JSX.Element {
  const [local, rootRest] = splitProps(rawProps, ["class", "children", "name", "value", "form"]);

  const [hiddenInputProps] = splitProps(local, ["name", "value", "form"]);

  return (
    // @ts-ignore: Props are valid but not worth calculating
    <CheckboxPrimitive.Root {...rootRest} class={checkboxVariants({ class: local.class })}>
      <CheckboxPrimitive.Control class={controlVariants()}>
        <CheckboxPrimitive.Indicator class={indicatorVariants()}>
          <CheckIcon weight="bold" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
      <CheckboxPrimitive.Label class={labelVariants()}>{local.children}</CheckboxPrimitive.Label>
      <CheckboxPrimitive.HiddenInput {...hiddenInputProps} />
    </CheckboxPrimitive.Root>
  );
}
