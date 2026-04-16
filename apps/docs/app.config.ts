import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import mdxPlugin from "@vinxi/plugin-mdx";
import rehypePrettyCode from "rehype-pretty-code";

const mdx = mdxPlugin.default as typeof mdxPlugin.default & {
  withImports: (
    namedImports: Record<string, string | string[]>,
  ) => (options: {
    jsx?: boolean;
    jsxImportSource?: string;
    remarkPlugins?: unknown[];
    rehypePlugins?: unknown[];
  }) => any[];
};

export default defineConfig({
  extensions: ["mdx"],
  ssr: process.env.SSR !== "false",
  server:
    process.env.SSR === "false"
      ? { preset: "static", baseURL: process.env.BASE_URL || undefined }
      : undefined,
  vite: {
    plugins: [
      tailwindcss(),
      ...mdx.withImports({})({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "~/components/docs/mdx-components.tsx",
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-light-default",
              keepBackground: false,
            },
          ],
        ],
      }),
    ],
    resolve: {
      alias: {
        "~": new URL("./src", import.meta.url).pathname,
      },
    },
    ssr: {
      noExternal: ["@solidjs/router", /^@transitionsag/],
    },
  },
});
