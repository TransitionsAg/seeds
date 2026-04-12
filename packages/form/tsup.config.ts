import { defineConfig } from "tsup";
import * as preset from "tsup-preset-solid";

const preset_options: preset.PresetOptions = {
  entries: [
    { entry: "src/index.ts", dev_entry: true },
    { name: "resolver/index", entry: "src/resolver/index.ts" },
    { name: "resolver/zod", entry: "src/resolver/zod.ts" },
  ],
};

export default defineConfig((config) => {
  const watching = !!config.watch;
  const parsed_options = preset.parsePresetOptions(preset_options, watching);
  const tsup_options = preset.generateTsupOptions(parsed_options);

  return tsup_options.map((options) => ({
    ...options,
    external: ["solid-js", "zod"],
    sourcemap: true,
    tsconfig: "tsconfig.build.json",
  }));
});
