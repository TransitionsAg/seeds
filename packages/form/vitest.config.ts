import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    conditions: ["browser"],
  },
  test: {
    environment: "happy-dom",
    include: ["src/**/*.test.tsx"],
  },
});
