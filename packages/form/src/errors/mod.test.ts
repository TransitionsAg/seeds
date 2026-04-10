import { assertEquals } from "jsr:@std/assert";
import { initErrors } from "./mod.ts";

Deno.test("initErrors - flat object sets all leaves to null", () => {
  const result = initErrors({ email: "", password: "" });
  assertEquals(result, { email: null, password: null });
});

Deno.test("initErrors - nested object recurses", () => {
  const result = initErrors({
    email: "",
    address: { city: "", zip: "" },
  });
  assertEquals(result, {
    email: null,
    address: { city: null, zip: null },
  });
});

Deno.test("initErrors - deeply nested object", () => {
  const result = initErrors({
    user: { profile: { name: "", age: 0 } },
  });
  assertEquals(result, {
    user: { profile: { name: null, age: null } },
  });
});

Deno.test("initErrors - arrays are treated as leaves", () => {
  const result = initErrors({ tags: ["a", "b"] });
  assertEquals(result, { tags: null });
});
