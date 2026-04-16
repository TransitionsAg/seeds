export type DocsSectionId = "primitives" | "form" | "bloom";

export type DocsPage = {
  title: string;
  href: string;
  description: string;
};

export type DocsSection = {
  id: DocsSectionId;
  title: string;
  href: string;
  description: string;
  pages: DocsPage[];
};

export const docsSections = [
  {
    id: "primitives",
    title: "Primitives",
    href: "/doc/primitives",
    description: "Headless, accessible building blocks powered by zag-js.",
    pages: [
      {
        title: "Overview",
        href: "/doc/primitives",
        description: "What lives in the primitives package and how to use it.",
      },
      {
        title: "Button",
        href: "/doc/primitives/button",
        description: "Polymorphic button primitive.",
      },
      {
        title: "Checkbox",
        href: "/doc/primitives/checkbox",
        description: "Checkbox with root, control, indicator, label, and hidden input.",
      },
      {
        title: "Polymorphic",
        href: "/doc/primitives/polymorphic",
        description: "Generic as-prop wrapper for any element or component.",
      },
      {
        title: "Tree View",
        href: "/doc/primitives/tree-view",
        description: "Hierarchical navigation primitive built on zag-js.",
      },
    ],
  },
  {
    id: "form",
    title: "Form",
    href: "/doc/form",
    description: "Reactive form state with binding, validation, and compound fields.",
    pages: [
      {
        title: "Overview",
        href: "/doc/form",
        description: "What the form package gives you at a glance.",
      },
      {
        title: "useForm",
        href: "/doc/form/use-form",
        description: "Main hook for values, errors, state, and actions.",
      },
      {
        title: "Field",
        href: "/doc/form/field",
        description: "Compound field parts returned by useFormComponents.",
      },
      {
        title: "Resolver",
        href: "/doc/form/resolver",
        description: "Schema validation adapters for useForm.",
      },
      {
        title: "Errors",
        href: "/doc/form/errors",
        description: "Error shape helpers and FormErrors utilities.",
      },
      {
        title: "Example",
        href: "/doc/form/example",
        description: "Working registration form with Zod validation.",
      },
    ],
  },
  {
    id: "bloom",
    title: "Bloom",
    href: "/doc/bloom",
    description: "Styled composition layer built on top of primitives.",
    pages: [
      {
        title: "Overview",
        href: "/doc/bloom",
        description: "What lives in the Bloom layer and why it exists.",
      },
      {
        title: "Avatar",
        href: "/doc/bloom/avatar",
        description: "Self-contained avatar with image and fallback content.",
      },
      {
        title: "Button",
        href: "/doc/bloom/button",
        description: "Styled button variants built on the primitives layer.",
      },
      {
        title: "Button Group",
        href: "/doc/bloom/button-group",
        description: "Layout-only grouped button wrapper.",
      },
      {
        title: "Checkbox",
        href: "/doc/bloom/checkbox",
        description: "Self-contained styled checkbox with hidden input.",
      },
      {
        title: "Input",
        href: "/doc/bloom/input",
        description: "Floating label input with error support.",
      },
      {
        title: "Tree View",
        href: "/doc/bloom/tree-view",
        description: "Styled tree view with collection helpers.",
      },
      {
        title: "Card",
        href: "/doc/bloom/card",
        description: "Container with header, content, and footer sub-components.",
      },
      {
        title: "Branding",
        href: "/doc/bloom/branding",
        description: "Runtime theme token provider.",
      },
    ],
  },
] as const satisfies readonly DocsSection[];

export function getDocsSection(sectionId: DocsSectionId): DocsSection {
  return docsSections.find((section) => section.id === sectionId) ?? docsSections[0];
}
