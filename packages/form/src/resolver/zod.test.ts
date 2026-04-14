import { describe, expect, it } from "vitest";
import * as z from "zod/v4/mini";
import { z as z3 } from "zod";
import { zodResolver } from "./zod.ts";

const schema = z.object({
  email: z.email(),
  password: z.string().check(z.minLength(8)),
  age: z.optional(z.number().check(z.gte(18))),
  address: z.object({
    city: z.string().check(z.minLength(1)),
    zip: z.optional(z.string()),
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

  it("minLength from string().check(z.minLength())", () => {
    const s = z.object({ name: z.string().check(z.minLength(3)) });
    const r = zodResolver(s);
    expect(r.attrs(["name"]).minLength).toBe(3);
  });

  it("maxLength from string().check(z.maxLength())", () => {
    const s = z.object({ bio: z.string().check(z.maxLength(200)) });
    const r = zodResolver(s);
    expect(r.attrs(["bio"]).maxLength).toBe(200);
  });

  it("pattern from string().check(z.regex())", () => {
    const s = z.object({ code: z.string().check(z.regex(/^[A-Z]{3}$/)) });
    const r = zodResolver(s);
    expect(r.attrs(["code"]).pattern).toBe("^[A-Z]{3}$");
  });

  it("min/max from number().check(z.gte()).check(z.lte())", () => {
    const s = z.object({ score: z.number().check(z.gte(0), z.lte(100)) });
    const r = zodResolver(s);
    const a = r.attrs(["score"]);
    expect(a.min).toBe(0);
    expect(a.max).toBe(100);
  });

  it("step from number().check(z.multipleOf())", () => {
    const s = z.object({ quantity: z.number().check(z.multipleOf(5)) });
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

  it("unwraps ZodMiniDefault for checks", () => {
    const s = z.object({ role: z._default(z.string().check(z.minLength(2)), "user") });
    const r = zodResolver(s);
    const a = r.attrs(["role"]);
    expect(a.minLength).toBe(2);
    expect(a.required).toBeUndefined();
  });

  it("unwraps ZodMiniNullable", () => {
    const s = z.object({ name: z.nullable(z.string().check(z.minLength(2))) });
    const r = zodResolver(s);
    expect(r.attrs(["name"]).minLength).toBe(2);
  });

  it("combined string checks", () => {
    const s = z.object({
      handle: z.string().check(z.minLength(3), z.maxLength(20), z.regex(/^[a-z]+$/)),
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
    expect(errors.address!.city).toBe(null);
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
    expect(Array.isArray(errors.address!.city)).toBe(true);
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
    expect(errors.address!.city).toBe(null);
  });
});

// --- async refinements ---

describe("async refinements", () => {
  it("works with async refinement", async () => {
    const asyncSchema = z.object({
      username: z
        .string()
        .check(z.refine((val) => val !== "taken", { message: "Username is taken" })),
    });
    const r = zodResolver(asyncSchema);
    const taken = await r.validate!(["username"], "taken");
    expect(taken).toEqual(["Username is taken"]);
    const available = await r.validate!(["username"], "available");
    expect(available).toBe(null);
  });

  it("validateAll works with async refinement", async () => {
    const asyncSchema = z.object({
      username: z
        .string()
        .check(z.refine((val) => val !== "taken", { message: "Username is taken" })),
    });
    const r = zodResolver(asyncSchema);
    const errors = await r.validateAll!({ username: "taken" });
    expect(Array.isArray(errors.username)).toBe(true);
    expect(errors.username![0]).toBe("Username is taken");
  });
});

// --- unwrapping ---

describe("unwrapping", () => {
  it("unwraps ZodMiniDefault", async () => {
    const s = z.object({
      role: z._default(z.string().check(z.minLength(1)), "user"),
    });
    const r = zodResolver(s);
    const result = await r.validate!(["role"], "");
    expect(Array.isArray(result)).toBe(true);
  });

  it("unwraps ZodMiniNullable", async () => {
    const s = z.object({
      name: z.nullable(z.string().check(z.minLength(2))),
    });
    const r = zodResolver(s);
    const result = await r.validate!(["name"], null);
    expect(result).toBe(null);
    const short = await r.validate!(["name"], "a");
    expect(Array.isArray(short)).toBe(true);
  });

  it("unwraps nested optional object", async () => {
    const s = z.object({
      profile: z.optional(
        z.object({
          bio: z.string().check(z.minLength(1)),
        }),
      ),
    });
    const r = zodResolver(s);
    const result = await r.validate!(["profile", "bio"], "");
    expect(Array.isArray(result)).toBe(true);
    const valid = await r.validate!(["profile", "bio"], "hello");
    expect(valid).toBe(null);
  });
});

// --- zod v3 detection ---

describe("zod v3 detection", () => {
  it("throws when given a Zod v3 schema", () => {
    const v3Schema = z3.object({
      email: z3.string().email(),
    });
    expect(() => zodResolver(v3Schema as never)).toThrow(
      /zodResolver.*Zod v3 schema detected.*zod\/v4\/mini/,
    );
  });
});
