/// <reference lib="deno.ns" />
import { assertEquals } from "@std/assert";
import { z } from "zod";
import { zodResolver } from "./zod.ts";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18).optional(),
  address: z.object({
    city: z.string().min(1),
    zip: z.string().optional(),
  }),
});

type Form = z.infer<typeof schema>;

const resolver = zodResolver(schema);

// --- attrs ---

Deno.test("attrs - required for non-optional string", () => {
  assertEquals(resolver.attrs(["email"]).required, true);
});

Deno.test("attrs - not required for optional field", () => {
  assertEquals(resolver.attrs(["age"]).required, undefined);
});

Deno.test("attrs - minLength from string().min()", () => {
  const s = z.object({ name: z.string().min(3) });
  const r = zodResolver(s);
  assertEquals(r.attrs(["name"]).minLength, 3);
});

Deno.test("attrs - maxLength from string().max()", () => {
  const s = z.object({ bio: z.string().max(200) });
  const r = zodResolver(s);
  assertEquals(r.attrs(["bio"]).maxLength, 200);
});

Deno.test("attrs - pattern from string().regex()", () => {
  const s = z.object({ code: z.string().regex(/^[A-Z]{3}$/) });
  const r = zodResolver(s);
  assertEquals(r.attrs(["code"]).pattern, "^[A-Z]{3}$");
});

Deno.test("attrs - min/max from number().min().max()", () => {
  const s = z.object({ score: z.number().min(0).max(100) });
  const r = zodResolver(s);
  const a = r.attrs(["score"]);
  assertEquals(a.min, 0);
  assertEquals(a.max, 100);
});

Deno.test("attrs - step from number().multipleOf()", () => {
  const s = z.object({ quantity: z.number().multipleOf(5) });
  const r = zodResolver(s);
  assertEquals(r.attrs(["quantity"]).step, 5);
});

Deno.test("attrs - nested field", () => {
  const a = resolver.attrs(["address", "city"]);
  assertEquals(a.required, true);
  assertEquals(a.minLength, 1);
});

Deno.test("attrs - optional nested field", () => {
  const a = resolver.attrs(["address", "zip"]);
  assertEquals(a.required, undefined);
});

Deno.test("attrs - unwraps ZodDefault for checks", () => {
  const s = z.object({ role: z.string().min(2).default("user") });
  const r = zodResolver(s);
  const a = r.attrs(["role"]);
  assertEquals(a.minLength, 2);
  // default implies a value will always be present — not required from the user
  assertEquals(a.required, undefined);
});

Deno.test("attrs - unwraps ZodNullable", () => {
  const s = z.object({ name: z.string().min(2).nullable() });
  const r = zodResolver(s);
  assertEquals(r.attrs(["name"]).minLength, 2);
});

Deno.test("attrs - combined string checks", () => {
  const s = z.object({
    handle: z.string().min(3).max(20).regex(/^[a-z]+$/),
  });
  const r = zodResolver(s);
  const a = r.attrs(["handle"]);
  assertEquals(a.required, true);
  assertEquals(a.minLength, 3);
  assertEquals(a.maxLength, 20);
  assertEquals(a.pattern, "^[a-z]+$");
});

Deno.test("attrs - unknown path returns empty object", () => {
  assertEquals(resolver.attrs(["nonexistent"]), {});
});

// --- validate (per-field) ---

Deno.test("validate - returns null for valid value", async () => {
  const result = await resolver.validate!(["email"], "test@example.com");
  assertEquals(result, null);
});

Deno.test("validate - returns errors for invalid value", async () => {
  const result = await resolver.validate!(["email"], "not-an-email");
  assertEquals(Array.isArray(result), true);
  assertEquals(result!.length > 0, true);
});

Deno.test("validate - validates nested field", async () => {
  const result = await resolver.validate!(["address", "city"], "");
  assertEquals(Array.isArray(result), true);
  assertEquals(result!.length > 0, true);
});

