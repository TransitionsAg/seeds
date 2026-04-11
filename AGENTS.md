# AGENTS.md — Seeds Monorepo

## Overview

Seeds is a SolidJS component and form library monorepo by transitions.ag, using
**Node.js** with **pnpm** as the package manager. The workspace contains UI
primitives (`packages/primitives`), a reactive form library (`packages/form`),
a component composition layer (`packages/bloom`), and a docs app (`apps/docs`).

## Runtime & Tooling

- **Runtime:** Node.js 22+ (provided via `flake.nix`)
- **Package manager:** pnpm (workspaces via `pnpm-workspace.yaml`)
- **Build tool:** tsup (ESM + DTS generation)
- **Framework:** SolidJS with JSX (`jsxImportSource: "solid-js"`)
- **Nix:** `nix develop` to enter the dev shell with `nodejs` and `pnpm`

## Build / Test / Lint Commands

### Install

```sh
pnpm install
```

### Build

```sh
pnpm build             # build all packages
```

Build a single package:

```sh
pnpm --filter @transitionsag/form run build
```

### Tests

Run all tests:

```sh
pnpm test
```

Run tests in a single package:

```sh
pnpm --filter @transitionsag/form run test
```

Run a single test file:

```sh
pnpm --filter @transitionsag/form exec vitest run src/errors/index.test.ts
```

Run a single test by name filter:

```sh
pnpm --filter @transitionsag/form exec vitest run --testNamePattern="state - isDirty"
```

### Type Check

```sh
pnpm check             # type check all packages
```

### Lint & Format

```sh
pnpm lint              # check formatting
pnpm fmt               # fix formatting
```

### Docs App

```sh
pnpm docs:dev          # local dev server
pnpm docs:build        # production build
```

## Project Structure

```
/
├── pnpm-workspace.yaml       # pnpm workspace config
├── tsconfig.json             # root TypeScript config
├── tsconfig.build.json       # build-time TS config (allows .ts extensions)
├── package.json              # root package with scripts
├── flake.nix                 # nix dev shell (nodejs + pnpm)
├── packages/
│   ├── primitives/           # unstyled UI primitives (Button, Input)
│   │   ├── src/*.tsx
│   │   ├── tsup.config.ts
│   │   ├── tsconfig.build.json
│   │   └── package.json
│   ├── form/                 # reactive form library (useForm, bind directive)
│   │   └── src/
│   │       ├── index.ts       # public API barrel
│   │       ├── form.ts       # useForm hook
│   │       ├── input/        # bind directive, Binder/Binding types, InputAttrs
│   │       ├── errors/       # FormErrors type, hasErrors, initErrors
│   │       ├── resolver/     # Resolver interface for schema validation
│   │       └── *.test.ts     # tests colocated with source
│   └── bloom/                # component composition layer (WIP)
└── apps/
    └── docs/                 # SolidStart documentation app
```

## Code Style

### TypeScript

- Use `type` keyword for type aliases, not `interface` (e.g.
  `type Props = { ... }`)
- Use `.ts` for logic, `.tsx` for JSX components
- File extensions are always explicit in imports (`.ts`, `.tsx`)
- Prefer `unknown` over `any`
- Use JSDoc comments with `@example` blocks on public APIs; use `{@linkcode X}`
  for cross-references
- **JSDoc `@example` code blocks must NOT contain JSX comments** (`{/* ... */}`)
  — they break JSDoc parsing. Use `...` as placeholder for nested content.
- No unnecessary comments — comments should be meaningful

### Imports

- Source files use explicit `.ts`/`.tsx` extensions in relative imports
  (handled by tsup during build)
- Import types with `import type` when only used at type level

### Naming

- **Files:** lowercase, kebab-case (e.g. `index.ts`, `index.test.ts`,
  `tree-view-root.tsx`)
- **Types:** PascalCase (e.g. `FormErrors`, `BindingAria`, `InputAttrs`)
- **Functions:** camelCase (e.g. `useForm`, `hasErrors`, `initErrors`)
- **Components:** PascalCase function names, prefixed with primitive name (e.g.
  `TreeViewRoot`, `TreeViewBranchControl`, `ButtonRoot`). NEVER export a
  component named just `Root`, `Text`, `Control`, etc. — always prefix.
- **Constants:** camelCase for local, UPPER_CASE only for true global constants
- **Barrel files:** always named `index.ts`

### Module Patterns

- Each subdirectory exports through `index.ts` (or `index.tsx` for JSX)
- **`index.tsx` is ALWAYS a barrel file.** It imports individual components,
  re-exports them, and assembles compound objects via `Object.assign`. It
  contains NO component logic.
- **One component per file.** Never put multiple components in a single file
  (except for the barrel `index.tsx`).
