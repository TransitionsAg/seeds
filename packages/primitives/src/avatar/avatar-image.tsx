import { type JSX, mergeProps } from "solid-js";
import { useAvatarApi } from "./avatar-root.tsx";

type AvatarImageProps = JSX.ImgHTMLAttributes<HTMLImageElement>;

export function AvatarImage(rawProps: AvatarImageProps): JSX.Element {
  const api = useAvatarApi();
  if (!api) {
    throw Error("Avatar.Image component should be used inside of an Avatar");
  }
  return <img {...mergeProps(api().getImageProps(), rawProps)} />;
}
