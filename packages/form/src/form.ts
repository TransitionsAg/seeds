import { createUniqueId } from "solid-js";
import { createStore, reconcile, type SetStoreFunction } from "solid-js/store";
import type { Binder, Binding } from "./input/index.ts";
import { type FormErrors, hasErrors, initErrors } from "./errors/index.ts";
import type { Resolver } from "./resolver/index.ts";
import { deepEqual } from "./utils.ts";

/** Options passed to {@linkcode useForm}. */
export type FormParameters<T extends object> = {
  /** Starting values for the form. A deep clone is kept internally to power dirty checking via {@linkcode FormState.isDirty}. */
  initialValues?: T;
  /** Optional resolver for validation and HTML constraint attributes. See {@linkcode Resolver}. */
  resolver?: Resolver<T>;
  /** Callback invoked on form submission (via `<Form>` or programmatic {@linkcode FormReturn.submit submit()}). May be async — the form tracks the pending state via {@linkcode FormState.isSubmitting}. */
  onSubmit: SubmitHandler<T>;
};

/** Callback invoked on valid form submission. May be async — the form tracks the pending state via {@linkcode FormState.isSubmitting}. */
export type SubmitHandler<T extends object> = (values: T) => void | Promise<void>;

/** Options for {@linkcode FormCore.submit}. */
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

/** Internal shape of the unified store. */
type Store<T> = {
  values: T;
  errors: FormErrors<T>;
  isSubmitting: boolean;
  isTouched: boolean;
  submitCount: number;
};

/** Core return of {@linkcode createFormCore} — stores, binding, submit, state, reset. */
export type FormCore<T extends object> = {
  /** Current form values (store proxy — reads are reactive). */
  values: T;
  /** Per-field validation errors (store proxy — reads are reactive). */
  errors: FormErrors<T>;
  /** Reactive form lifecycle state. */
  state: FormState;
  /** Raw setter for the values store. Does not trigger validation or mark touched. */
  setValues: SetStoreFunction<T>;
  /** Raw setter for the errors store. */
  setErrors: SetStoreFunction<FormErrors<T>>;
  /** Creates a {@linkcode Binding} for a field at the given key path (internal). */
  binding: Binder<T>;
  /** Invoke the `onSubmit` handler. Uses `values` when called without arguments. Pass `{ force: true }` to skip validation. */
  submit(values?: T, options?: SubmitOptions): void;
  /** Restores values, errors, and meta state back to their initial values. */
  reset(): void;
};

/**
 * Creates the reactive core of a form backed by a single SolidJS store.
 *
 * This is an internal factory — prefer {@linkcode useForm} from `use-form.tsx`
 * which wraps this with `Form` and `Field` components.
 */
export function createFormCore<T extends object>({
  initialValues,
  resolver,
  onSubmit,
}: FormParameters<T>): FormCore<T> {
  const initial = structuredClone(initialValues) as T;
  const formId = createUniqueId();

  const [store, setStore] = createStore<Store<T>>({
    values: structuredClone(initial),
    errors: initErrors(initial),
    isSubmitting: false,
    isTouched: false,
    submitCount: 0,
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

  /** Per-field generation counters keyed by joined path, used to discard stale async validation results. */
  const validationGen = new Map<string, number>();

  function binding(...keys: string[]): Binding {
    const get = () =>
      // deno-lint-ignore no-explicit-any
      keys.reduce((obj: any, k) => obj[k], store.values);

    const set = (value: unknown) =>
      // deno-lint-ignore no-explicit-any
      (setStore as any)("values", ...keys, value);

    const getErrors = () =>
      // deno-lint-ignore no-explicit-any
      keys.reduce((obj: any, k) => obj[k], store.errors) as string[] | null;

    const fieldSetErrors = (error: string[] | null) =>
      // deno-lint-ignore no-explicit-any
      (setStore as any)("errors", ...keys, error);

    const attrs = resolver ? resolver.attrs(keys) : {};
    const errorId = `${formId}-${keys.join("-")}-error`;
    const pathKey = keys.join(".");

    return {
      get value() {
        return get() as T;
      },
      setValue(value: unknown) {
        set(value);
        setStore("isTouched", true);
        if (resolver?.validate) {
          const gen = (validationGen.get(pathKey) ?? 0) + 1;
          validationGen.set(pathKey, gen);
          const result = resolver.validate(keys, value);
          if (result instanceof Promise) {
            result.then((errors) => {
              if (validationGen.get(pathKey) === gen) {
                fieldSetErrors(errors);
              }
            });
          } else {
            fieldSetErrors(result);
          }
        }
      },
      get errors() {
        return getErrors();
      },
      setErrors: fieldSetErrors,
      attrs,
      aria: {
        get invalid() {
          return (getErrors()?.length ?? 0) > 0;
        },
        get required() {
          return !!attrs?.required;
        },
        get describedby() {
          return errorId;
        },
      },
    };
  }

  // -- Submit --

  /** Generation counter to discard stale async validation on rapid re-submits. */
  let submitGen = 0;

  function submit(values?: T, options?: SubmitOptions): void {
    setStore("submitCount", (c) => c + 1);
    const vals = values ?? store.values;

    if (!options?.force && resolver?.validateAll) {
      const result = resolver.validateAll(vals);
      if (result instanceof Promise) {
        const gen = ++submitGen;
        setStore("isSubmitting", true);
        result.then((errors) => {
          if (submitGen !== gen) return;
          if (hasErrors(errors)) {
            setStore("errors", reconcile(errors));
            setStore("isSubmitting", false);
            return;
          }
          setStore("errors", reconcile(initErrors(initial)));
          runOnSubmit(vals);
        });
      } else {
        if (hasErrors(result)) {
          setStore("errors", reconcile(result));
          return;
        }
        setStore("errors", reconcile(initErrors(initial)));
        runOnSubmit(vals);
      }
    } else {
      runOnSubmit(vals);
    }
  }

  function runOnSubmit(vals: T): void {
    const result = onSubmit(vals);
    if (result instanceof Promise) {
      setStore("isSubmitting", true);
      result.finally(() => setStore("isSubmitting", false));
    }
  }

  // -- Reset --

  function reset() {
    setStore("values", reconcile(structuredClone(initial)));
    setStore("errors", reconcile(initErrors(initial)));
    setStore("isSubmitting", false);
    setStore("isTouched", false);
    setStore("submitCount", 0);
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
    reset,
  } as FormCore<T>;
}
