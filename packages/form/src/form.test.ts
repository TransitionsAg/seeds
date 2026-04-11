import { afterEach, describe, expect, it } from "vitest";
import { Window } from "happy-dom";
import { cleanup, renderHook } from "@solidjs/testing-library";
import { createFormCore } from "./form.ts";
import type { Resolver } from "./resolver/index.ts";

const _win = new Window();
Object.assign(globalThis, {
  window: _win,
  document: _win.document,
  navigator: _win.navigator,
  HTMLElement: _win.HTMLElement,
  MutationObserver: _win.MutationObserver,
});

type FormValues = {
  email: string;
  password: string;
  address: {
    city: string;
  };
};

const defaults: FormValues = {
  email: "",
  password: "",
  address: { city: "" },
};

const noop = () => {};

function setup(opts?: {
  resolver?: Resolver<FormValues>;
  initialValues?: FormValues;
  onSubmit?: (v: FormValues) => void | Promise<void>;
}) {
  const { result, cleanup: dispose } = renderHook(() =>
    createFormCore<FormValues>({
      initialValues: opts?.initialValues || defaults,
      resolver: opts?.resolver,
      onSubmit: opts?.onSubmit || noop,
    }),
  );
  return { f: result, dispose };
}

afterEach(() => cleanup());

// --- values ---

describe("values", () => {
  it("holds initial values", () => {
    const { f } = setup();
    expect(f.values.email).toBe("");
    expect(f.values.address.city).toBe("");
  });
});

describe("errors", () => {
  it("initialized to null", () => {
    const { f } = setup();
    expect(f.errors.email).toBe(null);
    expect(f.errors.address.city).toBe(null);
  });
});

describe("values", () => {
  it("is a deep clone", () => {
    const init = { email: "", password: "", address: { city: "" } };
    const { f } = setup({ initialValues: init });
    f.setValues("email", "changed");
    expect(init.email).toBe("");
  });
});

// --- setValues / setErrors ---

describe("setValues", () => {
  it("updates flat field", () => {
    const { f } = setup();
    f.setValues("email", "new@example.com");
    expect(f.values.email).toBe("new@example.com");
  });

  it("updates nested field", () => {
    const { f } = setup();
    f.setValues("address", "city", "Lyon");
    expect(f.values.address.city).toBe("Lyon");
  });
});

describe("setErrors", () => {
  it("sets flat field errors", () => {
    const { f } = setup();
    f.setErrors("email", ["Required"]);
    expect(f.errors.email).toEqual(["Required"]);
  });

  it("supports multiple errors", () => {
    const { f } = setup();
    f.setErrors("email", ["Required", "Must be a valid email"]);
    expect(f.errors.email).toEqual(["Required", "Must be a valid email"]);
  });

  it("null clears the error", () => {
    const { f } = setup();
    f.setErrors("email", ["Required"]);
    f.setErrors("email", null);
    expect(f.errors.email).toBe(null);
  });

  it("sets nested field errors", () => {
    const { f } = setup();
    f.setErrors("address", "city", ["Required"]);
    expect(f.errors.address.city).toEqual(["Required"]);
  });
});

// --- binding (internal) ---

describe("binding", () => {
  it("value reads from values store", () => {
    const { f } = setup({
      initialValues: { ...defaults, email: "test@example.com" },
    });
    expect(f.binding("email").value).toBe("test@example.com");
  });

  it("nested value reads correctly", () => {
    const { f } = setup({
      initialValues: { ...defaults, address: { city: "Paris" } },
    });
    expect(f.binding("address", "city").value).toBe("Paris");
  });

  it("setValue updates the values store", () => {
    const { f } = setup();
    f.binding("email").setValue("new@example.com");
    expect(f.values.email).toBe("new@example.com");
  });

  it("nested setValue updates correctly", () => {
    const { f } = setup();
    f.binding("address", "city").setValue("Lyon");
    expect(f.values.address.city).toBe("Lyon");
  });

  it("errors starts as null", () => {
    const { f } = setup();
    expect(f.binding("email").errors).toBe(null);
  });

  it("setErrors updates the errors store", () => {
    const { f } = setup();
    f.binding("email").setErrors(["Required"]);
    expect(f.errors.email).toEqual(["Required"]);
  });

  it("setErrors supports multiple errors", () => {
    const { f } = setup();
    f.binding("email").setErrors(["Required", "Must be a valid email"]);
    expect(f.errors.email).toEqual(["Required", "Must be a valid email"]);
  });

  it("setErrors(null) clears the error", () => {
    const { f } = setup();
    const b = f.binding("email");
    b.setErrors(["Required"]);
    b.setErrors(null);
    expect(f.errors.email).toBe(null);
  });

  it("attrs defaults to empty object without resolver", () => {
    const { f } = setup();
    expect(f.binding("email").attrs).toEqual({});
  });

  it("attrs populated from resolver", () => {
    const resolver: Resolver<FormValues> = {
      attrs(path) {
        const key = path.join(".");
        const map: Record<string, Record<string, unknown>> = {
          email: { required: true, maxLength: 255 },
          "address.city": { required: true, minLength: 1 },
        };
        return map[key] ?? {};
      },
    };
    const { f } = setup({ resolver });
    expect(f.binding("email").attrs).toEqual({ required: true, maxLength: 255 });
    expect(f.binding("address", "city").attrs).toEqual({
      required: true,
      minLength: 1,
    });
  });

  it("attrs empty for unknown path with resolver", () => {
    const resolver: Resolver<FormValues> = { attrs: () => ({}) };
    const { f } = setup({ resolver });
    expect(f.binding("password").attrs).toEqual({});
  });

  it("setValue triggers resolver validation", () => {
    const resolver: Resolver<FormValues> = {
      attrs: () => ({}),
      validate(_path, value) {
        return value === "" ? ["Required"] : null;
      },
    };
    const { f } = setup({ resolver });
    const b = f.binding("email");
    b.setValue("");
    expect(b.errors).toEqual(["Required"]);
  });

  it("setValue clears errors on valid input", () => {
    const resolver: Resolver<FormValues> = {
      attrs: () => ({}),
      validate(_path, value) {
        return value === "" ? ["Required"] : null;
      },
    };
    const { f } = setup({ resolver });
    const b = f.binding("email");
    b.setErrors(["Required"]);
    b.setValue("valid@example.com");
    expect(b.errors).toBe(null);
  });

  it("setValue without validate does not crash", () => {
    const resolver: Resolver<FormValues> = { attrs: () => ({}) };
    const { f } = setup({ resolver });
    const b = f.binding("email");
    b.setValue("test@example.com");
    expect(b.errors).toBe(null);
  });
});

