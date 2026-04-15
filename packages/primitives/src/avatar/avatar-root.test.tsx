import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@solidjs/testing-library";
import { Avatar } from "./index.tsx";

afterEach(() => cleanup());

describe("Avatar", () => {
  it("renders the root, image, and fallback parts", () => {
    const { container } = render(() => (
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
        <Avatar.Image src="/john.jpg" alt="John Doe" />
      </Avatar>
    ));

    expect(container.querySelector("div")).not.toBeNull();
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/john.jpg");
    expect(container.querySelector("span")?.textContent).toBe("JD");
  });

  it("spreads extra root props", () => {
    const { container } = render(() => (
      <Avatar class="avatar" data-testid="avatar">
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
    ));

    const el = container.querySelector("div")!;
    expect(el.getAttribute("class")).toBe("avatar");
    expect(el.getAttribute("data-testid")).toBe("avatar");
  });
});
