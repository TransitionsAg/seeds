import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";

function denoNpmRewrite(): Plugin {
  return {
    name: "deno-npm-rewrite",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes("@jsr/transitionsag__phosphor-solid")) return;
      return code.replace(
        /npm:[\w@/-]+@[\^~]?[\d.]+/g,
        (match) => match.replace("npm:", "").replace(/@[\^~]?[\d.]+/, ""),
      );
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), denoNpmRewrite()],
    ssr: {
      noExternal: ["@solidjs/router", "@jsr/transitionsag__phosphor-solid"],
    },
  },
});
