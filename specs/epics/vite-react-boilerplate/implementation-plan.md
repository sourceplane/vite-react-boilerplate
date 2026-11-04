# vite-react-boilerplate — implementation plan

Three milestones, each one reviewed pull request (VR0 follows the
repository's first commit), each green before it merges.

## VR0 — the spec (VR-1)

The repository is born: `intent.yaml` with the placeholder workspace
`ws_CHANGE_ME`, `ci.yml` (byte for byte angular-boilerplate's,
turso-starter's but for one comment, which plans nothing until the workspace
is set), the shared TypeScript and ESLint configuration, the spec index, this
doc set and the task contracts.

## VR1 — the app on Workers (VR-2)

- The template in `apps/web` as it is: `index.html`, `src/main.tsx`,
  `src/App.tsx`, its styles and logos, `vite.config.ts`, the tsconfigs and
  the ESLint config; `src/site.ts`, the name seam, read by the heading and
  written into the title by `vite.config.ts`.
- `worker/index.ts`, `tsconfig.worker.json` and `wrangler.jsonc`: the Worker
  in front of `dist`, single-page-app routing, the 404 rule for file paths.
- `component.yaml`: the deploy contract and its smoke over the shell, the
  bundle, a deep link and a missing file.
- The page's spec (`src/App.test.tsx`, Vitest in jsdom). Tests
  (`tests/web`): the name seam and the title writer, the build config, the
  Worker's routing, the template's page, the licence.
- The README's "How it maps to Vercel".

## VR2 — a baseline (VR-3)

angular-boilerplate's machinery, renamed: `blueprint.yaml`,
`repo-blueprint.yaml`, `.baseline/` (identity, product README, task
contracts), `tooling/rebrand` (astro-boilerplate's engine and rules, the
seam at `apps/web/src/site.ts`), `tooling/bootstrap`,
`hooks/render-deployment-docs.sh` (probing `/`, a deep link and each
`SITE_URL`), `docs/phases/`, the context pack, `testing/` (the leak and
placement gates on this tree's files, placement also failing on the
template's name left in the app or a framework module renamed; the e2e tier
building the app in the stage lane's staged tree and reading every route it
promises) and `baseline.yml` / `tag.yml`.
