import { type JSX, type ValidComponent, splitProps } from "solid-js";
import { Avatar as AvatarPrimitive } from "@transitionsag/primitives/avatar";
import { Facehash } from "@transitionsag/facehash-solid";
import { cva } from "../cva.ts";

export const avatarVariants = cva({
  base: "relative inline-flex size-10 shrink-0 overflow-hidden rounded-full bg-secondary text-secondary-foreground",
});

const imageVariants = cva({
  base: "h-full w-full object-cover",
});

const fallbackVariants = cva({
  base: "flex h-full w-full items-center justify-center",
});

type AvatarRootProps<T extends ValidComponent = "div"> = Omit<
  Parameters<typeof AvatarPrimitive.Root<T>>[0],
  "children"
> & {
  alt?: string;
  class?: string;
  name?: string;
  src?: string;
};

export function AvatarRoot<T extends ValidComponent = "div">(
  rawProps: AvatarRootProps<T>,
): JSX.Element {
  const [local, others] = splitProps(rawProps as AvatarRootProps, ["alt", "class", "name", "src"]);
  const fallbackName = local.name ?? local.alt ?? "";
  const imageAlt = local.alt ?? local.name ?? "";

  return (
    // @ts-ignore: Props are valid but not worth calculating
    <AvatarPrimitive.Root {...others} class={avatarVariants({ class: local.class })}>
      {local.src ? (
        <AvatarPrimitive.Image alt={imageAlt} src={local.src} class={imageVariants()} />
      ) : null}
      <AvatarPrimitive.Fallback class={fallbackVariants()}>
        <Facehash name={fallbackName} />
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
