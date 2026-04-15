import { createUniqueId } from "solid-js";
import { createStore, reconcile, type SetStoreFunction } from "solid-js/store";
import type { Binder, ValidationMode } from "./binding/index.ts";
import { createBinder } from "./binding/create-binder.ts";
import { type FormErrors, hasErrors, initErrors } from "./errors/index.ts";
import type { Resolver } from "./resolver/index.ts";
import { deepEqual, getByPath } from "./utils.ts";

// -- Types --

/** Controls when field validation is triggered. See {@linkcode useForm}'s `mode` option. */
export type { ValidationMode } from "./binding/index.ts";

/** Options passed to {@linkcode useForm}. */
export type FormParameters<T extends object> = {
  /** Starting values for the form. A deep clone is kept internally to power dirty checking via {@linkcode FormState.isDirty}. */
  initialValues?: T;
  /** Optional resolver for validation and HTML constraint attributes. See {@linkcode Resolver}. */
  resolver?: Resolver<T>;
  /** Validation trigger mode. Defaults to `"onChange"`. */
  mode?: ValidationMode;
  /** Callback invoked on form submission (via `<Form>` or programmatic {@linkcode FormReturn.submit submit()}). May be async — the form tracks the pending state via {@linkcode FormState.isSubmitting}. */
  onSubmit: SubmitHandler<T>;
};

/** Callback invoked on valid form submission. May be async — the form tracks the pending state via {@linkcode FormState.isSubmitting}. */
export type SubmitHandler<T extends object> = (values: T) => void | Promise<void>;

/** Options for {@linkcode FormReturn.submit}. */
export type SubmitOptions = {
  /** When `true`, skips resolver validation and calls `onSubmit` directly. */
  force?: boolean;
};

/** Reactive, read-only snapshot of the form's lifecycle. Every property is a getter backed by a SolidJS store, so reads inside `createEffect` / JSX are automatically tracked. */
export type FormState = {
  /** `true` while an async {@linkcode SubmitHandler} is in flight. */
  readonly isSubmitting: boolean;
  /** `true` when the current values differ from `initialValues` (deep equality). */
  readonly isDirty: boolean;
  /** `true` after any field's value has been set at least once via a field interaction. */
  readonly isTouched: boolean;
  /** `true` when every field's error list is empty. */
  readonly isValid: boolean;
  /** How many times the submit handler has been invoked. */
  readonly submitCount: number;
};

/** Everything returned by {@linkcode useForm}. */
export type FormReturn<T extends object> = {
  /** Current form values (store proxy — reads are reactive). */
  values: T;
  /** Per-field validation errors (store proxy — reads are reactive). */
  errors: FormErrors<T>;
  /** Reactive form lifecycle state (submitting, dirty, touched, valid, submitCount). */
  state: FormState;
  /** Raw setter for the values store. Does not trigger validation or mark touched. */
  setValues: SetStoreFunction<T>;
  /** Raw setter for the errors store. */
  setErrors: SetStoreFunction<FormErrors<T>>;
  /** Creates a {@linkcode Binding} for a field at the given key path. */
  binding: Binder<T>;
  /** Invoke the `onSubmit` handler. Uses `values` when called without arguments. Pass `{ force: true }` to skip validation. */
  submit(values?: T, options?: SubmitOptions): void;
  /** Manually trigger validation for specific fields or the entire form. Returns `true` when valid. */
  trigger(path?: string | string[]): Promise<boolean>;
  /** Restores values, errors, and meta state back to their initial values. */
  reset(): void;
};

// -- Internal store shape --

type Store<T> = {
  values: T;
  errors: FormErrors<T>;
  isSubmitting: boolean;
  isTouched: boolean;
  submitCount: number;
  resetCount: number;
};

// -- Hook --

/**
 * Creates a reactive form backed by a SolidJS store.
 *
 * Returns reactive reads (`values`, `errors`, `state`), raw setters
 * (`setValues`, `setErrors`), field bindings via `binding`, and actions
 * (`submit`, `trigger`, `reset`). Use {@linkcode useFormComponents} to get `Form` and
 * `Field` components wired to this form instance.
 *
 * @example
 * ```tsx
 * const form = useForm<{ email: string }>({
 *   initialValues: { email: "" },
 *   onSubmit: (v) => console.log(v.email),
 * });
 *
 * // Programmatic submission
 * form.submit();
 * form.submit({ email: "override@example.com" });
 * ```
 */
