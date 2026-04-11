import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@solidjs/testing-library";
import { ButtonRoot } from "./button-root.tsx";

afterEach(() => cleanup());

describe("Button", () => {
  it("has type='button' by default", () => {
    const { container } = render(() => <ButtonRoot>Click</ButtonRoot>);
    expect(container.querySelector("button")!.getAttribute("type")).toBe("button");
  });

  it("spreads extra props", () => {
    const { container } = render(() => (
      <ButtonRoot class="primary" disabled data-testid="btn">
        Go
      </ButtonRoot>
    ));
    const el = container.querySelector("button")!;
    expect(el.getAttribute("class")).toBe("primary");
    expect(el.hasAttribute("disabled")).toBe(true);
    expect(el.getAttribute("data-testid")).toBe("btn");
  });

  it("as='a' renders an <a> element", () => {
    const { container } = render(() => (
      <ButtonRoot as="a" href="/link">
        Link
      </ButtonRoot>
    ));
    const el = container.querySelector("a");
    expect(el).not.toBeNull();
    expect(el!.getAttribute("href")).toBe("/link");
  });
});
