import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

function denoNpmRewrite() {
  return {
    name: "deno-npm-rewrite",
    enforce: "pre",
    transform(code: string, id: string) {
      if (!id.includes("@jsr/transitionsag__phosphor-solid")) return;
      return code.replace(
        /npm:[\w@/-]+@[\^~]?[\d.]+/g,
        (match: string) =>
          match.replace("npm:", "").replace(/@[\^~]?[\d.]+/, ""),
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
