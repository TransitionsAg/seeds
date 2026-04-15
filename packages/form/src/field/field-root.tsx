import { createUniqueId, type JSX, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { PolymorphicProps } from "@transitionsag/primitives/polymorphic";
import type { Binding } from "../binding/index.ts";
import { FieldContext } from "./context.ts";
import { FieldLabel } from "./field-label.tsx";
import { FieldInput } from "./field-input.tsx";
import { FieldDescription } from "./field-description.tsx";
import { FieldError } from "./field-error.tsx";
import { FieldTextarea } from "./field-textarea.tsx";
import { FieldSelect } from "./field-select.tsx";
import type { Path } from "./field-path.ts";

type FieldRootProps<
  T extends object,
  C extends ValidComponent | undefined = undefined,
> = C extends ValidComponent
  ? { name: Path<T>; as: C } & Omit<PolymorphicProps<C>, "as">
  : { name: Path<T>; as?: undefined; children?: JSX.Element };

export function createField<T extends object>(
  // deno-lint-ignore no-explicit-any
  binder: (...keys: string[]) => Binding<any>,
): FieldComponent<T> {
  function FieldRoot<C extends ValidComponent | undefined = undefined>(
    rawProps: FieldRootProps<T, C>,
  ) {
    const uid = createUniqueId();
    const inputId = `${uid}-input`;
    const descriptionId = `${uid}-description`;

    const [local, others] = splitProps(rawProps as Record<string, unknown>, ["as", "name"]);

    const keys = (local.name as string).split(".");
    const binding = binder(...keys);

    const ctx = {
      inputId,
      descriptionId,
      name: local.name as string,
      get errorId() {
        return binding.aria.describedby;
      },
      get describedby() {
        return `${binding.aria.describedby} ${descriptionId}`;
      },
      get binding() {
        return binding;
      },
    };

    return (
      <FieldContext.Provider value={ctx}>
        {local.as ? (
          // @ts-ignore: Props are valid but not worth calculating
          <Dynamic {...others} component={local.as} />
        ) : (
          (others as { children?: JSX.Element }).children
        )}
      </FieldContext.Provider>
    );
  }

  return Object.assign(FieldRoot, {
    Root: FieldRoot,
    Label: FieldLabel,
    Input: FieldInput,
    Textarea: FieldTextarea,
    Select: FieldSelect,
    Description: FieldDescription,
    Error: FieldError,
  }) as unknown as FieldComponent<T>;
}

/** Type of the compound Field component returned by {@linkcode createField}. */
export type FieldComponent<T extends object> = {
  <C extends ValidComponent | undefined = undefined>(props: FieldRootProps<T, C>): JSX.Element;
  Root: <C extends ValidComponent | undefined = undefined>(
    props: FieldRootProps<T, C>,
  ) => JSX.Element;
  Label: <C extends ValidComponent = "label">(
    props: import("./field-label.tsx").LabelProps<C>,
  ) => JSX.Element;
  Input: <C extends ValidComponent = "input">(
    props: import("./field-input.tsx").FieldInputProps<C>,
  ) => JSX.Element;
  Textarea: (props: import("./field-textarea.tsx").TextareaProps) => JSX.Element;
  Select: (props: import("./field-select.tsx").SelectProps) => JSX.Element;
  Description: <C extends ValidComponent = "div">(
    props: import("./field-description.tsx").DescriptionProps<C>,
  ) => JSX.Element;
  Error: <C extends ValidComponent = "div">(
    props: import("./field-error.tsx").ErrorProps<C>,
  ) => JSX.Element;
};
