const test = require('node:test');
const assert = require('node:assert/strict');
const { loadData, strings } = require('./helpers/data');

const data = loadData();

test('every data file loads and is an object', () => {
  for (const name of ['profile', 'offers', 'legal']) {
    assert.equal(typeof data[name], 'object', `${name}.yml missing or invalid`);
  }
});

test('content rules: no em dash, no HTML, no phone number, no daily rate', () => {
  for (const { trail, value } of strings(data)) {
    assert.ok(!value.includes('—'), `em dash in ${trail}`);
    assert.ok(!/<[a-z][^>]*>/i.test(value), `HTML in ${trail}`);
    assert.ok(!/(\+33|0)[1-9]([ .-]?\d{2}){4}/.test(value), `phone number in ${trail}`);
    assert.ok(!/\bTJM\b|€\s*\/\s*jour/i.test(value), `daily rate in ${trail}`);
  }
});

test('hero and offers contain no emoji', () => {
  const emoji = /\p{Extended_Pictographic}/u;
  const hero = [data.profile.headline, data.profile.tagline, data.profile.missionFrame];
  for (const s of hero) assert.ok(!emoji.test(s), `emoji in hero: ${s}`);
  for (const { trail, value } of strings(data.offers)) {
    assert.ok(!emoji.test(value), `emoji in offers ${trail}`);
  }
});

test('profile has the contact fields', () => {
  assert.equal(data.profile.bookingUrl, 'https://cal.com/plaffitt/decouverte');
  assert.equal(data.profile.emailAddress, 'plaffitt@gmail.com');
  assert.ok(data.profile.headline.length > 0);
  assert.ok(data.profile.missionFrame.length > 0);
  assert.ok(Array.isArray(data.profile.profiles) && data.profile.profiles.length >= 2);
});

test('legal notice is complete', () => {
  assert.equal(data.legal.siret, '81279348700057');
  assert.equal(data.legal.address, '1 rue Marguerin, 75014 Paris');
  assert.equal(data.legal.host.name, 'GitHub, Inc.');
  assert.equal(data.legal.email, 'plaffitt@gmail.com');
});

test('offers are well formed and ordered', () => {
  const ids = data.offers.offers.map(o => o.id);
  assert.deepEqual(ids, ['tooling', 'platform', 'ai']);
  for (const offer of data.offers.offers) {
    assert.ok(offer.title && offer.summary, `offer ${offer.id} lacks title or summary`);
    assert.equal(offer.points.length, 3, `offer ${offer.id} must have 3 points`);
    assert.ok(offer.proofs.length >= 1, `offer ${offer.id} lacks proofs`);
  }
  assert.ok(data.offers.closing.length > 0);
});

test('AI offer promises no result', () => {
  const ai = data.offers.offers.find(o => o.id === 'ai');
  const text = [ai.summary, ...ai.points].join(' ');
  assert.ok(!/garanti|x\d+ plus vite|divis[ée] par/i.test(text), 'AI offer must not promise results');
});

test('projects are well formed and every offer proof resolves', () => {
  const ids = new Set(data.projects.projects.map(p => p.id));
  assert.equal(ids.size, data.projects.projects.length, 'duplicate project id');
  for (const p of data.projects.projects) {
    assert.ok(['featured', 'contribution', 'personal'].includes(p.type), `bad type on ${p.id}`);
    assert.ok(p.name && p.role && p.pitch && p.link, `${p.id} lacks a field`);
    assert.ok(Array.isArray(p.facts) && p.facts.length >= 1, `${p.id} lacks facts`);
  }
  for (const offer of data.offers.offers) {
    for (const proof of offer.proofs) {
      assert.ok(ids.has(proof), `offer ${offer.id} references unknown project ${proof}`);
    }
  }
  const featured = data.projects.projects.filter(p => p.type === 'featured').map(p => p.id);
  assert.deepEqual(featured, ['kube-image-keeper', 'topomatik', 'pvecontrol', 'x509-certificate-exporter', 'san-iscsi-csi']);
  for (const id of ['yggops', 'histctx', 'traefik-compose', 'gravity', 'shoot-the-aliens', 'lua-map-generator-workshop']) {
    assert.ok(ids.has(id), `personal project ${id} was dropped`);
  }
  assert.ok(data.projects.starsReadOn.length > 0);
});

