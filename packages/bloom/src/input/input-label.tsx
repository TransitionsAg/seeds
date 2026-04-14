import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { cva } from "../cva.ts";

const labelVariants = cva({
  base: [
    "absolute left-5 top-6 -translate-y-1/2 text-caption pointer-events-none transition-all",
    "peer-focus:text-xs/[8px] peer-focus:top-4 peer-focus:font-medium",
    "peer-[:not(:placeholder-shown)]:text-xs/[8px] peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:font-medium",
    "peer-aria-invalid:text-destructive-accent",
  ],
});

type InputLabelProps = ComponentProps<"label">;

export function InputLabel(props: InputLabelProps): JSX.Element {
  const [local, inputProps] = splitProps(props, ["class"]);
  return <label {...inputProps} class={labelVariants({ class: local.class })} />;
}
