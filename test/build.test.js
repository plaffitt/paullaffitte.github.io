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

test('offers render the 3 titles, their proofs and the closing line', () => {
  const { html } = buildSite();
  for (const title of ['Outillage Kubernetes en Go', 'Plateformes Kubernetes', 'Développement assisté par IA']) {
    assert.ok(html.includes(title), `offer missing: ${title}`);
  }
  assert.ok(html.includes('accompagnement de vos équipes'));
  // proofs are links to the project pages
  assert.ok(hasHref(html, 'https://github.com/enix/topomatik'));
});

test('projects render featured, contributions and personal projects', () => {
  const { html } = buildSite();
  for (const name of ['kube-image-keeper (kuik)', 'pvecontrol', 'san-iscsi-csi', 'openebs/zfs-localpv', 'YggOps', 'histctx', 'Shoot The Aliens']) {
    assert.ok(html.includes(name), `project missing: ${name}`);
  }
  assert.ok(html.includes('750 étoiles GitHub'));
  assert.ok(html.includes('septembre 2026'));
});

test('talks render both of Paul\'s talks and mark the one by others', () => {
  const { html } = buildSite();
  assert.ok(html.includes('quand kube-image-keeper sauve la prod'));
  assert.ok(html.includes('Cauchemar dans Kubernetes'));
  assert.ok(hasHref(html, 'https://www.youtube.com/watch?v=FwOc2jnxjkc'));
  assert.ok(html.includes('Par Jérôme Petazzoni'), 'talk by others must name its speaker');
});

test('articles render with their publisher', () => {
  const { html } = buildSite();
  assert.ok(html.includes('comment nous avons développé un plugin CSI'));
  assert.ok(/href="?https:\/\/enix\.io\//.test(html));
  assert.ok(html.includes('Blog Enix'));
});

test('experience renders Enix as Platform Engineer, ongoing, with OpenStack facts', () => {
  const { html } = buildSite();
  assert.ok(html.includes('Platform Engineer'));
  assert.ok(html.includes('septembre 2020'));
  assert.ok(html.includes("aujourd'hui") || html.includes('aujourd&#x27;hui'));
  assert.ok(html.includes('7 montées de version'));
  assert.ok(html.includes('VRX Technologies') && html.includes('Iamanys') && html.includes('Epitech'));
});

test('about and skills render', () => {
  const { html } = buildSite();
  assert.ok(html.includes('Epitech Montpellier en 2021'));
  assert.ok(html.includes('Langages') && html.includes('Kubernetes et cloud'));
  assert.ok(html.includes('Français, langue maternelle'));
});

test('page declares a viewport and the French language', () => {
  const { html } = buildSite();
  assert.ok(/<meta name="?viewport"? content="?width=device-width, ?initial-scale=1"?/.test(html), 'viewport meta missing');
  assert.ok(/<html lang="?fr"?/.test(html), 'lang must be fr');
});

test('project links are rendered', () => {
  const { html } = buildSite();
  assert.ok(hasHref(html, 'https://blog.plaffitt.com/en/2022/08/30/shoot-the-aliens-a-game-that-changed-my-life/'));
  assert.ok(hasHref(html, 'https://github.com/jimeh/tmuxifier'));
});

test('navigation links to every section of the page', () => {
  const { html } = buildSite();
  for (const id of ['offres', 'projets', 'talks', 'parcours', 'contact']) {
    assert.ok(hasHref(html, `#${id}`), `nav link to #${id} missing`);
    assert.ok(new RegExp(`id="?${id}"?[\\s>]`).test(html), `section #${id} missing`);
  }
});

test('hero shows the verified highlights', () => {
  const { html } = buildSite();
  assert.ok(html.includes('étoiles GitHub sur kube-image-keeper'));
  assert.ok(html.includes('de Rocky à Yoga'));
  assert.ok(html.includes('repris par Seagate'));
});

test('contact block closes the page with the booking link, the email and the legal notice', () => {
  const { html } = buildSite();
  const contact = html.slice(html.search(/id="?contact"?[\s>]/));
  assert.ok(contact.includes('Un cluster à fiabiliser, un opérateur à écrire ?'));
  assert.ok(hasHref(contact, 'https://cal.com/plaffitt/decouverte'));
  assert.ok(hasHref(contact, 'mailto:plaffitt@gmail.com'));
  assert.ok(contact.includes('81279348700057'));
});

test('page uses IBM Plex and drops the old handwritten fonts and Bootstrap', () => {
  const { dir, html } = buildSite();
  const css = fs.readFileSync(path.join(dir, 'main.css'), 'utf8');
  assert.ok(/IBM\+Plex\+Sans/.test(html) && /IBM\+Plex\+Mono/.test(html), 'IBM Plex fonts not loaded');
  for (const font of ['Permanent Marker', 'Kalam', 'Barlow', 'Exo']) {
    assert.ok(!css.includes(font) && !html.includes(font.replace(' ', '+')), `${font} still used`);
  }
  assert.ok(!/\.btn-primary|\.container-fluid/.test(css), 'Bootstrap is still bundled');
});