// --- submit ---

describe("submit", () => {
  it("calls onSubmit with current values", () => {
    let received: FormValues | undefined;
    const { f } = setup({
      onSubmit: (v) => {
        received = v;
      },
    });
    f.setValues("email", "submitted@example.com");
    f.submit();
    expect(received?.email).toBe("submitted@example.com");
  });

  it("calls onSubmit with override values", () => {
    let received: FormValues | undefined;
    const { f } = setup({
      onSubmit: (v) => {
        received = v;
      },
    });
    const override = {
      email: "override@example.com",
      password: "123",
      address: { city: "Paris" },
    };
    f.submit(override);
    expect(received).toEqual(override);
  });

  it("increments submitCount", () => {
    const { f } = setup();
    f.submit();
    expect(f.state.submitCount).toBe(1);
    f.submit();
    expect(f.state.submitCount).toBe(2);
  });

  it("isSubmitting true during async handler", async () => {
    let resolve!: () => void;
    const promise = new Promise<void>((r) => {
      resolve = r;
    });
    const { f } = setup({ onSubmit: () => promise });
    f.submit();
    expect(f.state.isSubmitting).toBe(true);
    resolve();
    await promise;
    await new Promise((r) => setTimeout(r, 10));
    expect(f.state.isSubmitting).toBe(false);
  });

  it("passes through on async validateAll (valid)", async () => {
    let called = false;
    const resolver: Resolver<FormValues> = {
      attrs: () => ({}),
      validateAll() {
        return Promise.resolve({
          email: null,
          password: null,
          address: { city: null },
        });
      },
    };
    const { f } = setup({
      resolver,
      onSubmit: () => {
        called = true;
      },
    });
    f.submit();
    await new Promise((r) => setTimeout(r, 10));
    expect(called).toBe(true);
  });

  it("force bypasses validateAll", () => {
    let called = false;
    const resolver: Resolver<FormValues> = {
      attrs: () => ({}),
      validateAll() {
        return {
          email: ["Required"],
          password: null,
          address: { city: null },
        };
      },
    };
    const { f } = setup({
      resolver,
      onSubmit: () => {
        called = true;
      },
    });
    f.submit(undefined, { force: true });
    expect(called).toBe(true);
  });

  it("force with override values", () => {
    let received: FormValues | undefined;
    const resolver: Resolver<FormValues> = {
      attrs: () => ({}),
      validateAll() {
        return {
          email: ["Required"],
          password: null,
          address: { city: null },
        };
      },
    };
    const override = {
      email: "forced@example.com",
      password: "123",
      address: { city: "Paris" },
    };
    const { f } = setup({
      resolver,
      onSubmit: (v) => {
        received = v;
      },
    });
    f.submit(override, { force: true });
    expect(received).toEqual(override);
  });

  it("clears errors on valid validateAll", () => {
    const resolver: Resolver<FormValues> = {
      attrs: () => ({}),
      validateAll() {
        return { email: null, password: null, address: { city: null } };
      },
    };
    const { f } = setup({ resolver });
    f.setErrors("email", ["Old error"]);
    f.submit();
    expect(f.errors.email).toBe(null);
  });
});

// --- async per-field validation ---

