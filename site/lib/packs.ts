import "server-only";
import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import type { Catalog, CatalogPack } from "./types";

export type { Axes, Catalog, CatalogPack } from "./types";
export { AXIS_LABELS, TRACK_LABELS } from "./types";

// Data is bundled into site/data/ at build time so the site is self-contained
// and deployable standalone (e.g. Vercel deploys only the site/ directory).
// scripts/sync-data.mjs keeps site/data/ in sync with the repo-root catalog.
const DATA_ROOT = path.join(process.cwd(), "data");
const CATALOG_PATH = path.join(DATA_ROOT, "catalog.json");
const PACKS_DIR = path.join(DATA_ROOT, "design-packs");

export type Tokens = Record<string, unknown> & {
  color?: Record<string, unknown>;
  type?: Record<string, unknown>;
  spacing?: Record<string, unknown>;
  shape?: Record<string, unknown>;
};

export type Meta = Record<string, unknown> & {
  sources?: { title?: string; url?: string; type?: string }[];
  license?: string;
};

export type PackDetail = CatalogPack & {
  promptMd: string;
  tokens: Tokens | null;
  meta: Meta | null;
};

export function getCatalog(): Catalog {
  const raw = fs.readFileSync(CATALOG_PATH, "utf8");
  return JSON.parse(raw) as Catalog;
}

export function getPacks(): CatalogPack[] {
  return getCatalog().packs;
}

export function getPackDetail(slug: string): PackDetail | null {
  const pack = getPacks().find((p) => p.slug === slug);
  if (!pack) return null;

  const dir = path.join(PACKS_DIR, slug);

  let promptMd = "";
  try {
    promptMd = fs.readFileSync(path.join(dir, "prompt.md"), "utf8");
  } catch {
    promptMd = "";
  }

  let tokens: Tokens | null = null;
  try {
    tokens = JSON.parse(fs.readFileSync(path.join(dir, "tokens.json"), "utf8"));
  } catch {
    tokens = null;
  }

  let meta: Meta | null = null;
  try {
    meta = parseYaml(
      fs.readFileSync(path.join(dir, "meta.yaml"), "utf8")
    ) as Meta;
  } catch {
    meta = null;
  }

  return { ...pack, promptMd, tokens, meta };
}

/** Verify catalog count matches design-packs/ folder count. Build-time sanity check. */
export function getFolderCount(): number {
  return fs
    .readdirSync(PACKS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory()).length;
}
