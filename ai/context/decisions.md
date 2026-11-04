# vite-react-boilerplate — decisions

The choices that shape this repository, one line each, with where the full
reasoning lives. Superseded decisions stay listed, marked, so the history
reads in order.

| # | Decision | Why | Source |
|---|---|---|---|
| 1 | A static build served as Workers Static Assets behind one Worker; no adapter, no server rendering | The template renders in the browser; nothing renders at request time | design.md, "The alternative rejected" |
| 2 | The template's Vite 5 and React 18, not current majors | They build and run on Node 22 (the runners' Node); a bump would be a change of the template, not a port | design.md, "The template as it is"; risk VR-C |
| 3 | A Vitest spec of the page (`apps/web/src/App.test.tsx`, jsdom, the app's own Vite config) | The template ships no tests; the page's behaviour (heading, logo links, counter) is what a change must keep | IMPLEMENTATION-STATUS, departure 2 |
| 4 | Single-page-app routing (`not_found_handling: single-page-application`), and the Worker answers 404 for a path that names a file | Every page address is the app's; a missing script must not be answered with HTML | design.md, "Every page is the app's"; risk VR-B |
| 5 | The app's name is one seam, `apps/web/src/site.ts`; the heading reads it and `vite.config.ts` writes it as the tab's title | One place a product's identity is written | IMPLEMENTATION-STATUS, departure 1; risk VR-D |
| 6 | No infra root: the app binds nothing | Nothing to provision; `infra/` and `packages/` stay as empty discovery roots | README |
| 7 | One landing (`01-product`) then the record (`03-docs`); each bootstrap pull request checked in the box | A landing has a fixed cost; the convergence on main builds, deploys and smoke-tests the app for real (docusaurus, angular-boilerplate) | `repo-blueprint.yaml` |
| 8 | stack-tectonic 0.19.0, not 0.20.0 | The siblings' pin; 0.20.0's lane-shared install is a layout this build has not been verified in | risk VR-E |
| 9 | Component docs are generated from the manifests and checked in CI | A hand-written copy of the component's facts drifts silently | `tooling/catalog/gen-component-docs.py` |
