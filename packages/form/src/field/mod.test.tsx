import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, renderHook } from "@solidjs/testing-library";
import { useForm } from "../use-form.tsx";
import { useFormComponents } from "../use-form-components.tsx";
import type { Resolver } from "../resolver/index.ts";

afterEach(() => cleanup());

type FormValues = { email: string };
const defaults: FormValues = { email: "" };

const noop = () => {};

function setup(opts?: {
  resolver?: Resolver<FormValues>;
  onSubmit?: (v: FormValues) => void | Promise<void>;
}) {
  const { result: form } = renderHook(() =>
    useForm<FormValues>({
      initialValues: defaults,
      resolver: opts?.resolver,
      onSubmit: opts?.onSubmit ?? noop,
    }),
  );
  const { result: components } = renderHook(() => useFormComponents(form));
  return { form, ...components };
}

describe("Field.Label", () => {
  it("for attribute points to the input id", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Label>Email</Field.Label>
        <Field.Input />
      </Field>
    ));
    const label = container.querySelector("label")!;
    const input = container.querySelector("input")!;
    expect(label.getAttribute("for")).toBe(input.id);
  });
});

describe("Field.Input", () => {
  it("has aria-describedby", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Input />
        <Field.Description>Help text</Field.Description>
      </Field>
    ));
    expect(
      container.querySelector("input")!.getAttribute("aria-describedby")!.split(" ").length,
    ).toBe(2);
  });

  it("aria-invalid is true when field has errors", () => {
    const { form, Field } = setup();
    form.setErrors("email", ["Required"]);
    const { container } = render(() => (
      <Field name="email">
        <Field.Input />
      </Field>
    ));
    expect(container.querySelector("input")!.getAttribute("aria-invalid")).toBe("true");
  });

  it("aria-invalid absent when no errors", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Input />
      </Field>
    ));
    expect(container.querySelector("input")!.hasAttribute("aria-invalid")).toBe(false);
  });

  it("aria-required is true when resolver requires it", () => {
    const resolver: Resolver<FormValues> = {
      attrs: () => ({ required: true }),
    };
    const { Field } = setup({ resolver });
    const { container } = render(() => (
      <Field name="email">
        <Field.Input />
      </Field>
    ));
    expect(container.querySelector("input")!.getAttribute("aria-required")).toBe("true");
  });

  it("aria-required absent when not required", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Input />
      </Field>
    ));
    expect(container.querySelector("input")!.hasAttribute("aria-required")).toBe(false);
  });

  it("spreads HTML constraint attrs from resolver", () => {
    const resolver: Resolver<FormValues> = {
      attrs: () => ({ required: true, maxLength: 255 }),
    };
    const { Field } = setup({ resolver });
    const { container } = render(() => (
      <Field name="email">
        <Field.Input />
      </Field>
    ));
    const input = container.querySelector("input")!;
    expect(input.hasAttribute("required")).toBe(true);
    expect(input.getAttribute("maxlength")).toBe("255");
  });

  it("renders as textarea via as prop", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Input as="textarea" />
      </Field>
    ));
    const textarea = container.querySelector("textarea")!;
    expect(textarea).not.toBeNull();
    expect(textarea.id.length).toBeGreaterThan(0);
  });

  it("sets name attribute from field name", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Input />
      </Field>
    ));
    expect(container.querySelector("input")!.getAttribute("name")).toBe("email");
  });

  it("wires value from store", () => {
    const { form, Field } = setup();
    form.setValues("email", "test@example.com");
    const { container } = render(() => (
      <Field name="email">
        <Field.Input />
      </Field>
    ));
    expect((container.querySelector("input")! as HTMLInputElement).value).toBe("test@example.com");
  });

  it("binds radios by selected value", () => {
    const { form, Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Input type="radio" value="work" />
        <Field.Input type="radio" value="home" />
      </Field>
    ));
    const radios = container.querySelectorAll("input[type='radio']");
    expect((radios[0] as HTMLInputElement).checked).toBe(false);
    expect((radios[1] as HTMLInputElement).checked).toBe(false);

    form.setValues("email", "home");
    expect((radios[1] as HTMLInputElement).checked).toBe(true);

    const first = radios[0] as HTMLInputElement;
    first.checked = true;
    first.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
    expect(form.values.email).toBe("work");
  });
});

