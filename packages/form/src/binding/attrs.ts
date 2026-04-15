/** HTML constraint-validation attributes that a {@linkcode Resolver} can derive for each field. Applied to the DOM element automatically by the `use:bind` directive. */
export type InputAttrs = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
};
