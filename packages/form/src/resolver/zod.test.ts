import { describe, expect, it } from "vitest";
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

describe("attrs", () => {
  it("required for non-optional string", () => {
    expect(resolver.attrs(["email"]).required).toBe(true);
  });

  it("not required for optional field", () => {
    expect(resolver.attrs(["age"]).required).toBeUndefined();
  });

  it("minLength from string().min()", () => {
    const s = z.object({ name: z.string().min(3) });
    const r = zodResolver(s);
    expect(r.attrs(["name"]).minLength).toBe(3);
  });

  it("maxLength from string().max()", () => {
    const s = z.object({ bio: z.string().max(200) });
    const r = zodResolver(s);
    expect(r.attrs(["bio"]).maxLength).toBe(200);
  });

  it("pattern from string().regex()", () => {
    const s = z.object({ code: z.string().regex(/^[A-Z]{3}$/) });
    const r = zodResolver(s);
    expect(r.attrs(["code"]).pattern).toBe("^[A-Z]{3}$");
  });

  it("min/max from number().min().max()", () => {
    const s = z.object({ score: z.number().min(0).max(100) });
    const r = zodResolver(s);
    const a = r.attrs(["score"]);
    expect(a.min).toBe(0);
    expect(a.max).toBe(100);
  });

  it("step from number().multipleOf()", () => {
    const s = z.object({ quantity: z.number().multipleOf(5) });
    const r = zodResolver(s);
    expect(r.attrs(["quantity"]).step).toBe(5);
  });

  it("nested field", () => {
    const a = resolver.attrs(["address", "city"]);
    expect(a.required).toBe(true);
    expect(a.minLength).toBe(1);
  });

  it("optional nested field", () => {
    const a = resolver.attrs(["address", "zip"]);
    expect(a.required).toBeUndefined();
  });

  it("unwraps ZodDefault for checks", () => {
    const s = z.object({ role: z.string().min(2).default("user") });
    const r = zodResolver(s);
    const a = r.attrs(["role"]);
    expect(a.minLength).toBe(2);
    expect(a.required).toBeUndefined();
  });

  it("unwraps ZodNullable", () => {
    const s = z.object({ name: z.string().min(2).nullable() });
    const r = zodResolver(s);
    expect(r.attrs(["name"]).minLength).toBe(2);
  });

  it("combined string checks", () => {
    const s = z.object({
      handle: z
        .string()
        .min(3)
        .max(20)
        .regex(/^[a-z]+$/),
    });
    const r = zodResolver(s);
    const a = r.attrs(["handle"]);
    expect(a.required).toBe(true);
    expect(a.minLength).toBe(3);
    expect(a.maxLength).toBe(20);
    expect(a.pattern).toBe("^[a-z]+$");
  });

  it("unknown path returns empty object", () => {
    expect(resolver.attrs(["nonexistent"])).toEqual({});
  });
});

// --- validate (per-field) ---

describe("validate", () => {
  it("returns null for valid value", async () => {
    const result = await resolver.validate!(["email"], "test@example.com");
    expect(result).toBe(null);
  });

  it("returns errors for invalid value", async () => {
    const result = await resolver.validate!(["email"], "not-an-email");
    expect(Array.isArray(result)).toBe(true);
    expect(result!.length).toBeGreaterThan(0);
  });

  it("validates nested field", async () => {
    const result = await resolver.validate!(["address", "city"], "");
    expect(Array.isArray(result)).toBe(true);
    expect(result!.length).toBeGreaterThan(0);
  });

  it("nested field valid", async () => {
    const result = await resolver.validate!(["address", "city"], "Lyon");
    expect(result).toBe(null);
  });

  it("optional field valid with undefined", async () => {
    const result = await resolver.validate!(["age"], undefined);
    expect(result).toBe(null);
  });

  it("optional field invalid value", async () => {
    const result = await resolver.validate!(["age"], 10);
    expect(Array.isArray(result)).toBe(true);
    expect(result!.length).toBeGreaterThan(0);
  });

  it("unknown path returns null", async () => {
    const result = await resolver.validate!(["nonexistent"], "value");
    expect(result).toBe(null);
  });

  it("password min length", async () => {
    const result = await resolver.validate!(["password"], "short");
    expect(Array.isArray(result)).toBe(true);
    const valid = await resolver.validate!(["password"], "longenoughpassword");
    expect(valid).toBe(null);
  });
});

// --- validateAll ---

describe("validateAll", () => {
  it("returns null errors for valid form", async () => {
    const values: Form = {
      email: "test@example.com",
      password: "longenoughpassword",
      address: { city: "Lyon" },
    };
    const errors = await resolver.validateAll!(values);
    expect(errors.email).toBe(null);
    expect(errors.password).toBe(null);
    expect(errors.address.city).toBe(null);
  });

  it("returns errors for invalid form", async () => {
    const values = {
      email: "bad",
      password: "short",
      address: { city: "" },
    } as Form;
    const errors = await resolver.validateAll!(values);
    expect(Array.isArray(errors.email)).toBe(true);
    expect(Array.isArray(errors.password)).toBe(true);
    expect(Array.isArray(errors.address.city)).toBe(true);
  });

  it("only invalid fields have errors", async () => {
    const values = {
      email: "bad",
      password: "longenoughpassword",
      address: { city: "Lyon" },
    } as Form;
    const errors = await resolver.validateAll!(values);
    expect(Array.isArray(errors.email)).toBe(true);
    expect(errors.password).toBe(null);
    expect(errors.address.city).toBe(null);
  });
});

// --- async refinements ---

describe("async refinements", () => {
  it("works with async refinement", async () => {
    const asyncSchema = z.object({
      username: z.string().refine((val) => val !== "taken", { message: "Username is taken" }),
    });
    const r = zodResolver(asyncSchema);
    const taken = await r.validate!(["username"], "taken");
    expect(taken).toEqual(["Username is taken"]);
    const available = await r.validate!(["username"], "available");
    expect(available).toBe(null);
  });

  it("validateAll works with async refinement", async () => {
    const asyncSchema = z.object({
      username: z.string().refine((val) => val !== "taken", { message: "Username is taken" }),
    });
    const r = zodResolver(asyncSchema);
    const errors = await r.validateAll!({ username: "taken" });
    expect(Array.isArray(errors.username)).toBe(true);
    expect(errors.username![0]).toBe("Username is taken");
  });
});

// --- unwrapping ---

describe("unwrapping", () => {
  it("unwraps ZodDefault", async () => {
    const s = z.object({
      role: z.string().min(1).default("user"),
    });
    const r = zodResolver(s);
    const result = await r.validate!(["role"], "");
    expect(Array.isArray(result)).toBe(true);
  });

  it("unwraps ZodNullable", async () => {
    const s = z.object({
      name: z.string().min(2).nullable(),
    });
    const r = zodResolver(s);
    const result = await r.validate!(["name"], null);
    expect(result).toBe(null);
    const short = await r.validate!(["name"], "a");
    expect(Array.isArray(short)).toBe(true);
  });

  it("unwraps nested optional object", async () => {
    const s = z.object({
      profile: z
        .object({
          bio: z.string().min(1),
        })
        .optional(),
    });
    const r = zodResolver(s);
    const result = await r.validate!(["profile", "bio"], "");
    expect(Array.isArray(result)).toBe(true);
    const valid = await r.validate!(["profile", "bio"], "hello");
    expect(valid).toBe(null);
  });
});