test('talks name their speaker and keep both of Paul\'s talks', () => {
  const mine = data.talks.filter(t => t.speaker === 'me');
  const others = data.talks.filter(t => t.speaker === 'others');
  assert.equal(mine.length + others.length, data.talks.length, 'speaker must be me or others');
  assert.ok(mine.some(t => t.link === 'https://www.youtube.com/watch?v=FwOc2jnxjkc'), 'CND 2026 talk missing');
  assert.ok(mine.some(t => t.link === 'https://www.youtube.com/live/7th3T93Fqs0'), 'Enix Live Show missing');
  for (const t of others) assert.ok(t.speakerName, `talk by others needs speakerName: ${t.title}`);
  for (const t of data.talks) assert.ok(!/topomatik/i.test(t.title), 'the topomatik talk is not Paul\'s');
});

test('articles have the 4 fields', () => {
  assert.ok(data.articles.length >= 5);
  for (const a of data.articles) {
    assert.ok(a.title && a.publisher && a.date && a.link, `article lacks a field: ${a.title}`);
  }
});

test('activities: Enix has no end date and no internship wording, personal projects moved out', () => {
  assert.deepEqual(Object.keys(data.activities), ['xppro', 'academic']);
  assert.deepEqual(Object.keys(data.categories), ['xppro', 'academic']);
  const enix = data.activities.xppro.enix;
  assert.equal(enix.role, 'Platform Engineer');
  assert.equal(enix.to, undefined, 'Enix must have no end date');
  const enixText = [enix.summary, ...enix.highlights].join(' ');
  assert.ok(!/\bstage\b|stagiaire/i.test(enixText), 'no internship wording in Enix');
  assert.ok(/OpenStack/.test(enixText) && /kube-image-keeper/.test(enixText));
  assert.equal(data.activities.xppro.vrxTech.to, 'août 2020');
  assert.equal(data.activities.xppro.iamanys.role, 'Développeur full stack');
  for (const category of Object.values(data.activities)) {
    for (const [id, a] of Object.entries(category)) {
      assert.ok(a.title && a.role && a.location && a.from && a.summary, `${id} lacks a field`);
      assert.ok(Array.isArray(a.highlights), `${id} lacks highlights`);
      assert.ok(Array.isArray(a.links), `${id} lacks links`);
    }
  }
});

test('skills are grouped, Go and Kubernetes first', () => {
  assert.equal(data.skills.groups[0].items[0], 'Go');
  assert.equal(data.skills.groups[1].items[0], 'Kubernetes');
  assert.equal(data.skills.languages.length, 3);
  assert.ok(!data.skills.groups.some(g => g.items.includes('C#')), 'C# removed');
});

test('known typos are gone from the data', () => {
  const typos = /cristaliser|assimillant|aquis|parmis|imtéragir|\bAout\b|\bage\b|noeud/;
  for (const { trail, value } of strings(data)) {
    assert.ok(!typos.test(value), `typo in ${trail}: ${value}`);
  }
});

test('projects keep every contribution of the spec and their blog links', () => {
  const ids = new Set(data.projects.projects.map(p => p.id));
  for (const id of ['tmuxifier', 'traefik-network-connector']) assert.ok(ids.has(id), `contribution ${id} missing`);
  for (const p of data.projects.projects) {
    assert.ok(Array.isArray(p.links), `${p.id} lacks a links list`);
    for (const l of p.links) assert.ok(l.label && /^https:\/\//.test(l.url), `${p.id} has a malformed link`);
  }
  const sta = data.projects.projects.find(p => p.id === 'shoot-the-aliens');
  assert.ok(sta.links.some(l => l.url.startsWith('https://blog.plaffitt.com/')), 'shoot-the-aliens blog post link missing');
});
