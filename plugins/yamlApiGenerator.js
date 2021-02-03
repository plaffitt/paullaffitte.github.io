const yaml = require('yaml-js');
const minimatch = require('minimatch');
const path = require('path');

function readItems(files, cache={}) {
  const data = {};

  for (var filename in files) {
    if (!minimatch(filename, '**/*.{yml,yaml}')) {
      continue;
    }

    const file = files[filename];
    const contents = file.contents.toString('utf8');
    const { name: collection } = path.parse(filename);

    data[collection] = yaml.load_all(contents)[0];
  }

  return { ...cache, ...data };
}

function yamlApiGenerator({ destination='data.json', metadataDestination='api' }={}) {
  return async function(files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    const data = readItems(files, metadata[metadataDestination]);
    metadata[metadataDestination] = data;
    files[destination] = { contents: JSON.stringify(data) };
    done();
  };
};

module.exports = yamlApiGenerator;