export function useForm<T extends object>({
  initialValues,
  resolver,
  mode = "onChange",
  onSubmit,
}: FormParameters<T>): FormReturn<T> {
  const initialSource = initialValues ?? ({} as T);
  const initial = structuredClone(initialSource) as T;
  const formId = createUniqueId();

  const [store, setStore] = createStore<Store<T>>({
    values: structuredClone(initial),
    errors: initErrors(initial),
    isSubmitting: false,
    isTouched: false,
    submitCount: 0,
    resetCount: 0,
  });

  const state: FormState = {
    get isSubmitting() {
      return store.isSubmitting;
    },
    get isDirty() {
      return !deepEqual(store.values, initial);
    },
    get isTouched() {
      return store.isTouched;
    },
    get isValid() {
      return !hasErrors(store.errors);
    },
    get submitCount() {
      return store.submitCount;
    },
  };

  // deno-lint-ignore no-explicit-any
  const setValues: SetStoreFunction<T> = (...args: any[]) =>
    // deno-lint-ignore no-explicit-any
    (setStore as any)("values", ...args);

  // deno-lint-ignore no-explicit-any
  const setErrors: SetStoreFunction<FormErrors<T>> = (...args: any[]) =>
    // deno-lint-ignore no-explicit-any
    (setStore as any)("errors", ...args);

  // -- Binding --

  const binding = createBinder(
    store,
    // deno-lint-ignore no-explicit-any
    setStore as any,
    resolver,
    formId,
    mode,
  );

  // -- Submit --

  let submitGen = 0;

  const finishSubmission = (gen: number) => {
    if (submitGen === gen) {
      setStore("isSubmitting", false);
    }
  };

  function submit(values?: T, options?: SubmitOptions): void {
    const gen = ++submitGen;
    setStore("submitCount", (c) => c + 1);
    const vals = values ?? store.values;

    if (!options?.force && resolver?.validateAll) {
      const resetCount = store.resetCount;
      const result = resolver.validateAll(vals);
      if (result instanceof Promise) {
        setStore("isSubmitting", true);
        result.then((errors) => {
          if (submitGen !== gen || store.resetCount !== resetCount) return;
          if (hasErrors(errors)) {
            setStore("errors", reconcile(errors));
            finishSubmission(gen);
            return;
          }
          setStore("errors", reconcile(initErrors(initial)));
          runOnSubmit(vals, gen);
        });
      } else {
        if (hasErrors(result)) {
          setStore("errors", reconcile(result));
          return;
        }
        setStore("errors", reconcile(initErrors(initial)));
        runOnSubmit(vals, gen);
      }
    } else {
      runOnSubmit(vals, gen);
    }
  }

  function runOnSubmit(vals: T, gen: number): void {
    const result = onSubmit(vals);
    if (result instanceof Promise) {
      setStore("isSubmitting", true);
      result.finally(() => finishSubmission(gen));
      return;
    }

    finishSubmission(gen);
  }

  // -- Trigger --

  async function trigger(path?: string | string[]): Promise<boolean> {
    const resetCount = store.resetCount;
    if (path === undefined) {
      if (!resolver?.validateAll) return !hasErrors(store.errors);
      const errors = await resolver.validateAll(store.values);
      if (store.resetCount !== resetCount) return !hasErrors(store.errors);
      setStore("errors", reconcile(errors));
      return !hasErrors(errors);
    }

    const paths = Array.isArray(path) ? path : [path];

    if (resolver?.validate) {
      let allValid = true;
      for (const p of paths) {
        const keys = p.split(".");
        const value = getByPath(store.values, keys);
        const result = await resolver.validate(keys, value);
        if (store.resetCount !== resetCount) return !hasErrors(store.errors);
        // deno-lint-ignore no-explicit-any
        (setStore as any)("errors", ...keys, result);
        if (result !== null) allValid = false;
      }
      return allValid;
    }

    if (resolver?.validateAll) {
      const errors = await resolver.validateAll(store.values);
      if (store.resetCount !== resetCount) return !hasErrors(store.errors);
      setStore("errors", reconcile(errors));
      return !hasErrors(errors);
    }

    return !hasErrors(store.errors);
  }

  // -- Reset --

  function reset() {
    setStore("values", reconcile(structuredClone(initial)));
    setStore("errors", reconcile(initErrors(initial)));
    setStore("isSubmitting", false);
    setStore("isTouched", false);
    setStore("submitCount", 0);
    setStore("resetCount", (c) => c + 1);
    submitGen++;
  }

  return {
    values: store.values,
    errors: store.errors,
    state,
    setValues,
    setErrors,
    binding,
    submit,
    trigger,
    reset,
  };
}
