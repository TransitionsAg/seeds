# AGENTS.md — Seeds Monorepo

## Overview

Seeds is a SolidJS component and form library monorepo by transitions.ag, using
**Deno** as runtime/package manager. The workspace contains UI primitives
(`packages/primitives`), a reactive form library (`packages/form`), a component
composition layer (`packages/bloom`), and a docs app (`apps/docs`).

## Runtime & Tooling

- **Runtime:** Deno (provided via `flake.nix`, also requires Node.js for npm
  deps)
- **Package manager:** Deno workspaces (`deno.json` at root)
- **Node modules:** `"nodeModulesDir": "manual"` — run `deno install` to
  populate `node_modules/`
- **Framework:** SolidJS with JSX (`jsxImportSource: "solid-js"`)
- **Nix:** `nix develop` to enter the dev shell with `deno` and `nodejs`

## Build / Test / Lint Commands

### Tests

Run all tests in a package:

```sh
cd packages/form
deno task test
# expands to: deno test --no-check --allow-env --conditions=browser src/
```

Run a single test file:

```sh
deno test --no-check --allow-env --conditions=browser packages/form/src/errors/mod.test.ts
```

Run a single test by name filter:

```sh
deno test --no-check --allow-env --conditions=browser --filter="state - isDirty" packages/form/src/
```

### Lint & Format

```sh
deno lint
deno fmt
deno fmt --check   # CI check
```

### Type Check

```sh
deno check packages/form/src/mod.ts
```

### Docs App

```sh
cd apps/docs
deno task dev      # local dev server
deno task build    # production build
```

## Project Structure

```
/
├── deno.json                  # root workspace config
├── flake.nix                  # nix dev shell
├── packages/
│   ├── primitives/            # unstyled UI primitives (Button, Input)
│   │   └── src/*.tsx
│   ├── form/                  # reactive form library (useForm, bind directive)
│   │   └── src/
│   │       ├── mod.ts         # public API barrel
│   │       ├── form.ts        # useForm hook
│   │       ├── input/         # bind directive, Binder/Binding types, InputAttrs
│   │       ├── errors/        # FormErrors type, hasErrors, initErrors
│   │       ├── resolver/      # Resolver interface for schema validation
│   │       └── *.test.ts      # tests colocated with source
│   └── bloom/                 # component composition layer (WIP)
└── apps/
    └── docs/                  # SolidStart documentation app
```

## Code Style

### TypeScript

- Use `type` keyword for type aliases, not `interface` (e.g.
  `type Props = { ... }`)
- Use `.ts` for logic, `.tsx` for JSX components
- File extensions are always explicit in imports (`.ts`, `.tsx`)
- Prefer `unknown` over `any`; when `any` is unavoidable, add
  `// deno-lint-ignore no-explicit-any`
- Use JSDoc comments with `@example` blocks on public APIs; use `{@linkcode X}`
  for cross-references
- **JSDoc `@example` code blocks must NOT contain JSX comments** (`{/* ... */}`)
  — they break JSDoc parsing. Use `...` as placeholder for nested content.
- No unnecessary comments — comments should be meaningful

### Imports

- Use bare specifiers mapped in `deno.json` imports (e.g. `"solid-js"`, not
  URLs)
- Use `jsr:` for Deno std library (e.g. `jsr:@std/assert`)
- Use `npm:` specifiers in `deno.json` import maps
- Relative imports with explicit extensions: `"./utils.ts"`, `"./input/mod.ts"`
- Import types with `import type` when only used at type level

### Naming

- **Files:** lowercase, kebab-case (e.g. `mod.ts`, `mod.test.ts`,
  `tree-view-root.tsx`)
- **Types:** PascalCase (e.g. `FormErrors`, `BindingAria`, `InputAttrs`)
- **Functions:** camelCase (e.g. `useForm`, `hasErrors`, `initErrors`)
- **Components:** PascalCase function names, prefixed with primitive name (e.g.
  `TreeViewRoot`, `TreeViewBranchControl`, `ButtonRoot`). NEVER export a
  component named just `Root`, `Text`, `Control`, etc. — always prefix.
- **Constants:** camelCase for local, UPPER_CASE only for true global constants
- **Barrel files:** always named `mod.ts` (Deno convention)

### Module Patterns

- Each subdirectory exports through `mod.ts` (or `mod.tsx` for JSX)
- **`mod.tsx` is ALWAYS a barrel file.** It imports individual components,
  re-exports them, and assembles compound objects via `Object.assign`. It
  contains NO component logic.
- **One component per file.** Never put multiple components in a single file
  (except for the barrel `mod.tsx`).
- **File placement decision tree:**
  - Compound with NO sub-parts → `<primitive>-<compound>.tsx` at the primitive
    root (e.g. `tree-view-root.tsx`, `tree-view-label.tsx`)
  - Compound WITH sub-parts → `<primitive>-<compound>/` folder with one file per
    sub-part (e.g. `tree-view-branch/tree-view-branch-root.tsx`,
    `tree-view-branch/tree-view-branch-control.tsx`)
- **Props types live in the SAME file as their component.** Never create a
  separate file just for a single component's props. Exception: shared utility
  types used across multiple primitives (e.g. `PolymorphicProps`) get their own
  file (e.g. `polymorphic.tsx`) and re-export from `mod.tsx`.
- **Public API re-exported from package-level `mod.ts`**
- `deno.json` `"exports"` field defines the package's public entry points
- Test files are colocated: `foo.ts` → `foo.test.ts` or `mod.ts` → `mod.test.ts`
- Files excluded from publish via `"publish.exclude"` in `deno.json`

#### Example directory structure

```
tree-view/
├── mod.tsx                           # barrel + compound assembly
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

- Use `Deno.test()` with descriptive names: `"category - specific behavior"`
- Use `jsr:@std/assert` for assertions (`assertEquals`, etc.)
- Use `@solidjs/testing-library` with `happy-dom` for component/hook tests
- Set up DOM globals in test files (`Window`, `document`, `navigator`, etc.)
- Call `cleanup()` after each test
- Test files use `/// <reference lib="deno.ns" />` at the top

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

Packages are published to JSR. The `"publish"` field in each `deno.json`
controls included/excluded files. Tests and internal-only files (like `jsx.ts`)
are excluded.

## Workspace Dependencies

- Inter-package deps use `"workspace:@transitionsag/package@^version"` in import
  maps
- The root `deno.json` defines shared deps (e.g. `solid-js`) inherited by all
  packages
