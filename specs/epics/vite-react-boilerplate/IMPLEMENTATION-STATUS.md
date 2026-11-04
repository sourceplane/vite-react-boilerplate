# vite-react-boilerplate — implementation status

| Milestone | State | Landed |
|---|---|---|
| VR0 — the spec | ✅ | the repository's first commit and VR-1 |
| VR1 — the app on Workers | ✅ | VR-2 |
| VR2 — a baseline | planned | VR-3 |

## Departures from the upstream template

Everything not listed here is the template as it is in vercel/examples at
`de86723` (`framework-boilerplates/vite-react`).

| # | What | Why |
|---|---|---|
| 1 | `src/site.ts` holds the app's name (`SITE_NAME = "Vite + React"`, the template's heading); `App.tsx`'s heading reads it, and `vite.config.ts` gains a plugin (`site-name`) that writes it, HTML-escaped, into `index.html`'s title (`__SITE_NAME__`, upstream `Vite + React + TS`) | One rename seam, for both places the template spells its name |
| 2 | A spec of the page, `src/App.test.tsx` (Vitest 3, jsdom, `@testing-library/react`): the heading, the logo links, the counter, the HMR hint; `vitest.config.ts` merges the app's Vite config; the package gains a `test` script | The template ships no tests |
| 3 | `wrangler.jsonc` names the Worker `<repo>-web`, with `main: ./worker/index.ts`, the `ASSETS` binding over `dist` and `not_found_handling: single-page-application`; `worker/index.ts` (angular-boilerplate's) answers 404 for a path that names a file; `tsconfig.worker.json` checks it, as a third reference in `tsconfig.json`; `tsconfig.node.json` also checks `vitest.config.ts` | The composition deploys a Worker with its assets; the app owns every page address, a missing file is not a page |
| 4 | The package scripts keep the template's `build`, `lint` and `preview` (now `wrangler dev` over the build, not `vite preview`) and add `dev` on port 3000, `test` and `typecheck` (`tsc -b`); the package is `@app/web` and adds `wrangler` and the test libraries as devDependencies | The workspace's `dev` / `typecheck` / `lint` / `test` / `build` contract |
| 5 | The ESLint config ignores `.wrangler` beside `dist` | wrangler dev's local state is not source |
| 6 | Tests: `tests/web` (vitest) — the name seam and the title writer, the build config, the Worker's routing (`namesAFile`, 404 vs. the app), the template's page, the licence | The template ships none |
| 7 | `dist/` and `*.tsbuildinfo` (written by `tsc -b`) are ignored by git, the blueprint and the leak gate | What a build generates is a build's, not the app's |
| 8 | The template's README is replaced by `apps/web/README.md` (the app) and the repository's README; its "Deploy with Vercel" button maps to `orun new` | The repository's own documentation |