Deno.test("validate - nested field valid", async () => {
  const result = await resolver.validate!(["address", "city"], "Lyon");
  assertEquals(result, null);
});

Deno.test("validate - optional field valid with undefined", async () => {
  const result = await resolver.validate!(["age"], undefined);
  assertEquals(result, null);
});

Deno.test("validate - optional field invalid value", async () => {
  const result = await resolver.validate!(["age"], 10);
  assertEquals(Array.isArray(result), true);
  assertEquals(result!.length > 0, true);
});

Deno.test("validate - unknown path returns null", async () => {
  const result = await resolver.validate!(["nonexistent"], "value");
  assertEquals(result, null);
});

Deno.test("validate - password min length", async () => {
  const result = await resolver.validate!(["password"], "short");
  assertEquals(Array.isArray(result), true);
  const valid = await resolver.validate!(["password"], "longenoughpassword");
  assertEquals(valid, null);
});

// --- validateAll ---

Deno.test("validateAll - returns null errors for valid form", async () => {
  const values: Form = {
    email: "test@example.com",
    password: "longenoughpassword",
    address: { city: "Lyon" },
  };
  const errors = await resolver.validateAll!(values);
  assertEquals(errors.email, null);
  assertEquals(errors.password, null);
  assertEquals(errors.address.city, null);
});

Deno.test("validateAll - returns errors for invalid form", async () => {
  const values = {
    email: "bad",
    password: "short",
    address: { city: "" },
  } as Form;
  const errors = await resolver.validateAll!(values);
  assertEquals(Array.isArray(errors.email), true);
  assertEquals(Array.isArray(errors.password), true);
  assertEquals(Array.isArray(errors.address.city), true);
});

Deno.test("validateAll - only invalid fields have errors", async () => {
  const values = {
    email: "bad",
    password: "longenoughpassword",
    address: { city: "Lyon" },
  } as Form;
  const errors = await resolver.validateAll!(values);
  assertEquals(Array.isArray(errors.email), true);
  assertEquals(errors.password, null);
  assertEquals(errors.address.city, null);
});

// --- async refinements ---

Deno.test("validate - works with async refinement", async () => {
  const asyncSchema = z.object({
    username: z.string().refine(
      (val) => val !== "taken",
      { message: "Username is taken" },
    ),
  });
  const r = zodResolver(asyncSchema);
  const taken = await r.validate!(["username"], "taken");
  assertEquals(taken, ["Username is taken"]);
  const available = await r.validate!(["username"], "available");
  assertEquals(available, null);
});

Deno.test("validateAll - works with async refinement", async () => {
  const asyncSchema = z.object({
    username: z.string().refine(
      (val) => val !== "taken",
      { message: "Username is taken" },
    ),
  });
  const r = zodResolver(asyncSchema);
  const errors = await r.validateAll!({ username: "taken" });
  assertEquals(Array.isArray(errors.username), true);
  assertEquals(errors.username![0], "Username is taken");
});

// --- unwrapping ---

Deno.test("validate - unwraps ZodDefault", async () => {
  const s = z.object({
    role: z.string().min(1).default("user"),
  });
  const r = zodResolver(s);
  const result = await r.validate!(["role"], "");
  assertEquals(Array.isArray(result), true);
});

Deno.test("validate - unwraps ZodNullable", async () => {
  const s = z.object({
    name: z.string().min(2).nullable(),
  });
  const r = zodResolver(s);
  const result = await r.validate!(["name"], null);
  assertEquals(result, null);
  const short = await r.validate!(["name"], "a");
  assertEquals(Array.isArray(short), true);
});

Deno.test("validate - unwraps nested optional object", async () => {
  const s = z.object({
    profile: z.object({
      bio: z.string().min(1),
    }).optional(),
  });
  const r = zodResolver(s);
  const result = await r.validate!(["profile", "bio"], "");
  assertEquals(Array.isArray(result), true);
  const valid = await r.validate!(["profile", "bio"], "hello");
  assertEquals(valid, null);
});
