import { Root, useBranding } from "./branding-root.tsx";
export type { Theme } from "./branding-root.tsx";

export const Branding = Object.assign(Root, {
  Root,
  useBranding,
});
