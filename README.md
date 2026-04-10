# 🌱 Seeds

A SolidJS UI toolkit monorepo — headless primitives, an opinionated component
library, and a type-safe form system, grown from the same soil.

## Packages

### [@seeds/primitives](./packages/primitives)

Unstyled, accessible base components built on [ZAG.js](https://zagjs.com/) state
machines. Polymorphic button, typed inputs, and more — no visual opinions, just
behavior.

### [@seeds/bloom](./packages/bloom)

An opinionated component library that wraps primitives with a design system.
Spacing, colors, and visual language included.

### [@seeds/form](./packages/form)

Lightweight, type-safe form state management. A `useForm<T>()` hook and
`use:bind` directive with deep nested field support powered by `solid-js/store`.

## Apps

### [@seeds/docs](./apps/docs)

Documentation and showcase site built with
[SolidStart](https://start.solidjs.com/).

## Development

```sh
deno install
```

Run the docs site:

```sh
deno task --filter @seeds/docs dev
```
