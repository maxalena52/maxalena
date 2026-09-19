#!/usr/bin/env node
/**
 * Nitro traces tslib as an external but does not ship the package into the
 * Vercel function. Rewrite remaining `from "tslib"` imports to a local file.
 */
import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const funcDir = join(root, ".vercel/output/functions/__server.func");
if (!existsSync(funcDir)) {
  console.log("[fix-vercel-tslib] no Vercel function output — skip");
  process.exit(0);
}

const require = createRequire(import.meta.url);
const tslibSrc = require.resolve("tslib/tslib.es6.mjs");
const tslibDest = join(funcDir, "_libs/tslib.mjs");
copyFileSync(tslibSrc, tslibDest);

function walk(dir, out = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) walk(full, out);
    else if (name.name.endsWith(".mjs") || name.name.endsWith(".js")) out.push(full);
  }
  return out;
}

let patched = 0;
for (const file of walk(funcDir)) {
  if (file === tslibDest) continue;
  const before = readFileSync(file, "utf8");
  if (!before.includes('from "tslib"') && !before.includes("from 'tslib'")) continue;
  let rel = relative(dirname(file), tslibDest).replaceAll("\\", "/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  const after = before
    .replaceAll('from "tslib"', `from "${rel}"`)
    .replaceAll("from 'tslib'", `from '${rel}'`);
  if (after !== before) {
    writeFileSync(file, after);
    patched += 1;
  }
}
console.log(`[fix-vercel-tslib] inlined tslib for ${patched} file(s)`);
