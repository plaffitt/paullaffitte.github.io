const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml-js');

const DATA_DIR = path.resolve(__dirname, '..', '..', 'src', 'data');

// Loads every YAML file of src/data, keyed by file name without extension,
// exactly like plugins/yamlApiGenerator.js does for the Redux store.
function loadData() {
  const data = {};
  for (const file of fs.readdirSync(DATA_DIR)) {
    if (!/\.ya?ml$/.test(file)) continue;
    const contents = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    data[path.parse(file).name] = yaml.load_all(contents)[0];
  }
  return data;
}

// Walks every string in a nested structure.
function* strings(value, trail = []) {
  if (typeof value === 'string') {
    yield { trail: trail.join('.'), value };
  } else if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) yield* strings(value[i], [...trail, i]);
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) yield* strings(v, [...trail, k]);
  }
}

module.exports = { loadData, strings, DATA_DIR };
