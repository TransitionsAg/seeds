import { type ValidComponent, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "@transitionsag/primitives/polymorphic";
import { useFieldContext } from "./context.ts";

export type FieldInputProps<T extends ValidComponent = "input"> = PolymorphicProps<T>;

/**
 * Polymorphic input wired to the parent `Field` binding.
 *
 * Spreads HTML constraint attrs, ARIA attrs, `value`/`checked`, `onInput`,
 * and `onBlur` from the binding context. Automatically detects `type="checkbox"`
 * and `type="radio"` to bind `checked` (boolean) instead of `value` (string).
 * Defaults to `<input>`, but can render as `<textarea>`, `<select>`, or any
 * custom component via the `as` prop. All defaults can be overridden by
 * passing props directly.
 */
export function FieldInput<T extends ValidComponent = "input">(rawProps: FieldInputProps<T>) {
  const ctx = useFieldContext();
  const { binding } = ctx;

  const inputType = (rawProps as { type?: string }).type;
  const isCheckbox = inputType === "checkbox";
  const isRadio = inputType === "radio";

  const merged = mergeProps(
    { as: "input" as T },
    binding.attrs,
    isCheckbox
      ? {
          get checked() {
            return !!binding.value;
          },
          onInput: (e: Event) => {
            binding.setValue((e.currentTarget as HTMLInputElement).checked);
          },
          name: ctx.name,
        }
      : isRadio
        ? {
            get checked() {
              return binding.value === (rawProps as { value?: unknown }).value;
            },
            onInput: (e: Event) => {
              const target = e.currentTarget as HTMLInputElement;
              if (target.checked) {
                binding.setValue((rawProps as { value?: unknown }).value as never);
              }
            },
            name: ctx.name,
          }
        : {
            get value() {
              return binding.value;
            },
            onInput: (e: Event) => {
              binding.setValue((e.currentTarget as HTMLInputElement).value);
            },
            name: ctx.name,
          },
    rawProps,
  );
  const [local, others] = splitProps(merged, ["as"]);

  return (
    // @ts-ignore: Props are valid but not worth calculating
    <Dynamic
      {...others}
      component={local.as}
      id={ctx.inputId}
      aria-describedby={ctx.describedby}
      aria-invalid={binding.aria.invalid ? "true" : undefined}
      aria-required={binding.aria.required ? "true" : undefined}
      onblur={() => binding.onBlur()}
    />
  );
}
