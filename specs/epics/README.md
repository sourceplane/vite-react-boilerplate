# Epics

Orun-style work programs. Each epic is a folder carrying `epic.yaml` (the
declaration the platform reads: slug, key prefix, milestones with exit
criteria and task keys) beside its doc set. The pull request that adds the
folder is the adoption; the merge creates the epic in the workspace.

| Epic | Cluster | Status | What it is |
|------|---------|--------|------------|
| [`vite-react-boilerplate/`](./vite-react-boilerplate/) | **VR** | In progress (VR1: the site on Workers) | Vercel's Vite - React template — create-vite's React and TypeScript welcome page, on its Vite 5 and React 18 — built static and served as Cloudflare Workers Static Assets behind one Worker as a single-page app, and an Orun baseline that instantiates it (VR2) |

As-built ≠ intent: what shipped lives in each epic's `IMPLEMENTATION-STATUS.md`.
