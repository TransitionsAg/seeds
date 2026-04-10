import {
  createUniqueId,
  type JSX,
  mergeProps,
  Show,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicProps } from "solid-js/web";
import type { Binding } from "../input/mod.ts";
import { FieldContext, useFieldContext } from "./context.ts";

// -- Path utility type --

/**
 * Recursively builds a union of dot-separated key paths for `T`.
 * Only plain objects (matching `Record<string, unknown>`) are recursed
 * into — primitives, `Date`, arrays, and other built-ins are leaves.
 * Recursion is capped at 5 levels to match {@linkcode Binder}.
 */
export type Path<T, Depth extends number[] = []> = Depth["length"] extends 5
  ? never
  : {
    [K in keyof T & string]: T[K] extends Record<string, unknown>
      ? K | `${K}.${Path<T[K], [...Depth, 0]>}`
      : K;
  }[keyof T & string];

// -- Label --

type LabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "for">;

function FieldLabel(props: LabelProps) {
  const ctx = useFieldContext();
  return <label {...props} for={ctx.inputId} />;
}

// -- Input --

type FieldInputProps<T extends ValidComponent = "input"> = {
  as?: T;
} & Omit<DynamicProps<T>, "component">;

/**
 * Polymorphic input wired to the parent `Field` binding.
 *
 * Spreads HTML constraint attrs, ARIA attrs, `value`/`checked`, and `onInput`
 * from the binding context. Automatically detects `type="checkbox"` and
 * `type="radio"` to bind `checked` (boolean) instead of `value` (string).
 * Defaults to `<input>`, but can render as `<textarea>`, `<select>`, or any
 * custom component via the `as` prop. All defaults can be overridden by
 * passing props directly.
 */
function FieldInput<T extends ValidComponent = "input">(
  rawProps: FieldInputProps<T>,
) {
  const ctx = useFieldContext();
  const { binding } = ctx;

  const inputType = (rawProps as { type?: string }).type;
  const isCheckable = inputType === "checkbox" || inputType === "radio";

  const merged = mergeProps(
    { as: "input" as T },
    binding.attrs,
    isCheckable
      ? {
        get checked() {
          return binding.value;
        },
        onInput: (e: Event) => {
          binding.setValue((e.currentTarget as HTMLInputElement).checked);
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
    />
  );
}

// -- Description --

type DescriptionProps<T extends ValidComponent = "div"> = {
  as?: T;
} & Omit<DynamicProps<T>, "component">;

function FieldDescription<T extends ValidComponent = "div">(
  rawProps: DescriptionProps<T>,
) {
  const ctx = useFieldContext();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as"]);

  // @ts-ignore: Props are valid but not worth calculating
  return <Dynamic {...others} component={local.as} id={ctx.descriptionId} />;
}

// -- Error --

type ErrorProps<T extends ValidComponent = "div"> = {
  as?: T;
  children?: JSX.Element;
} & Omit<DynamicProps<T>, "component" | "children">;

/**
 * Error message container. Only renders when the field has validation errors.
 * When no children are provided, renders the error messages joined by `", "`.
 */
function FieldError<T extends ValidComponent = "div">(
  rawProps: ErrorProps<T>,
) {
  const ctx = useFieldContext();
  const merged = mergeProps({ as: "div" as T }, rawProps);
  const [local, others] = splitProps(merged, ["as", "children"]);

  return (
    <Show when={ctx.binding.aria.invalid}>
      {/* @ts-ignore: Props are valid but not worth calculating */}
      <Dynamic {...others} component={local.as} id={ctx.errorId}>
        {local.children !== undefined
          ? local.children
          : ctx.binding.errors?.join(", ")}
      </Dynamic>
    </Show>
  );
}

// -- Field factory --

type FieldRootProps<
  T extends object,
  C extends ValidComponent | undefined = undefined,
> = C extends ValidComponent
  ? { name: Path<T>; as: C } & Omit<DynamicProps<C>, "component">
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

    const [local, others] = splitProps(
      rawProps as Record<string, unknown>,
      ["as", "name"],
    );

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
        {local.as
          // @ts-ignore: Props are valid but not worth calculating
          ? <Dynamic {...others} component={local.as} />
          : (others as { children?: JSX.Element }).children}
      </FieldContext.Provider>
    );
  }

  return Object.assign(FieldRoot, {
    Root: FieldRoot,
    Label: FieldLabel,
    Input: FieldInput,
    Description: FieldDescription,
    Error: FieldError,
  }) as unknown as FieldComponent<T>;
}

/** Type of the compound Field component returned by {@linkcode createField}. */
export type FieldComponent<T extends object> = {
  <C extends ValidComponent | undefined = undefined>(
    props: FieldRootProps<T, C>,
  ): JSX.Element;
  Root: <C extends ValidComponent | undefined = undefined>(
    props: FieldRootProps<T, C>,
  ) => JSX.Element;
  Label: (props: LabelProps) => JSX.Element;
  Input: <C extends ValidComponent = "input">(
    props: FieldInputProps<C>,
  ) => JSX.Element;
  Description: <C extends ValidComponent = "div">(
    props: DescriptionProps<C>,
  ) => JSX.Element;
  Error: <C extends ValidComponent = "div">(
    props: ErrorProps<C>,
  ) => JSX.Element;
};

// -- Form factory --

export function createForm(submit: () => void) {
  return function FormComp(
    rawProps: Omit<JSX.FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
  ) {
    const handler = (e: SubmitEvent) => {
      e.preventDefault();
      submit();
    };
    return <form {...rawProps} on:submit={handler} />;
  };
}
