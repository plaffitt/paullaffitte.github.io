const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { buildSite, hasHref } = require('./helpers/build');

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

test('hero shows the headline, the booking link and the mission frame', () => {
  const { html } = buildSite();
  assert.ok(html.includes('Développeur Go et Platform Engineer Kubernetes'));
  assert.ok(hasHref(html, 'https://cal.com/plaffitt/decouverte'));
  assert.ok(html.includes('Prendre rendez-vous'));
  assert.ok(html.includes('Missions de 1 à 3 semaines'));
  assert.ok(hasHref(html, 'mailto:plaffitt@gmail.com'));
});

test('footer shows the legal notice and no phone number', () => {
  const { html } = buildSite();
  assert.ok(html.includes('81279348700057'));
  assert.ok(html.includes('1 rue Marguerin, 75014 Paris'));
  assert.ok(html.includes('GitHub, Inc.'));
  assert.ok(!html.includes('tel:'));
});

test('page never mentions an internship or a departure from Enix', () => {
  const { html } = buildSite();
  assert.ok(!/\bstage\b/i.test(html));
  assert.ok(!/quitte|départ d.Enix|disponible à partir/i.test(html));
});
