# vite-react-boilerplate

Vercel's [Vite - React](https://github.com/vercel/examples/tree/main/framework-boilerplates/vite-react)
template — create-vite's React and TypeScript welcome page, with the Vite and
React logos, its counter and its HMR hint — on Vite 5 and React 18 as the
template has them, running on **Cloudflare Workers + Static Assets**, deployed by
[Orun](https://github.com/sourceplane/orun) to stage and prod on every merge.
Packaging it as an Orun baseline is the next milestone (VR2).

Vite builds fully static: `tsc -b && vite build` writes the app's shell, its
hashed JavaScript bundle and stylesheet and the React logo under `assets/`,
and the Vite logo, to `dist`. That folder is uploaded as Workers Static Assets
with one small Worker in front, and the app is served as a single-page app:
every page address is answered with the app, and a missing file is a 404. The
welcome page, its styles and its entry do not change; the app's name moves
into one module, which the page's heading and the tab's title read, and the
template, which ships no tests, gains a Vitest spec of the page as it
behaves. See [`specs/epics/vite-react-boilerplate`](specs/epics/vite-react-boilerplate/README.md)
for the design, the milestones and the as-built status.

## What is here (the app)

| Surface | Where |
|---|---|
| The app's name, which the heading and the tab's title read | `apps/web/src/site.ts` |
| The welcome page (the template's, but for the heading reading the name), its styles | `apps/web/src/App.tsx`, `apps/web/src/App.css`, `apps/web/src/index.css` |
| The entry and the shell | `apps/web/src/main.tsx`, `apps/web/index.html` |
| The logos | `apps/web/public/vite.svg`, `apps/web/src/assets/react.svg` |
| The build: the React plugin and the title writer; the TypeScript projects | `apps/web/vite.config.ts`, `apps/web/tsconfig*.json` |
| The app's spec (new: the template ships none) | `apps/web/src/App.test.tsx` (Vitest, jsdom), `apps/web/vitest.config.ts` |
| The Worker in front of the assets, its config, deploy contract | `apps/web/worker/index.ts`, `apps/web/wrangler.jsonc`, `apps/web/component.yaml` |
| Tests (the name seam, the build config, the Worker's routing, the template's page) | `tests/web` (vitest) |

## Getting started

```bash
pnpm install
pnpm typecheck        # tsc -b: the app, the Vite configs and the Worker
pnpm lint             # eslint (the template's config)
pnpm test             # vitest: the app's spec and tests/web
pnpm build            # tsc -b && vite build → apps/web/dist
```

```bash
pnpm --filter @app/web dev        # vite on http://localhost:3000, with HMR
pnpm --filter @app/web preview    # wrangler dev over the built app and its Worker
```

## How it maps to Vercel

| Vercel | Here |
|---|---|
| Static output on Vercel's CDN, from its Vite framework preset | Workers Static Assets: `dist` uploaded with the Worker `<repo>-web-<env>` (`apps/web/wrangler.jsonc`) |
| The template's build (`tsc -b && vite build`) | The same command, through turbo, on the template's Vite 5 and React 18 (they build on the runners' Node 22, so nothing moves) |
| No tests | `apps/web/src/App.test.tsx`: the page rendered in jsdom by Vitest with the app's own Vite config — its heading, its logo links, its counter |
| A page address other than `/` answered by the host (the template sets no rewrite) | Every page address is the app's: a browser's navigation that matches no file gets `index.html` (`not_found_handling: single-page-application`), and the Worker hands any other page request back to the assets, so a router the app adds owns every route |
| The host's 404 for a missing file | The Worker answers 404 when the path names a file (`/missing.js`), so a stale script reference fails as a 404, not as HTML parsed as JavaScript |
| The tab's title, written in `index.html` | The site's name, written into `index.html` by `vite.config.ts` from `apps/web/src/site.ts` |
| Deploy on push | Orun deploys `<repo>-web-{stage,prod}` on merge to `main` (`apps/web/component.yaml`) |
| "Deploy with Vercel" (clone the template) | `orun new --blueprint repo-blueprint.yaml` — a new repository, branded, deployed |

## CI

| Workflow | What it runs | Ships to an app |
|---|---|---|
| `ci.yml` | the Orun pipeline, and the only workflow an app carries: `orun plan --changed`, then one job per lane. A pull request runs the verify lanes (the app built and dry-deployed per environment; the tests' `quick-check` lane installs and checks the package, it does not run them), except the bootstrap's own landings (`orun/BASE-*`), where `plan` alone is the check; a merge deploys stage → prod. It plans nothing while `intent.yaml` names the placeholder workspace `ws_CHANGE_ME`, as this repository does. A manual run (Orunbase's Deploy button, or Run workflow on `main`) plans the environment and components it names under the push-to-main trigger, so they deploy as a merge deploys them | yes |

## Credits

The app is Vercel's Vite and React example
([vercel/examples](https://github.com/vercel/examples),
`framework-boilerplates/vite-react`, © 2023 Vercel, MIT — `apps/web/LICENSE.md`),
itself create-vite's React and TypeScript template, at vercel/examples `de86723`.
