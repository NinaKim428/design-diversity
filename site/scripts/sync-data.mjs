// Syncs catalog.json + design-packs/ data files from the repo root into
// site/data/ and site/public/previews/ so the Next.js build is self-contained.
// Runs as a prebuild step. Safe to run repeatedly. If the repo root is not
// present (e.g. site/ deployed standalone), it leaves the existing bundle.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO_ROOT = path.resolve(SITE_DIR, "..");
const SRC_CATALOG = path.join(REPO_ROOT, "catalog.json");
const SRC_PACKS = path.join(REPO_ROOT, "design-packs");
const DATA_DIR = path.join(SITE_DIR, "data");
const DATA_PACKS = path.join(DATA_DIR, "design-packs");
const PREVIEWS = path.join(SITE_DIR, "public", "previews");

if (!fs.existsSync(SRC_CATALOG) || !fs.existsSync(SRC_PACKS)) {
  console.log("[sync-data] repo root data not found — using existing site/data bundle");
  process.exit(0);
}

fs.mkdirSync(DATA_PACKS, { recursive: true });
fs.mkdirSync(PREVIEWS, { recursive: true });

fs.copyFileSync(SRC_CATALOG, path.join(DATA_DIR, "catalog.json"));

const slugs = fs
  .readdirSync(SRC_PACKS, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const slug of slugs) {
  const srcDir = path.join(SRC_PACKS, slug);
  const dstDir = path.join(DATA_PACKS, slug);
  fs.mkdirSync(dstDir, { recursive: true });
  for (const file of ["prompt.md", "tokens.json", "meta.yaml"]) {
    const src = path.join(srcDir, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dstDir, file));
  }
  const preview = path.join(srcDir, "preview.png");
  if (fs.existsSync(preview)) {
    fs.copyFileSync(preview, path.join(PREVIEWS, `${slug}.png`));
  }
}

console.log(`[sync-data] synced ${slugs.length} packs into site/data/`);
