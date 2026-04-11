import { Root, useBranding } from "./branding-root.tsx";
export type { Theme } from "./branding-root.tsx";

type BrandingType = typeof Root & {
  Root: typeof Root;
  useBranding: typeof useBranding;
};

export const Branding: BrandingType = Object.assign(Root, {
  Root,
  useBranding,
});
