import type { Resolver } from "../resolver/index.ts";
import type { Binding, Binder, BindingAria, ValidationMode } from "./binding.ts";
import type { InputAttrs } from "./attrs.ts";
import type { FormErrors } from "../errors/index.ts";
import { getByPath } from "../utils.ts";

type StoreShape<T> = {
  values: T;
  errors: FormErrors<T>;
  isTouched: boolean;
  resetCount: number;
};

type SetStore<T> = {
  (...args: [key: keyof StoreShape<T>, ...rest: unknown[]]): void;
};

/**
 * Creates a mode-aware {@linkcode Binder} that produces {@linkcode Binding}s
 * wired to a SolidJS store.
 *
 * @internal Used by {@linkcode useForm}. Not exported from the public API.
 */
export function createBinder<T extends object>(
  store: StoreShape<T>,
  setStore: SetStore<T>,
  resolver: Resolver<T> | undefined,
  formId: string,
  mode: ValidationMode,
): Binder<T> {
  const validationGen = new Map<string, number>();
  const cache = new Map<string, Binding>();

  function runValidate(
    keys: string[],
    value: unknown,
    fieldSetErrors: (e: string[] | null) => void,
  ): void {
    if (!resolver?.validate) return;
    const pathKey = keys.join(".");
    const resetCount = store.resetCount;
    const gen = (validationGen.get(pathKey) ?? 0) + 1;
    validationGen.set(pathKey, gen);
    const result = resolver.validate(keys, value);
    if (result instanceof Promise) {
      result.then((errors) => {
        if (validationGen.get(pathKey) === gen && store.resetCount === resetCount) {
          fieldSetErrors(errors);
        }
      });
    } else {
      if (store.resetCount === resetCount) {
        fieldSetErrors(result);
      }
    }
  }

  function binding(...keys: string[]): Binding {
    const cacheKey = keys.join(".");
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    let touched = false;
    let lastResetCount = store.resetCount;

    const syncResetState = () => {
      if (lastResetCount === store.resetCount) return;
      lastResetCount = store.resetCount;
      touched = false;
    };

    const get = () => getByPath(store.values, keys);

    const set = (value: unknown) =>
      (setStore as (...a: unknown[]) => void)("values", ...keys, value);

    const getErrors = () => (getByPath(store.errors, keys) as string[] | null | undefined) ?? null;

    const fieldSetErrors = (error: string[] | null) =>
      (setStore as (...a: unknown[]) => void)("errors", ...keys, error);

    const attrs: InputAttrs = resolver?.attrs?.(keys) ?? {};
    const errorId = `${formId}-${keys.join("-")}-error`;

    const shouldValidateOnChange = (): boolean => {
      syncResetState();
      if (mode === "onChange") return true;
      if (mode === "onTouched") return touched;
      if (mode === "all") return true;
      return false;
    };

    const shouldValidateOnBlur = (): boolean => {
      syncResetState();
      if (mode === "onBlur") return true;
      if (mode === "onTouched") return true;
      if (mode === "all") return true;
      return false;
    };

    const aria: BindingAria = {
      get invalid() {
        return (getErrors()?.length ?? 0) > 0;
      },
      required: !!attrs?.required,
      describedby: errorId,
    };

    const b: Binding = {
      get value() {
        syncResetState();
        return get();
      },
      setValue(value: unknown) {
        syncResetState();
        set(value);
        setStore("isTouched", true);
        if (shouldValidateOnChange()) {
          runValidate(keys, value, fieldSetErrors);
        }
      },
      onBlur() {
        syncResetState();
        touched = true;
        if (shouldValidateOnBlur()) {
          runValidate(keys, get(), fieldSetErrors);
        }
      },
      get errors() {
        syncResetState();
        return getErrors();
      },
      setErrors: fieldSetErrors,
      attrs,
      aria,
    };

    cache.set(cacheKey, b);
    return b;
  }

  return binding as Binder<T>;
}
