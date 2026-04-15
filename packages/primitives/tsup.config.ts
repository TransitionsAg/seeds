import { defineConfig } from "tsup";
import * as preset from "tsup-preset-solid";

const preset_options: preset.PresetOptions = {
  entries: [
    { name: "avatar", entry: "src/avatar/index.tsx", dev_entry: true },
    { name: "button", entry: "src/button/index.tsx", dev_entry: true },
    { name: "checkbox", entry: "src/checkbox/index.tsx", dev_entry: true },
    { name: "polymorphic", entry: "src/polymorphic/index.tsx", dev_entry: true },
    { name: "input", entry: "src/input/index.tsx", dev_entry: true },
    { name: "tree-view", entry: "src/tree-view/index.tsx", dev_entry: true },
  ],
};

export default defineConfig((config) => {
  const watching = !!config.watch;
  const parsed_options = preset.parsePresetOptions(preset_options, watching);
  const tsup_options = preset.generateTsupOptions(parsed_options);

  return tsup_options.map((options) => ({
    ...options,
    external: ["solid-js", "@zag-js/*"],
    sourcemap: true,
    tsconfig: "tsconfig.build.json",
  }));
});
