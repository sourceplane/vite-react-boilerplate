# vite-react-boilerplate — Vercel's Vite - React template on Cloudflare Workers

**Vite builds fully static, so the port is where it is served — `dist` as
Cloudflare Workers Static Assets behind one small Worker, every page address
answered by the app and a missing file a 404, deployed by Orun to stage and
prod on every merge — on the template's own Vite 5 and React 18, with the
app's name in one module and a spec of the page the template never had; and
then the baseline that makes a copy of it somebody else's app in one
landing.**

| | |
|---|---|
| Status | ✅ Shipped (`baseline-v1`) — proven offline in Baseline CI; not yet live (risk VR-A) |
| Upstream | [vercel/examples](https://github.com/vercel/examples) `framework-boilerplates/vite-react` (MIT), at `de86723` (2026-10-16; the folder last changed in `76ab21c`, 2025-01-13): create-vite's React and TypeScript template |
| Reference | [angular-boilerplate](https://github.com/sourceplane/angular-boilerplate) — the same static single-page app behind one Worker, the same 404 rule, its tests and its bootstrap; [astro-boilerplate](https://github.com/sourceplane/astro-boilerplate) — the same `<framework>-boilerplate` identity and rename rules |
| Key | `VR` |

## Read in this order

1. [design.md](design.md) — the template, why its versions stay, how each
   Vercel piece maps to Cloudflare, the single-page-app routing and the
   Worker's 404 rule, the name seam, the repository, and the alternative
   rejected.
2. [implementation-plan.md](implementation-plan.md) — the milestones and
   what each one lands.
3. [risks-and-open-questions.md](risks-and-open-questions.md) — what is not
   proven, and what was accepted.
4. [IMPLEMENTATION-STATUS.md](IMPLEMENTATION-STATUS.md) — what shipped, and
   every departure from the upstream template.

## Milestones

| Milestone | What it lands | Task |
|---|---|---|
| VR0 — the spec | the repository, its intent, CI, tooling and spec index; this doc set | VR-1 |
| VR1 — the app on Workers | the template in `apps/web`, built static, served as assets behind one Worker as a single-page app, with its spec and tests | VR-2 |
| VR2 — a baseline | the console card, the build document, the context pack and the baseline's tests | VR-3 |
