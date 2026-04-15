import { type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

export function createForm(submit: () => void) {
  return function FormComp(rawProps: Omit<JSX.FormHTMLAttributes<HTMLFormElement>, "onSubmit">) {
    const handler = (e: SubmitEvent) => {
      e.preventDefault();
      submit();
    };
    return (
      // @ts-ignore: valid form props
      <Dynamic component="form" {...rawProps} onsubmit={handler} />
    );
  };
}
