const yaml = require('yaml-js');
const path = require('path');

function readItems(files, cache={}, metalsmith) {
  const data = {};

  for (var filename in files) {
    if (metalsmith.match('**/*.{yml,yaml}', [filename]).length == 0) {
      continue;
    }

    const file = files[filename];
    const contents = file.contents.toString('utf8');
    const { name: collection } = path.parse(filename);

    data[collection] = yaml.load_all(contents)[0];
    delete files[filename];
  }

  return { ...cache, ...data };
}

function yamlApiGenerator({ metadataDestination='api' }={}) {
  return async function(files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    const data = readItems(files, metadata[metadataDestination], metalsmith);
    metadata[metadataDestination] = data;
    done();
  };
};

module.exports = yamlApiGenerator;
