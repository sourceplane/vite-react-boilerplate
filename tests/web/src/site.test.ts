import { describe, expect, it } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

const appDir = path.resolve(__dirname, "../../../apps/web");
const read = (rel: string) => fs.readFileSync(path.join(appDir, rel), "utf8");

describe("site identity (apps/web/src/site.ts)", () => {
  it("names the site", async () => {
    const { SITE_NAME } = await import("@/src/site");
    expect(SITE_NAME.trim()).not.toBe("");
  });

  it("is a literal the rename seam can find", () => {
    expect(read("src/site.ts")).toMatch(/^export const SITE_NAME = "[^"]+";$/m);
  });

  it("is the one place the page's heading and the tab's title take their name from", () => {
    const app = read("src/App.tsx");
    expect(app).toContain("import { SITE_NAME } from './site'");
    expect(app).toContain("<h1>{SITE_NAME}</h1>");
    expect(read("vite.config.ts")).toContain("import { SITE_NAME } from './src/site'");
    expect(read("index.html")).toContain("<title>__SITE_NAME__</title>");
    // Nothing else in the app spells a name of its own.
    for (const file of ["src/App.tsx", "src/main.tsx", "index.html", "vite.config.ts", "worker/index.ts"]) {
      expect(read(file)).not.toContain("Vite + React");
    }
  });
});

describe("the build (apps/web/vite.config.ts)", () => {
  it("type-checks, then builds with Vite into dist", () => {
    const pkg = JSON.parse(read("package.json"));
    expect(pkg.scripts.build).toBe("tsc -b && vite build");
    // Vite's default output directory, which wrangler.jsonc serves.
    expect(read("vite.config.ts")).not.toContain("outDir");
  });

  it("is the template's React plugin, plus the title writer", async () => {
    const { default: config } = await import("@/vite.config");
    const plugins = (config.plugins ?? []).flat(2) as Array<{ name?: string }>;
    const names = plugins.map((p) => p?.name);
    expect(names).toContain("vite:react-babel");
    expect(names).toContain("site-name");
  });

  it("writes the site's name into index.html's title, escaped", async () => {
    const { default: config } = await import("@/vite.config");
    const plugins = (config.plugins ?? []).flat(2) as unknown as Array<{
      name?: string;
      transformIndexHtml: (html: string) => string;
    }>;
    const plugin = plugins.find((p) => p?.name === "site-name")!;
    const { SITE_NAME } = await import("@/src/site");
    const escaped = SITE_NAME.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    expect(plugin.transformIndexHtml("<title>__SITE_NAME__</title>")).toBe(`<title>${escaped}</title>`);
  });
});

describe("the Worker and its assets (apps/web/wrangler.jsonc)", () => {
  const wrangler = read("wrangler.jsonc");

  it("serves the static build behind the Worker", () => {
    expect(wrangler).toContain('"main": "./worker/index.ts"');
    expect(wrangler).toContain('"directory": "./dist"');
    expect(wrangler).toContain('"binding": "ASSETS"');
  });

  it("answers a navigation to any page with the app (it renders in the browser)", () => {
    expect(wrangler).toContain('"not_found_handling": "single-page-application"');
  });
});
