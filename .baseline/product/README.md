# vite-react-boilerplate

A Vite and React app — create-vite's React and TypeScript welcome page, with
the Vite and React logos and its counter — built with
[Vite](https://vitejs.dev) and [React](https://react.dev), fully static, and
served as **Cloudflare Workers + Static Assets** behind one small Worker, as
a single-page app.

## Live deployment

<!-- 03-docs:begin -->
Not recorded yet. The bootstrap's last phase writes the live URLs, the
workspace and the secrets the app uses into
[ai/context/deployment.md](ai/context/deployment.md); how the app deploys
and how to operate it is in
[ai/context/operations.md](ai/context/operations.md).
<!-- 03-docs:end -->

## What is here

| Surface | Where |
|---|---|
| The app's name, which the heading and the tab's title read | `apps/web/src/site.ts` |
| The welcome page and its styles | `apps/web/src/App.tsx`, `apps/web/src/App.css`, `apps/web/src/index.css` |
| The entry and the page shell | `apps/web/src/main.tsx`, `apps/web/index.html` |
| Images imported by the app, and files served as they are | `apps/web/src/assets`, `apps/web/public` |
| The build (Vite and its React plugin) and the TypeScript projects | `apps/web/vite.config.ts`, `apps/web/tsconfig*.json` |
| The app's spec | `apps/web/src/App.test.tsx` (Vitest, jsdom) |
| The Worker in front of the static files, and the deploy contract | `apps/web/worker/index.ts`, `apps/web/wrangler.jsonc`, `apps/web/component.yaml` |
| Tests of the build, the Worker and the page | `tests/web` (vitest) |

## Getting started

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test             # vitest: the app's spec and the tests suite
pnpm build            # tsc -b && vite build → apps/web/dist
```

```bash
pnpm --filter @app/web dev        # vite on http://localhost:3000, with hot module replacement
pnpm --filter @app/web preview    # wrangler dev over the built app, as the Worker serves it
```

Add pages with a client-side router (React Router, TanStack Router): every
page address is answered with the app, so a route you add works on a deep
link and a reload without any server change. A path that names a file the
build did not write (`/missing.js`) is a 404. Make the app yours in
`apps/web/src/` (the welcome page is create-vite's placeholder: replace
`App.tsx` to start) and `apps/web/src/site.ts` (its name).

## How it deploys

Merges to `main` converge through [Orun](https://github.com/sourceplane/orun):
`.github/workflows/ci.yml` plans the changed components and runs each lane
against the workspace in `intent.yaml`. The app deploys to `stage`, then to
`prod` once stage has converged on the same commit; `dev` only verifies. The
Worker is `vite-react-boilerplate-web-<env>` on your account's workers.dev
subdomain, and every deploy is smoke-tested over HTTP: the home page must be
the app's shell, the bundle it loads must be served with the welcome page
in it, a deep link must answer with the app, and a missing file must be
a 404. A pull request runs the same pipeline's verify lanes: the app built
and dry-deployed for each environment, with nothing deployed. They do not
lint or run the tests, so run `pnpm typecheck`, `pnpm lint` and `pnpm test`
before you push. (A push to `main` builds, deploys and smoke-tests.)

The pipeline holds one credential, GitHub's own `GITHUB_TOKEN`. The
Cloudflare token and account id are brokered per run from the workspace's
Cloudflare connection; nothing provider-shaped is stored in the repository
or in GitHub.

**Deploy by hand.** Orunbase's **Deploy** button on a component, or **Run
workflow** on the CI workflow in GitHub's Actions tab (on `main`), runs
`ci.yml` for the environment and components you pick, and each one deploys
exactly as a merge would deploy it. Leave the component blank to redeploy
every component in that environment, with nothing changed: after rotating a
secret, say. A component with nothing to run in that environment (a test
suite in `prod`) is left out with a notice.

## Custom domain

The app answers on workers.dev from its first deploy. To serve it on your
own domain:

1. Add the domain to the Cloudflare account the app deploys into, and attach
   it to the Worker (dashboard → Workers & Pages →
   `vite-react-boilerplate-web-prod` → Settings → Domains & Routes → Add →
   Custom domain). Do the same for stage with a subdomain if you want one.
2. Record the environment's public origin in `intent.yaml`. The app writes
   no absolute URL, so the build does not change; the deployment record
   probes the domain beside the workers.dev URL:

   ```yaml
   environments:
     prod:
       env:
         SITE_URL: https://vite-react-boilerplate.example.com
   ```

   The app was born with the reserved placeholder
   `vite-react-boilerplate.example.com` where its domain goes: that example,
   and `BASE_DOMAIN` under each environment (dev, stage and prod) in
   `intent.yaml`. Replace it with your domain in the same change.

## Credits

The app is Vercel's Vite and React example
([vercel/examples](https://github.com/vercel/examples),
`framework-boilerplates/vite-react`, © 2023 Vercel, MIT-licensed —
`apps/web/LICENSE.md`), itself create-vite's React and TypeScript template.
Its welcome page links Vite's and React's documentation; replace it with your
own app as you make it yours.