describe("Field.Description", () => {
  it("id is referenced by input aria-describedby", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Input />
        <Field.Description>Help</Field.Description>
      </Field>
    ));
    const input = container.querySelector("input")!;
    const divs = container.querySelectorAll("div");
    let descId = "";
    for (const div of divs) {
      if (div.id && div.id.includes("description")) descId = div.id;
    }
    expect(descId.length).toBeGreaterThan(0);
    expect(input.getAttribute("aria-describedby")).toContain(descId);
  });
});

describe("Field.Textarea", () => {
  it("renders a textarea", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Textarea />
      </Field>
    ));
    expect(container.querySelector("textarea")).not.toBeNull();
  });
});

describe("Field.Select", () => {
  it("renders a select", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Select>
          <option value="a">A</option>
        </Field.Select>
      </Field>
    ));
    expect(container.querySelector("select")).not.toBeNull();
  });
});

describe("Field.Error", () => {
  it("auto-fills error text when no children", () => {
    const { form, Field } = setup();
    form.setErrors("email", ["Required", "Must be valid"]);
    const { container } = render(() => (
      <Field name="email">
        <Field.Error />
      </Field>
    ));
    expect(container.textContent).toContain("Required, Must be valid");
  });

  it("renders explicit children instead of auto text", () => {
    const { form, Field } = setup();
    form.setErrors("email", ["Required"]);
    const { container } = render(() => (
      <Field name="email">
        <Field.Error>Custom error</Field.Error>
      </Field>
    ));
    expect(container.textContent).toContain("Custom error");
    expect(container.textContent).not.toContain("Required");
  });

  it("does not render when no errors", () => {
    const { Field } = setup();
    const { container } = render(() => (
      <Field name="email">
        <Field.Error />
      </Field>
    ));
    expect(container.textContent).toBe("");
  });

  it("has id matching error element", () => {
    const { form, Field } = setup();
    form.setErrors("email", ["Required"]);
    const { container } = render(() => (
      <Field name="email">
        <Field.Error />
      </Field>
    ));
    const errorEl = container.querySelector("[id*='error']");
    expect(errorEl).not.toBeNull();
  });

  it("renders as span via as prop", () => {
    const { form, Field } = setup();
    form.setErrors("email", ["Required"]);
    const { container } = render(() => (
      <Field name="email">
        <Field.Error as="span" />
      </Field>
    ));
    const span = container.querySelector("span")!;
    expect(span).not.toBeNull();
    expect(span.textContent).toBe("Required");
  });
});

describe("Form", () => {
  it("renders a <form> element", () => {
    const { Form } = setup();
    const { container } = render(() => (
      <Form>
        <span>content</span>
      </Form>
    ));
    expect(container.querySelector("form")).not.toBeNull();
  });

  it("calls onSubmit with current values on submit", () => {
    let received: FormValues | undefined;
    const { form, Form } = setup({
      onSubmit: (v) => {
        received = v;
      },
    });
    form.setValues("email", "test@example.com");
    const { container } = render(() => (
      <Form>
        <button type="submit">Go</button>
      </Form>
    ));
    container.querySelector("form")!.dispatchEvent(new Event("submit", { cancelable: true }));
    expect(received?.email).toBe("test@example.com");
  });

  it("calls preventDefault on submit", () => {
    const { Form } = setup();
    const { container } = render(() => (
      <Form>
        <button type="submit">Go</button>
      </Form>
    ));
    const event = new Event("submit", { cancelable: true });
    container.querySelector("form")!.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("spreads extra props to the <form> element", () => {
    const { Form } = setup();
    const { container } = render(() => (
      <Form class="my-form" id="login">
        <span>content</span>
      </Form>
    ));
    const formEl = container.querySelector("form")!;
    expect(formEl.getAttribute("class")).toBe("my-form");
    expect(formEl.getAttribute("id")).toBe("login");
  });

  it("increments submitCount on submit", () => {
    const { form, Form } = setup();
    const { container } = render(() => (
      <Form>
        <button type="submit">Go</button>
      </Form>
    ));
    container.querySelector("form")!.dispatchEvent(new Event("submit", { cancelable: true }));
    expect(form.state.submitCount).toBe(1);
  });

  it("does not call onSubmit on render", () => {
    let called = false;
    const { form, Form, Field } = setup({
      onSubmit: () => {
        called = true;
      },
    });
    render(() => (
      <Form>
        <Field name="email">
          <Field.Label>Email</Field.Label>
          <Field.Input />
          <Field.Error />
        </Field>
        <button type="submit">Go</button>
      </Form>
    ));
    expect(called).toBe(false);
    expect(form.state.submitCount).toBe(0);
  });
});