describe("binding - async validate", () => {
  it("async validate sets errors after resolve", async () => {
    const resolver: Resolver<FormValues> = {
      attrs: () => ({}),
      validate(_path, value) {
        return value === "" ? ["Required"] : null;
      },
    };
    const { f } = setup({ resolver });
    const b = f.binding("email");
    b.setValue("");
    await new Promise((r) => setTimeout(r, 10));
    expect(b.errors).toEqual(["Required"]);
  });

  it("async validate stale result discarded", async () => {
    let callCount = 0;
    const resolver: Resolver<FormValues> = {
      attrs: () => ({}),
      validate(_path, value) {
        callCount++;
        const n = callCount;
        return new Promise((resolve) => {
          setTimeout(
            () => {
              if (n === 1) resolve(["Stale error"]);
              else resolve(value === "final" ? null : ["Error"]);
            },
            n === 1 ? 50 : 10,
          );
        });
      },
    };
    const { f } = setup({ resolver });
    const b = f.binding("email");
    b.setValue("first");
    b.setValue("final");
    await new Promise((r) => setTimeout(r, 100));
    expect(b.errors).toBe(null);
  });
});

// --- state ---

describe("state", () => {
  it("initial state", () => {
    const { f } = setup();
    expect(f.state.isSubmitting).toBe(false);
    expect(f.state.isTouched).toBe(false);
    expect(f.state.isDirty).toBe(false);
    expect(f.state.isValid).toBe(true);
    expect(f.state.submitCount).toBe(0);
  });

  it("isTouched set after binding setValue", () => {
    const { f } = setup();
    f.binding("email").setValue("a@b.com");
    expect(f.state.isTouched).toBe(true);
  });

  it("isDirty true after value change", () => {
    const { f } = setup();
    f.setValues("email", "changed");
    expect(f.state.isDirty).toBe(true);
  });

  it("isDirty false after reverting value", () => {
    const { f } = setup();
    f.setValues("email", "changed");
    f.setValues("email", "");
    expect(f.state.isDirty).toBe(false);
  });

  it("isDirty detects nested changes", () => {
    const { f } = setup();
    f.setValues("address", "city", "Lyon");
    expect(f.state.isDirty).toBe(true);
  });

  it("isValid false when errors present", () => {
    const { f } = setup();
    f.setErrors("email", ["Required"]);
    expect(f.state.isValid).toBe(false);
  });

  it("isValid true after clearing errors", () => {
    const { f } = setup();
    f.setErrors("email", ["Required"]);
    f.setErrors("email", null);
    expect(f.state.isValid).toBe(true);
  });

  it("isValid detects nested errors", () => {
    const { f } = setup();
    f.setErrors("address", "city", ["Required"]);
    expect(f.state.isValid).toBe(false);
  });
});

// --- reset ---

describe("reset", () => {
  it("restores values to initial", () => {
    const { f } = setup();
    f.setValues("email", "dirty");
    f.reset();
    expect(f.values.email).toBe("");
  });

  it("clears errors", () => {
    const { f } = setup();
    f.setErrors("email", ["Required"]);
    f.reset();
    expect(f.errors.email).toBe(null);
  });

  it("resets state", () => {
    const { f } = setup();
    f.binding("email").setValue("x");
    f.submit();
    f.reset();
    expect(f.state.isTouched).toBe(false);
    expect(f.state.submitCount).toBe(0);
    expect(f.state.isSubmitting).toBe(false);
    expect(f.state.isDirty).toBe(false);
  });
});

// --- aria (binding getters) ---

describe("aria", () => {
  it("invalid is false when no errors", () => {
    const { f } = setup();
    expect(f.binding("email").aria.invalid).toBe(false);
  });

  it("invalid is true when errors present", () => {
    const { f } = setup();
    const b = f.binding("email");
    b.setErrors(["Required"]);
    expect(b.aria.invalid).toBe(true);
  });

  it("invalid reacts to error clearing", () => {
    const { f } = setup();
    const b = f.binding("email");
    b.setErrors(["Required"]);
    expect(b.aria.invalid).toBe(true);
    b.setErrors(null);
    expect(b.aria.invalid).toBe(false);
  });

  it("required mirrors resolver attrs", () => {
    const resolver: Resolver<FormValues> = {
      attrs: (path) => (path[0] === "email" ? { required: true } : {}),
    };
    const { f } = setup({ resolver });
    expect(f.binding("email").aria.required).toBe(true);
    expect(f.binding("password").aria.required).toBe(false);
  });

  it("describedby is a deterministic string", () => {
    const { f } = setup();
    const id = f.binding("email").aria.describedby;
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
    expect(id.includes("email")).toBe(true);
  });

  it("describedby includes nested keys", () => {
    const { f } = setup();
    const id = f.binding("address", "city").aria.describedby;
    expect(id.includes("address")).toBe(true);
    expect(id.includes("city")).toBe(true);
  });

  it("different forms get different describedby ids", () => {
    const { f: f1 } = setup();
    const { f: f2 } = setup();
    const id1 = f1.binding("email").aria.describedby;
    const id2 = f2.binding("email").aria.describedby;
    expect(id1).not.toBe(id2);
  });
});
