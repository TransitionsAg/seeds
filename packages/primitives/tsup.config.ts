import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "button/index": "src/button/index.tsx",
    "checkbox/index": "src/checkbox/index.tsx",
    "polymorphic/index": "src/polymorphic/index.tsx",
    "input/index": "src/input/index.tsx",
    "tree-view/index": "src/tree-view/index.tsx",
  },
  format: ["esm"],
  target: "esnext",
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["solid-js", "@zag-js/*"],
  tsconfig: "tsconfig.build.json",
  outDir: "dist",
});