- **File placement decision tree:**
  - Compound with NO sub-parts → `<primitive>-<compound>.tsx` at the primitive
    root (e.g. `tree-view-root.tsx`, `tree-view-label.tsx`)
  - Compound WITH sub-parts → `<primitive>-<compound>/` folder with one file per
    sub-part (e.g. `tree-view-branch/tree-view-branch-root.tsx`,
    `tree-view-branch/tree-view-branch-control.tsx`)
- **Props types live in the SAME file as their component.** Never create a
  separate file just for a single component's props. Exception: shared utility
  types used across multiple primitives (e.g. `PolymorphicProps`) get their own
  file (e.g. `polymorphic.tsx`) and re-export from `index.tsx`.
- **Public API re-exported from package-level `index.ts`**
- `package.json` `"exports"` field defines the package's public entry points
  (pointing to compiled `dist/` output)
- Test files are colocated: `foo.ts` → `foo.test.ts` or `index.ts` → `index.test.ts`

#### Example directory structure

```
tree-view/
├── index.tsx                           # barrel + compound assembly
├── tree-view-root.tsx                # single compound, no sub-parts
├── tree-view-label.tsx               # single compound, no sub-parts
├── tree-view-tree.tsx                # single compound, no sub-parts
├── tree-view-node.tsx                # shared compounds (Checkbox, RenameInput)
├── tree-view-item/                   # compound WITH sub-parts
│   ├── tree-view-item-root.tsx
│   ├── tree-view-item-text.tsx
│   └── tree-view-item-indicator.tsx
└── tree-view-branch/                 # compound WITH sub-parts
    ├── tree-view-branch-root.tsx
    ├── tree-view-branch-control.tsx
    ├── tree-view-branch-content.tsx
    ├── tree-view-branch-text.tsx
    ├── tree-view-branch-trigger.tsx
    ├── tree-view-branch-indicator.tsx
    └── tree-view-branch-indent-guide.tsx
```

### Component Conventions

- Primitives provide **no styling** — they are unstyled building blocks
- Support polymorphism via SolidJS `Dynamic` component and `as` prop
- Use `mergeProps` and `splitProps` from SolidJS for prop handling
- Export compound components via `Object.assign(Root, { SubComponent })`
- Components should have a `Root` function

### Primitive Design Principles

- **Follow the zag-js anatomy for stylable parts.** When wrapping a zag-js
  machine, expose one compound sub-component per _visually meaningful_ anatomy
  part (e.g. `Control`, `Indicator`, `Track`, `Thumb`).
- **HiddenInput is a public compound.** When a zag-js component provides
  `getHiddenInputProps()` for form submission, expose `HiddenInput` as a public
  compound part. Exception: when the hidden input is required for core
  functionality (e.g. `@zag-js/file-upload`), internalize it in `Root`.
- **Form-related props live on Root.** Props like `name`, `value`, `checked`,
  `disabled`, `required`, `invalid` belong on the `Root` component, not on a
  hidden input sub-component.
- **Nest compounds by semantic role.** Group triggers under a `Trigger`
  namespace (`Trigger.Clear`, `Trigger.Delete`, `Trigger.EyeDropper`). Group
  related parts under feature names (`Visibility { Trigger, Indicator }`).

### Testing

- Use `vitest` with `describe`/`it`/`expect` from `vitest`
- Use `@solidjs/testing-library` with `happy-dom` for component/hook tests
- Set up DOM globals in test files (`Window`, `document`, `navigator`, etc.)
- Call `cleanup()` after each test via `afterEach(() => cleanup())`
- Test files colocated with source: `foo.ts` → `foo.test.ts`

### Error Handling

- Validation errors are `string[] | null` per field, not thrown exceptions
- Use `Promise.finally()` for async cleanup (e.g. resetting `isSubmitting`)
- Resolver validation is optional — forms work without a resolver
- No try/catch unless interfacing with external APIs

### SolidJS Patterns

- Reactive state via `createStore` from `solid-js/store`
- Getters for derived reactive state (not `createMemo` for simple derivations)
- Directives for DOM side-effects (`use:bind`)
- `createEffect` for reactive DOM attribute updates
- `structuredClone` for deep cloning initial values

## Package Publishing

Packages are published to npm. Each package builds to `dist/` via tsup.
The `"files"` field in `package.json` controls what gets published (typically
just `dist/`).

Build before publishing:

```sh
pnpm build
```

Publish a package:

```sh
cd packages/form
pnpm publish --access public
```

## Workspace Dependencies

- Inter-package deps use `"workspace:*"` in `package.json`
- Run `pnpm install` after adding or changing dependencies
- `pnpm build` must run before consuming packages can resolve workspace deps
