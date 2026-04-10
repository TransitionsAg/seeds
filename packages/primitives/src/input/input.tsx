import type { ComponentProps } from "solid-js";

type InputProps = ComponentProps<"input">;

/**
 * A plain `<input>` element.
 *
 * Use this when you need a bare input without any `type` constraint.
 * Pass `type` explicitly to get the desired input behavior.
 *
 * @example
 * ```tsx
 * <Input type="text" />
 * <Input type="email" />
 * <Input type="number" />
 * ```
 */
export function Input(props: InputProps) {
  return <input {...props} />;
}
