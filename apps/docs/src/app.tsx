import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type JSX, Suspense } from "solid-js";
import { A } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import { Branding, Button } from "@transitionsag/bloom";
import { GithubLogoIcon } from "@transitionsag/phosphor-solid/github-logo";
import { FacehashProvider } from "@transitionsag/facehash-solid";
import "./styles.css";

export default function App(): JSX.Element {
  return (
    <Router
      base={import.meta.env.SERVER_BASE_URL || undefined}
      root={(props) => (
        <MetaProvider>
          <Branding>
            <FacehashProvider
              value={{
                animations: {
                  intensity: "dramatic",
                  interactive: true,
                  blinking: true,
                },
              }}
            >
              <div class="min-h-screen flex flex-col bg-background text-foreground">
                <header class="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
                  <div class="max-w-[1400px] mx-auto px-6 sm:px-8 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <A href="/" class="flex items-center gap-3" aria-label="Seeds home">
                      <span class="size-3 rounded-full bg-primary shadow-[0_0_20px_rgba(39,99,235,0.35)]" />
                      <span class="typo-h4 tracking-tight">Seeds</span>
                    </A>
                    <nav class="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Primary">
                      <Button as={A} href="/doc/primitives" intent="link" size="fit">
                        Primitives
                      </Button>
                      <Button as={A} href="/doc/form" intent="link" size="fit">
                        Form
                      </Button>
                      <Button as={A} href="/doc/bloom" intent="link" size="fit">
                        Bloom
                      </Button>
                      <Button
                        as="a"
                        href="https://github.com/TransitionsAg/seeds"
                        target="_blank"
                        rel="noopener noreferrer"
                        intent="secondary"
                        size="sm"
                      >
                        <GithubLogoIcon weight="bold" class="size-6 pr-2" />
                        GitHub
                      </Button>
                    </nav>
                  </div>
                </header>
                <Suspense>{props.children}</Suspense>
              </div>
            </FacehashProvider>
          </Branding>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
