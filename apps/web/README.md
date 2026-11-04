# apps/web — the Vite and React app

A [Vite](https://vitejs.dev) 5 and [React](https://react.dev) 18 app —
create-vite's React and TypeScript welcome page, as Vercel's Vite - React
example (MIT, `LICENSE.md`) ships it — built fully static by Vite and served
as Cloudflare Workers + Static Assets, as a single-page app:

- the welcome page in `src/App.tsx` — the Vite and React logos linking to
  their docs, the heading, the counter button and the HMR hint — with its
  styles in `src/App.css` and `src/index.css`
- the entry, `src/main.tsx`, mounting the app in StrictMode into
  `index.html`'s root element
- a spec of the page (`src/App.test.tsx`: the heading, the logo links, the
  counter), run by Vitest in jsdom with the app's own Vite config — the
  template ships none

The app's name is in `src/site.ts`; the page's heading reads it, and
`vite.config.ts` writes it into `index.html` as the tab's title.

`worker/index.ts` sits in front of the static build: the assets answer every
file and every browser navigation (`not_found_handling:
"single-page-application"` in `wrangler.jsonc`), and the Worker answers what
is left — a 404 for a path that names a missing file, the app for any other
page.

```bash
pnpm dev        # vite on http://localhost:3000, with HMR
pnpm build      # tsc -b && vite build → dist
pnpm test       # vitest: the page's spec, once, in jsdom
pnpm preview    # wrangler dev over the built app, behind worker/index.ts
```

How it is deployed — per environment, on merge to `main` — is the
repository's README and `component.yaml` beside this file.
