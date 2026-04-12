import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  ssr: process.env.SSR !== "false",
  server: process.env.SSR === "false" ? { preset: "static" } : undefined,
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@solidjs/router"],
    },
  },
});
