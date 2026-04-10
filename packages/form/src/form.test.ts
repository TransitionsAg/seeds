/// <reference lib="deno.ns" />
import { assertEquals } from "@std/assert";
import { Window } from "happy-dom";
import { cleanup, renderHook } from "@solidjs/testing-library";
import { createFormCore } from "./form.ts";
import type { Resolver } from "./resolver/mod.ts";

// Set up DOM globals for @solidjs/testing-library
const window = new Window();
Object.assign(globalThis, {
  window,
  document: window.document,
  navigator: window.navigator,
  HTMLElement: window.HTMLElement,
  MutationObserver: window.MutationObserver,
});

const maxTimerId = setTimeout(() => {}, 0);
for (let i = 0; i <= maxTimerId; i++) clearTimeout(i);

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
  resolver?: Resolver;
  initialValues?: FormValues;
  onSubmit?: (v: FormValues) => void | Promise<void>;
}) {
  const { result, cleanup: dispose } = renderHook(() =>
    createFormCore<FormValues>({
      initialValues: opts?.initialValues || defaults,
      resolver: opts?.resolver,
      onSubmit: opts?.onSubmit || noop,
    })
  );
  return { f: result, dispose };
}

// --- values ---

Deno.test("values - holds initial values", { sanitizeOps: false }, () => {
  const { f } = setup();
  assertEquals(f.values.email, "");
  assertEquals(f.values.address.city, "");
  cleanup();
});

Deno.test("errors - initialized to null", () => {
  const { f } = setup();
  assertEquals(f.errors.email, null);
  assertEquals(f.errors.address.city, null);
  cleanup();
});

Deno.test("values - is a deep clone", () => {
  const init = { email: "", password: "", address: { city: "" } };
  const { f } = setup({ initialValues: init });
  f.setValues("email", "changed");
  assertEquals(init.email, "");
  cleanup();
});

// --- setValues / setErrors ---

Deno.test("setValues - updates flat field", () => {
  const { f } = setup();
  f.setValues("email", "new@example.com");
  assertEquals(f.values.email, "new@example.com");
  cleanup();
});

Deno.test("setValues - updates nested field", () => {
  const { f } = setup();
  f.setValues("address", "city", "Lyon");
  assertEquals(f.values.address.city, "Lyon");
  cleanup();
});

Deno.test("setErrors - sets flat field errors", () => {
  const { f } = setup();
  f.setErrors("email", ["Required"]);
  assertEquals(f.errors.email, ["Required"]);
  cleanup();
});

Deno.test("setErrors - supports multiple errors", () => {
  const { f } = setup();
  f.setErrors("email", ["Required", "Must be a valid email"]);
  assertEquals(f.errors.email, ["Required", "Must be a valid email"]);
  cleanup();
});

Deno.test("setErrors - null clears the error", () => {
  const { f } = setup();
  f.setErrors("email", ["Required"]);
  f.setErrors("email", null);
  assertEquals(f.errors.email, null);
  cleanup();
});

Deno.test("setErrors - sets nested field errors", () => {
  const { f } = setup();
  f.setErrors("address", "city", ["Required"]);
  assertEquals(f.errors.address.city, ["Required"]);
  cleanup();
});

// --- binding (internal) ---

Deno.test("binding - value reads from values store", () => {
  const { f } = setup({
    initialValues: { ...defaults, email: "test@example.com" },
  });
  assertEquals(f.binding("email").value, "test@example.com");
  cleanup();
});

Deno.test("binding - nested value reads correctly", () => {
  const { f } = setup({
    initialValues: { ...defaults, address: { city: "Paris" } },
  });
  assertEquals(f.binding("address", "city").value, "Paris");
  cleanup();
});

Deno.test("binding - setValue updates the values store", () => {
  const { f } = setup();
  f.binding("email").setValue("new@example.com");
  assertEquals(f.values.email, "new@example.com");
  cleanup();
});

Deno.test("binding - nested setValue updates correctly", () => {
  const { f } = setup();
  f.binding("address", "city").setValue("Lyon");
  assertEquals(f.values.address.city, "Lyon");
  cleanup();
});

Deno.test("binding - errors starts as null", () => {
  const { f } = setup();
  assertEquals(f.binding("email").errors, null);
  cleanup();
});

Deno.test("binding - setErrors updates the errors store", () => {
  const { f } = setup();
  f.binding("email").setErrors(["Required"]);
  assertEquals(f.errors.email, ["Required"]);
  cleanup();
});

Deno.test("binding - setErrors supports multiple errors", () => {
  const { f } = setup();
  f.binding("email").setErrors(["Required", "Must be a valid email"]);
  assertEquals(f.errors.email, ["Required", "Must be a valid email"]);
  cleanup();
});

