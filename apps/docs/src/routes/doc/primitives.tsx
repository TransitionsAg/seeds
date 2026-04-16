import type { RouteSectionProps } from "@solidjs/router";
import { DocsSectionLayout } from "~/components/docs";

export default function PrimitivesLayout(props: RouteSectionProps) {
  return <DocsSectionLayout section="primitives">{props.children}</DocsSectionLayout>;
}
