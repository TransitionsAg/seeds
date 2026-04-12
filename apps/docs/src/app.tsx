import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type JSX, Suspense } from "solid-js";
import { A } from "@solidjs/router";
import { Button } from "@transitionsag/bloom";
import { GithubLogoIcon } from "@transitionsag/phosphor-solid/github-logo";
import "./styles.css";

export default function App(): JSX.Element {
  return (
    <Router
      base={import.meta.env.SERVER_BASE_URL || undefined}
      root={(props) => (
        <div class="min-h-screen flex flex-col">
          <header class="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <div class="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
              <A href="/" class="flex items-center gap-2">
                <span class="text-2xl">🌱</span>
                <span class="typo-h4">Seeds</span>
              </A>
              <nav class="flex items-center gap-3">
                <Button as={A} href="/doc/primitives" intent="link" size="fit">
                  🌱 Primitives
                </Button>
                <Button as={A} href="/doc/form" intent="link" size="fit">
                  📋 Form
                </Button>
                <Button as={A} href="/doc/bloom" intent="link" size="fit">
                  🌸 Bloom
                </Button>
                <Button
                  as="a"
                  href="https://github.com/TransitionsAg/seeds"
                  target="_blank"
                  rel="noopener noreferrer"
                  intent="secondary"
                  size="sm"
                >
                  <GithubLogoIcon weight="bold" class="size-4 pr-2" />
                  GitHub
                </Button>
              </nav>
            </div>
          </header>
          <Suspense>{props.children}</Suspense>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
