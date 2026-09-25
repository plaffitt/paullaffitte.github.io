require('@babel/register');
const test = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const { renderToString } = require('react-dom/server');
const ActivityCard = require('../src/components/ActivityCard').default;

test('ActivityCard renders "aujourd\'hui" when `to` is null (empty YAML value)', () => {
  const html = renderToString(React.createElement(ActivityCard, {
    title: 'Enix', role: 'Platform Engineer', location: 'Paris', from: 'septembre 2020', to: null,
    summary: 'x', highlights: [], links: [],
  }));
  assert.ok(html.includes('aujourd&#x27;hui') || html.includes("aujourd'hui"));
  assert.ok(!html.includes('null'));
});
