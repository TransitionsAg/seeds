import { AvatarRoot, avatarVariants } from "./avatar-root.tsx";

type AvatarType = typeof AvatarRoot & {
  Root: typeof AvatarRoot;
  variants: typeof avatarVariants;
};

export const Avatar: AvatarType = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  variants: avatarVariants,
});
