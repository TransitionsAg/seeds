import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "resolver/index": "src/resolver/index.ts",
    "resolver/zod": "src/resolver/zod.ts",
  },
  format: ["esm"],
  target: "esnext",
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["solid-js", "zod"],
  tsconfig: "tsconfig.build.json",
  outDir: "dist",
});
