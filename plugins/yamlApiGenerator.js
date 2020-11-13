const yaml = require('yaml-js');
const fs = require('fs');
const minimatch = require('minimatch');
const { relative } = require('path');

function readItems(files) {
  const data = {};

  for (var filename in files) {
    const file = files[filename];
    const contents = file.contents.toString('utf8');
    const collection = filename.replace(/\.[^/.]+$/, '');

    if ( minimatch(filename, '**/*.{yml,yaml}') ) {
      data[collection] = yaml.load_all(contents)[0];
    }
  }

  return data;
}

function initSource(metalsmith, source, files) {
  if (source) {
    return new Promise((resolve, reject) => {
      metalsmith.read(metalsmith.source() + '/' + source, (err, files) => {
        if (err) {
          reject(err)
          return;
        }
        resolve(files);
      });
    });
  }

  return files;
}

function yamlApiGenerator({ source, destination='data.json', metadataDestination='api', itemsPreprocessor }) {
  return async function(files, metalsmith, done) {
    const data = readItems(await initSource(metalsmith, source, files), itemsPreprocessor);
    const metadata = metalsmith.metadata();
    metadata[metadataDestination] = data;
    files[destination] = { contents: JSON.stringify(data) };
    done();
  };
};

module.exports = yamlApiGenerator;
