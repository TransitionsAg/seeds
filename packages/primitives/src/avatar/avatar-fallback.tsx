import { type JSX, mergeProps } from "solid-js";
import { useAvatarApi } from "./avatar-root.tsx";

type AvatarFallbackProps = JSX.HTMLAttributes<HTMLSpanElement> & { children?: JSX.Element };

export function AvatarFallback(rawProps: AvatarFallbackProps): JSX.Element {
  const api = useAvatarApi();
  if (!api) {
    throw Error("Avatar.Fallback component should be used inside of an Avatar");
  }
  const merged = mergeProps(api().getFallbackProps(), rawProps);
  return <span {...merged}>{merged.children}</span>;
}
