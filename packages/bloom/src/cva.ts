import { type Compose, type CVA, type CX, defineConfig } from "cva";
import { twMerge } from "tailwind-merge";

const config = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className),
  },
});

export const cva: CVA = config.cva;
export const cx: CX = config.cx;
export const compose: Compose = config.compose;

export type { VariantProps } from "cva";
