import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@solidjs/testing-library";
import { Polymorphic } from "./polymorphic-root.tsx";

afterEach(() => cleanup());

describe("Polymorphic", () => {
  it("renders a <div> by default", () => {
    const { container } = render(() => <Polymorphic>Content</Polymorphic>);
    expect(container.querySelector("div")).not.toBeNull();
    expect(container.querySelector("div")!.textContent).toBe("Content");
  });

  it("renders as <a> with anchor props", () => {
    const { container } = render(() => (
      <Polymorphic as="a" href="/link" target="_blank">
        Link
      </Polymorphic>
    ));
    const el = container.querySelector("a");
    expect(el).not.toBeNull();
    expect(el!.getAttribute("href")).toBe("/link");
    expect(el!.getAttribute("target")).toBe("_blank");
  });

  it("renders as <button> with button props", () => {
    const { container } = render(() => (
      <Polymorphic as="button" type="submit" disabled>
        Submit
      </Polymorphic>
    ));
    const el = container.querySelector("button");
    expect(el).not.toBeNull();
    expect(el!.getAttribute("type")).toBe("submit");
    expect(el!.hasAttribute("disabled")).toBe(true);
  });

  it("renders as <span>", () => {
    const { container } = render(() => (
      <Polymorphic as="span">Inline</Polymorphic>
    ));
    expect(container.querySelector("span")).not.toBeNull();
  });

  it("spreads extra props", () => {
    const { container } = render(() => (
      <Polymorphic class="custom" data-testid="poly" id="root">
        Test
      </Polymorphic>
    ));
    const el = container.querySelector("div")!;
    expect(el.getAttribute("class")).toBe("custom");
    expect(el.getAttribute("data-testid")).toBe("poly");
    expect(el.getAttribute("id")).toBe("root");
  });

  it("renders a custom component via as", () => {
    function Card(props: { title: string }) {
      return <div data-card>{props.title}</div>;
    }

    const { container } = render(() => <Polymorphic as={Card} title="Hello" />);
    const el = container.querySelector("[data-card]");
    expect(el).not.toBeNull();
    expect(el!.textContent).toBe("Hello");
  });
});
