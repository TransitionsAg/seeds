import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { cva } from "../cva.ts";

const inputVariants = cva({
  base: [
    "w-full rounded bg-secondary ring-2 ring-border transition-colors px-5 py-3",
    "invalid:ring-destructive invalid:bg-destructive-foreground",
    "[&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:text-sm/[14px]",
    "focus:pt-6 focus:pb-2 focus:text-sm/[14px]",
    "outline-none peer",
  ],
});

type InputRootProps = ComponentProps<"input">;

export function InputRoot(props: InputRootProps): JSX.Element {
  const [local, inputProps] = splitProps(props, ["class", "children"]);

  return (
    <div class="relative">
      <input
        {...inputProps}
        placeholder=" "
        class={inputVariants({ class: local.class })}
      />
      {local.children}
    </div>
  );
}
