import {
  createContext,
  createMemo,
  type JSX,
  type ParentProps,
  useContext,
} from "solid-js";

export type Theme = Partial<{
  primary: string;
  "primary-accent": string;
  "primary-foreground": string;
  secondary: string;
  "secondary-accent": string;
  "secondary-foreground": string;
  border: string;
  background: string;
  foreground: string;
  caption: string;
  destructive: string;
  "destructive-accent": string;
  "destructive-foreground": string;
}>;

export const BrandingContext = createContext<Theme>({});

function themeToCSSVars(theme: Theme): JSX.CSSProperties {
  const vars: JSX.CSSProperties = {};
  for (const [key, value] of Object.entries(theme)) {
    if (value) vars[`--color-${key}`] = value;
  }
  return vars;
}

type BrandingProps = ParentProps<{
  theme?: Theme;
}>;

export function Root(props: BrandingProps): JSX.Element {
  const cssVars = createMemo(() => themeToCSSVars(props.theme ?? {}));

  return (
    <BrandingContext.Provider value={props.theme ?? {}}>
      <div style={cssVars()}>{props.children}</div>
    </BrandingContext.Provider>
  );
}

export function useBranding(): Theme {
  return useContext(BrandingContext);
}
