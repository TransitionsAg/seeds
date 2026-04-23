import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@solidjs/testing-library";
import { Combobox, collection } from "./index.tsx";

afterEach(() => cleanup());

const frameworks = collection({
  items: [
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
  ],
  itemToValue: (item) => item.value,
  itemToString: (item) => item.label,
});

describe("Combobox", () => {
  it("renders root parts and forwards root props", () => {
    const { container } = render(() => (
      <Combobox id="frameworks" collection={frameworks} class="combo" data-testid="combo">
        <Combobox.Label>Framework</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger />
          <Combobox.ClearTrigger />
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.Item item={frameworks.items[0]}>
                <Combobox.Item.Text>{frameworks.items[0].label}</Combobox.Item.Text>
                <Combobox.Item.Indicator />
              </Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox>
    ));

    const root = container.querySelector("div");
    expect(root?.getAttribute("class")).toBe("combo");
    expect(root?.getAttribute("data-testid")).toBe("combo");
    expect(container.querySelector("label")?.textContent).toBe("Framework");
    expect(container.querySelector("input")).not.toBeNull();
    expect(container.querySelectorAll("button").length).toBe(2);
  });

  it("renders grouped items", () => {
    const { container } = render(() => (
      <Combobox id="grouped-frameworks" collection={frameworks}>
        <Combobox.Control>
          <Combobox.Input />
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.List>
              <Combobox.ItemGroup id="frontend-frameworks">
                <Combobox.ItemGroup.Label htmlFor="frontend-frameworks">
                  Frontend
                </Combobox.ItemGroup.Label>
                <Combobox.Item item={frameworks.items[1]}>
                  <Combobox.Item.Text>{frameworks.items[1].label}</Combobox.Item.Text>
                </Combobox.Item>
              </Combobox.ItemGroup>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox>
    ));

    expect(container.textContent).toContain("Frontend");
    expect(container.textContent).toContain("Vue");
  });
});
