import { describe, expect, it } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

// The template's own page, ported as it was: create-vite's React + TypeScript
// welcome page (src/App.tsx, the template's but for the heading reading the
// site's name), its shell (index.html), its entry and its stylesheets.
const appDir = path.resolve(__dirname, "../../../apps/web");
const read = (rel: string) => fs.readFileSync(path.join(appDir, rel), "utf8");
const app = read("src/App.tsx");

describe("the welcome page (apps/web/src/App.tsx)", () => {
  it("links the template's two logos to their docs", () => {
    const links = [...app.matchAll(/<a href="([^"]+)" target="_blank">/g)].map((m) => m[1]);
    expect(links).toEqual(["https://vitejs.dev", "https://react.dev"]);
    expect(app).toContain('<img src={viteLogo} className="logo" alt="Vite logo" />');
    expect(app).toContain('<img src={reactLogo} className="logo react" alt="React logo" />');
  });

  it("keeps the counter, the HMR hint and the docs line", () => {
    expect(app).toContain("const [count, setCount] = useState(0)");
    expect(app).toContain("<button onClick={() => setCount((count) => count + 1)}>");
    expect(app).toContain("count is {count}");
    expect(app).toContain("Edit <code>src/App.tsx</code> and save to test HMR");
    expect(app).toContain("Click on the Vite and React logos to learn more");
  });

  it("imports the template's logos and stylesheet", () => {
    expect(app).toContain("import reactLogo from './assets/react.svg'");
    expect(app).toContain("import viteLogo from '/vite.svg'");
    expect(app).toContain("import './App.css'");
    expect(fs.existsSync(path.join(appDir, "src/assets/react.svg"))).toBe(true);
    expect(fs.existsSync(path.join(appDir, "public/vite.svg"))).toBe(true);
  });
});

describe("the shell (apps/web/index.html) and the entry (src/main.tsx)", () => {
  it("is the template's: its favicon, viewport, root and module script", () => {
    const shell = read("index.html");
    expect(shell).toContain('<link rel="icon" type="image/svg+xml" href="/vite.svg" />');
    expect(shell).toContain('<meta name="viewport" content="width=device-width, initial-scale=1.0" />');
    expect(shell).toContain('<div id="root"></div>');
    expect(shell).toContain('<script type="module" src="/src/main.tsx"></script>');
  });

  it("mounts the app in StrictMode", () => {
    const main = read("src/main.tsx");
    expect(main).toContain("createRoot(document.getElementById('root')!).render(");
    expect(main).toContain("<StrictMode>");
    expect(main).toContain("import './index.css'");
  });
});

describe("the licence", () => {
  it("is the template's MIT licence, © Vercel", () => {
    const licence = read("LICENSE.md");
    expect(licence).toContain("The MIT License (MIT)");
    expect(licence).toContain("Copyright (c) 2023 Vercel, Inc.");
  });
});
