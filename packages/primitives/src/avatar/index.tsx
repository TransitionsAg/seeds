import { AvatarRoot } from "./avatar-root.tsx";
import { AvatarImage } from "./avatar-image.tsx";
import { AvatarFallback } from "./avatar-fallback.tsx";

export type { AvatarApi } from "./avatar-root.tsx";
export { AvatarApiContext, useAvatarApi } from "./avatar-root.tsx";

export { AvatarRoot } from "./avatar-root.tsx";
export { AvatarImage } from "./avatar-image.tsx";
export { AvatarFallback } from "./avatar-fallback.tsx";

/**
 * Unstyled avatar primitive wrapping `@zag-js/avatar`.
 * Supports image loading state and fallback content.
 *
 * @example
 * ```tsx
 * import { Avatar } from "@transitionsag/primitives/avatar"
 *
 * <Avatar>
 *   <Avatar.Fallback>JD</Avatar.Fallback>
 *   <Avatar.Image src="/john.jpg" alt="John Doe" />
 * </Avatar>
 * ```
 */
export const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
}) as typeof AvatarRoot & {
  Root: typeof AvatarRoot;
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
};
