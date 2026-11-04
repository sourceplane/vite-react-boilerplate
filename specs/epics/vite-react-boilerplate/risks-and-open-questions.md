# vite-react-boilerplate — risks and open questions

| ID | Risk | State | Notes |
|---|---|---|---|
| VR-A | `baseline-v1` is not yet proven live | OPEN | Proven offline in Baseline CI: the offline bootstrap with the blueprint's own hooks, the stage lane's own steps in a staged job tree, the app served by `wrangler dev` and smoke-tested with the component's own command, every route read. A console bootstrap closes it |
| VR-B | The Worker's 404 rule reads the path | ACCEPTED | A page route whose last segment has a dot (`/v1.2`) asked for without a browser's navigation headers would be a 404; a browser's navigation to it is still the app. `namesAFile` is the one place to change it |
| VR-C | The template's Vite 5 and React 18, not current majors | ACCEPTED | They build and run on Node 22 (spike: `~/orunbase/spikes/vite-react-boilerplate.md`). Moving to Vite 7 or React 19 is the owner's change, and the page's spec and the e2e tier would catch a behaviour it breaks |
| VR-D | The tab's title is the site's name | ACCEPTED | The template's title is "Vite + React + TS"; the seam's default is the heading's "Vite + React", and the title reads it, so a product's tab carries its own name and nothing else |
| VR-E | stack-tectonic 0.19.0, not 0.20.0 | ACCEPTED | 0.20.0's lane-shared install links each job's `node_modules` out of its tree; the siblings pin 0.19.0 for it and the app would save nothing |
