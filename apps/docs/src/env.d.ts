declare module "@vinxi/plugin-mdx" {
  const plugin: any;
  export default plugin;
}

declare const process: {
  env: Record<string, string | undefined> & {
    SSR?: string;
    BASE_URL?: string;
  };
};

interface ImportMetaEnv {
  readonly SERVER_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
