const yaml = require('yaml-js');
const fs = require('fs');
const minimatch = require('minimatch');
const { relative } = require('path');

function listItems(items) {
  return items;
}

function objectItems(items) {
  items = items.reduce((item, acc) => ({ ...acc, ...item }), {});
  return Object.keys(items).map(key => ({
    id: key,
    ...items[key]
  }));
}

function getCollection(file, filename) {
  if (!file.collection)
    return filename.replace(/\.[^/.]+$/, '');

  return file.collection;
}

function readItems(files, itemsPreprocessor=objectItems) {
  const items = [];

  for (var filename in files) {
    const file = files[filename];
    const contents = file.contents.toString('utf8');
    const collection = getCollection(file, filename);

    if ( minimatch(filename, '**/*.{yml,yaml}') ) {
      const fileItems = yaml.load_all(contents);

      if (file.collection !== false) {
        itemsPreprocessor(fileItems).forEach(item => items.push({
          collection,
          ...item
        }));
      } else {
        items.push({
          id: collection,
          ...fileItems[0]
        });
      }
    }
  }

  return items;
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

function yamlApiGenerator({ source, destination='api', metadataDestination='api', itemsPreprocessor }) {
  return async function(files, metalsmith, done) {
    const items = readItems(await initSource(metalsmith, source, files), itemsPreprocessor);
    const metadata = metalsmith.metadata();
    metadata[metadataDestination] = {};

    items.map(item => {
      if (item.id) {
        const apiCode = item.collection ? `${item.collection}/${item.id}` : item.id;
        const filename = `${destination}/${apiCode}.json`;

        files[filename] = { contents: JSON.stringify(item) };
        metadata[metadataDestination][apiCode.replace('/', '_')] = item;
      } else {
        console.warn('items without id, ignoring...', item);
      }
    });
    done();
  };
};

yamlApiGenerator.objectItems = objectItems;
yamlApiGenerator.listItems = listItems;

module.exports = yamlApiGenerator;
