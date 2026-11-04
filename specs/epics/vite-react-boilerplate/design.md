# vite-react-boilerplate — design

## The template

Vercel's Vite and React example (`framework-boilerplates/vite-react` in
[vercel/examples](https://github.com/vercel/examples)) is create-vite's React
and TypeScript template: `index.html` loading `src/main.tsx`, which mounts
`App` in StrictMode; `App.tsx` with the Vite and React logos linking to
their docs, the "Vite + React" heading, a counter button ("count is N") and
the HMR hint, styled by `App.css` and `index.css`; Vite 5 with
`@vitejs/plugin-react`, React 18, TypeScript 5 in two project references
(`tsconfig.app.json`, `tsconfig.node.json`) and an ESLint 9 flat config with
the React hooks and refresh plugins. Its build is `tsc -b && vite build`,
writing `dist`. It ships no tests. Vercel builds it with its Vite framework
preset and serves `dist` statically.

## The template as it is

The template's own versions build and run on the runners' Node 22 (spike:
Vite 5.4.21, `tsc -b && vite build` in under a second, the page served by
`wrangler dev`). So nothing moves: Vite 5, React 18, TypeScript 5, ESLint 9
and the template's tsconfigs and lint config stay as they are. The one
addition to the TypeScript projects is a third reference,
`tsconfig.worker.json`, for the Worker in front of the assets, so `tsc -b`
checks it with the rest.

## How it maps to Cloudflare

| Vercel | Here | Why |
|---|---|---|
| Static output on Vercel's CDN | `dist` as Workers Static Assets, uploaded with `<repo>-web-<env>` | The app is static; the assets are the app |
| — | One Worker, `apps/web/worker/index.ts` | The `cloudflare-workers-assets-turbo` composition deploys a Worker with its assets; it answers what the assets leave |
| A page address other than `/`: the host's (no rewrite in the template) | `not_found_handling: single-page-application`: a browser's navigation that matches no file gets `index.html` | The app renders in the browser; a route a client-side router adds must work on a deep link and a reload |
| A missing file: the host's 404 | The Worker answers 404 when the path's last segment names a file, and hands any other page request back to the assets (which answer `index.html`) | Only requests the assets did not answer reach it: a non-navigation miss. The assets binding applies the same fallback, so forwarding a `/missing.js` would answer HTML with a 200 |
| No tests | A Vitest spec of the page (`src/App.test.tsx`) in jsdom, with the app's own Vite config | The page's behaviour is what a change must keep |

## Every page is the app's

A request reaches Workers Static Assets first. A file is served as it is
(the bundle and stylesheet carry content hashes). A browser's navigation
that matches no file (`Sec-Fetch-Mode: navigate`) is answered with
`index.html` and a 200. Everything else that matches no file reaches the
Worker, and the Worker decides by the path: a last segment with an extension
(`/missing.js`, `/assets/logo.png`) is a missing file and gets a plain-text
404; any other path is a page asked for without a browser's headers (a link
preview, curl) and is handed back to the assets, which answer `index.html`.
A browser that navigates to `/missing.js` still gets the app: the assets
answer navigations before the Worker sees them. The rule is one function,
`namesAFile`, angular-boilerplate's, tested in
`tests/web/src/worker.test.ts` and read over HTTP by the e2e tier.

## The name seam

The template spells its name twice: the heading ("Vite + React") and the
tab's title ("Vite + React + TS"). Both now read one literal, `SITE_NAME` in
`apps/web/src/site.ts` — the heading through an import, the title through a
small plugin in `vite.config.ts` that writes it, HTML-escaped, into
`index.html`'s `__SITE_NAME__` placeholder in dev and at build. Its default is
the heading's "Vite + React", so the tab's title loses the template's
" + TS" (risk VR-D): a product's name stands alone in its tab.

## The repository

angular-boilerplate's shape, the same static single-page app behind one
Worker: `apps/web` (the app, its Vite configs, the Worker, the deploy
contract), `tests/web` (vitest), the shared TypeScript and ESLint
configuration, the wrangler renderer, `ci.yml` byte for byte
angular-boilerplate's (turso-starter's but for one comment). The rename
engine is astro-boilerplate's: the same `<framework>-boilerplate` slug,
which no framework module spells, so nothing of Vite's or React's needs
masking; the seam is `SITE_NAME` in `apps/web/src/site.ts`.

## The alternative rejected

**Server rendering** (Vite's SSR, or a React framework on a Worker). The
template has no server code; adding a server build would change what the
template is and put a Worker's render in front of a page that renders in the
browser. A static build behind the assets is the template as Vercel serves
it.