Deno.test("binding - setErrors(null) clears the error", () => {
  const { f } = setup();
  const b = f.binding("email");
  b.setErrors(["Required"]);
  b.setErrors(null);
  assertEquals(f.errors.email, null);
  cleanup();
});

Deno.test("binding - attrs defaults to empty object without resolver", () => {
  const { f } = setup();
  assertEquals(f.binding("email").attrs, {});
  cleanup();
});

Deno.test("binding - attrs populated from resolver", () => {
  const resolver: Resolver = {
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
  assertEquals(f.binding("email").attrs, { required: true, maxLength: 255 });
  assertEquals(f.binding("address", "city").attrs, {
    required: true,
    minLength: 1,
  });
  cleanup();
});

Deno.test("binding - attrs empty for unknown path with resolver", () => {
  const resolver: Resolver = { attrs: () => ({}) };
  const { f } = setup({ resolver });
  assertEquals(f.binding("password").attrs, {});
  cleanup();
});

Deno.test("binding - setValue triggers resolver validation", () => {
  const resolver: Resolver = {
    attrs: () => ({}),
    validate(_path, value) {
      return value === "" ? ["Required"] : null;
    },
  };
  const { f } = setup({ resolver });
  const b = f.binding("email");
  b.setValue("");
  assertEquals(b.errors, ["Required"]);
  cleanup();
});

Deno.test("binding - setValue clears errors on valid input", () => {
  const resolver: Resolver = {
    attrs: () => ({}),
    validate(_path, value) {
      return value === "" ? ["Required"] : null;
    },
  };
  const { f } = setup({ resolver });
  const b = f.binding("email");
  b.setErrors(["Required"]);
  b.setValue("valid@example.com");
  assertEquals(b.errors, null);
  cleanup();
});

Deno.test("binding - setValue without validate does not crash", () => {
  const resolver: Resolver = { attrs: () => ({}) };
  const { f } = setup({ resolver });
  const b = f.binding("email");
  b.setValue("test@example.com");
  assertEquals(b.errors, null);
  cleanup();
});

// --- submit ---

Deno.test("submit - calls onSubmit with current values", () => {
  let received: FormValues | undefined;
  const { f } = setup({
    onSubmit: (v) => {
      received = v;
    },
  });
  f.setValues("email", "submitted@example.com");
  f.submit();
  assertEquals(received?.email, "submitted@example.com");
  cleanup();
});

Deno.test("submit - calls onSubmit with override values", () => {
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
  assertEquals(received, override);
  cleanup();
});

Deno.test("submit - increments submitCount", () => {
  const { f } = setup();
  f.submit();
  assertEquals(f.state.submitCount, 1);
  f.submit();
  assertEquals(f.state.submitCount, 2);
  cleanup();
});

Deno.test(
  "submit - isSubmitting true during async handler",
  { sanitizeOps: false },
  async () => {
    let resolve!: () => void;
    const promise = new Promise<void>((r) => {
      resolve = r;
    });
    const { f } = setup({ onSubmit: () => promise });
    f.submit();
    assertEquals(f.state.isSubmitting, true);
    resolve();
    await promise;
    await new Promise((r) => setTimeout(r, 10));
    assertEquals(f.state.isSubmitting, false);
    cleanup();
  },
);

Deno.test(
  "submit - passes through on async validateAll (valid)",
  { sanitizeOps: false },
  async () => {
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
    assertEquals(called, true);
    cleanup();
  },
);

Deno.test("submit - force bypasses validateAll", () => {
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
  assertEquals(called, true);
  cleanup();
});

Deno.test("submit - force with override values", () => {
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
  assertEquals(received, override);
  cleanup();
});

Deno.test("submit - clears errors on valid validateAll", () => {
  const resolver: Resolver<FormValues> = {
    attrs: () => ({}),
    validateAll() {
      return { email: null, password: null, address: { city: null } };
    },
  };
  const { f } = setup({ resolver });
  f.setErrors("email", ["Old error"]);
  f.submit();
  assertEquals(f.errors.email, null);
  cleanup();
});

// --- async per-field validation ---

Deno.test(
  "binding - async validate sets errors after resolve",
  { sanitizeOps: false },
  async () => {
    const resolver: Resolver = {
      attrs: () => ({}),
      validate(_path, value) {
        return value === "" ? ["Required"] : null;
      },
    };
    const { f } = setup({ resolver });
    const b = f.binding("email");
    b.setValue("");
    await new Promise((r) => setTimeout(r, 10));
    assertEquals(b.errors, ["Required"]);
    cleanup();
  },
);

Deno.test(
  "binding - async validate stale result discarded",
  { sanitizeOps: false },
  async () => {
    let callCount = 0;
    const resolver: Resolver = {
      attrs: () => ({}),
      validate(_path, value) {
        callCount++;
        const n = callCount;
        return new Promise((resolve) => {
          setTimeout(() => {
            if (n === 1) resolve(["Stale error"]);
            else resolve(value === "final" ? null : ["Error"]);
          }, n === 1 ? 50 : 10);
        });
      },
    };
    const { f } = setup({ resolver });
    const b = f.binding("email");
    b.setValue("first");
    b.setValue("final");
    await new Promise((r) => setTimeout(r, 100));
    assertEquals(b.errors, null);
    cleanup();
  },
);

// --- state ---

Deno.test("state - initial state", () => {
  const { f } = setup();
  assertEquals(f.state.isSubmitting, false);
  assertEquals(f.state.isTouched, false);
  assertEquals(f.state.isDirty, false);
  assertEquals(f.state.isValid, true);
  assertEquals(f.state.submitCount, 0);
  cleanup();
});

Deno.test("state - isTouched set after binding setValue", () => {
  const { f } = setup();
  f.binding("email").setValue("a@b.com");
  assertEquals(f.state.isTouched, true);
  cleanup();
});

Deno.test("state - isDirty true after value change", () => {
  const { f } = setup();
  f.setValues("email", "changed");
  assertEquals(f.state.isDirty, true);
  cleanup();
});

Deno.test("state - isDirty false after reverting value", () => {
  const { f } = setup();
  f.setValues("email", "changed");
  f.setValues("email", "");
  assertEquals(f.state.isDirty, false);
  cleanup();
});

Deno.test("state - isDirty detects nested changes", () => {
  const { f } = setup();
  f.setValues("address", "city", "Lyon");
  assertEquals(f.state.isDirty, true);
  cleanup();
});

Deno.test("state - isValid false when errors present", () => {
  const { f } = setup();
  f.setErrors("email", ["Required"]);
  assertEquals(f.state.isValid, false);
  cleanup();
});

Deno.test("state - isValid true after clearing errors", () => {
  const { f } = setup();
  f.setErrors("email", ["Required"]);
  f.setErrors("email", null);
  assertEquals(f.state.isValid, true);
  cleanup();
});

Deno.test("state - isValid detects nested errors", () => {
  const { f } = setup();
  f.setErrors("address", "city", ["Required"]);
  assertEquals(f.state.isValid, false);
  cleanup();
});

// --- reset ---

Deno.test("reset - restores values to initial", () => {
  const { f } = setup();
  f.setValues("email", "dirty");
  f.reset();
  assertEquals(f.values.email, "");
  cleanup();
});

Deno.test("reset - clears errors", () => {
  const { f } = setup();
  f.setErrors("email", ["Required"]);
  f.reset();
  assertEquals(f.errors.email, null);
  cleanup();
});

Deno.test("reset - resets state", () => {
  const { f } = setup();
  f.binding("email").setValue("x");
  f.submit();
  f.reset();
  assertEquals(f.state.isTouched, false);
  assertEquals(f.state.submitCount, 0);
  assertEquals(f.state.isSubmitting, false);
  assertEquals(f.state.isDirty, false);
  cleanup();
});

// --- aria (binding getters) ---

Deno.test("aria - invalid is false when no errors", () => {
  const { f } = setup();
  assertEquals(f.binding("email").aria.invalid, false);
  cleanup();
});

Deno.test("aria - invalid is true when errors present", () => {
  const { f } = setup();
  const b = f.binding("email");
  b.setErrors(["Required"]);
  assertEquals(b.aria.invalid, true);
  cleanup();
});

Deno.test("aria - invalid reacts to error clearing", () => {
  const { f } = setup();
  const b = f.binding("email");
  b.setErrors(["Required"]);
  assertEquals(b.aria.invalid, true);
  b.setErrors(null);
  assertEquals(b.aria.invalid, false);
  cleanup();
});

Deno.test("aria - required mirrors resolver attrs", () => {
  const resolver: Resolver = {
    attrs: (path) => (path[0] === "email" ? { required: true } : {}),
  };
  const { f } = setup({ resolver });
  assertEquals(f.binding("email").aria.required, true);
  assertEquals(f.binding("password").aria.required, false);
  cleanup();
});

Deno.test("aria - describedby is a deterministic string", () => {
  const { f } = setup();
  const id = f.binding("email").aria.describedby;
  assertEquals(typeof id, "string");
  assertEquals(id.length > 0, true);
  assertEquals(id.includes("email"), true);
  cleanup();
});

Deno.test("aria - describedby includes nested keys", () => {
  const { f } = setup();
  const id = f.binding("address", "city").aria.describedby;
  assertEquals(id.includes("address"), true);
  assertEquals(id.includes("city"), true);
  cleanup();
});

Deno.test("aria - different forms get different describedby ids", () => {
  const { f: f1 } = setup();
  const { f: f2 } = setup();
  const id1 = f1.binding("email").aria.describedby;
  const id2 = f2.binding("email").aria.describedby;
  assertEquals(id1 !== id2, true);
  cleanup();
});
