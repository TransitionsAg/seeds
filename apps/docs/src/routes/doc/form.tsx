import type { RouteSectionProps } from "@solidjs/router";
import { DocsSectionLayout } from "~/components/docs";

export default function FormLayout(props: RouteSectionProps) {
  return <DocsSectionLayout section="form">{props.children}</DocsSectionLayout>;
}
