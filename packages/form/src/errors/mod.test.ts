import { describe, expect, it } from "vitest";
import { initErrors } from "./index.ts";

describe("initErrors", () => {
  it("flat object sets all leaves to null", () => {
    const result = initErrors({ email: "", password: "" });
    expect(result).toEqual({ email: null, password: null });
  });

  it("nested object recurses", () => {
    const result = initErrors({
      email: "",
      address: { city: "", zip: "" },
    });
    expect(result).toEqual({
      email: null,
      address: { city: null, zip: null },
    });
  });

  it("deeply nested object", () => {
    const result = initErrors({
      user: { profile: { name: "", age: 0 } },
    });
    expect(result).toEqual({
      user: { profile: { name: null, age: null } },
    });
  });

  it("arrays are treated as leaves", () => {
    const result = initErrors({ tags: ["a", "b"] });
    expect(result).toEqual({ tags: null });
  });
});
