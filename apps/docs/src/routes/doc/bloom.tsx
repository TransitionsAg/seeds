import type { RouteSectionProps } from "@solidjs/router";
import { DocsSectionLayout } from "~/components/docs";

export default function BloomLayout(props: RouteSectionProps) {
  return <DocsSectionLayout section="bloom">{props.children}</DocsSectionLayout>;
}
