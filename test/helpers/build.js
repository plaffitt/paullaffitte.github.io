const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

let cached = null;

// Runs the production build once into a temporary directory and returns
// its output directory and the generated index.html.
function buildSite() {
  if (cached) return cached;

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'plaffitt-build-'));
  const result = spawnSync(process.execPath, ['build.js', '--prod'], {
    cwd: path.resolve(__dirname, '..', '..'),
    env: { ...process.env, BUILD_TARGET: dir, NODE_OPTIONS: '--openssl-legacy-provider' },
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    throw new Error(`build failed:\n${result.stdout}\n${result.stderr}`);
  }

  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  cached = { dir, html, stderr: result.stderr };
  return cached;
}

module.exports = { buildSite };

// The production HTML is minified and attribute quotes are dropped, so a
// link is matched with or without quotes around its URL.
function hasHref(html, url) {
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`href="?${escaped}"?[\\s>]`).test(html);
}

module.exports.hasHref = hasHref;
