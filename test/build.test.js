const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { buildSite } = require('./helpers/build');

test('build produces index.html, main.css and main.js', () => {
  const { dir } = buildSite();
  for (const file of ['index.html', 'main.css', 'main.js']) {
    assert.ok(fs.existsSync(path.join(dir, file)), `${file} missing`);
  }
});

test('build does not publish React sources', () => {
  const { dir } = buildSite();
  assert.ok(!fs.existsSync(path.join(dir, 'App.js')), 'App.js leaked');
  assert.ok(!fs.existsSync(path.join(dir, 'components')), 'components/ leaked');
  assert.ok(!fs.existsSync(path.join(dir, 'index.js')), 'index.js leaked');
});

test('build emits no React warning', () => {
  const { stderr } = buildSite();
  assert.ok(!/Warning:/.test(stderr), `React warned:\n${stderr}`);
});
