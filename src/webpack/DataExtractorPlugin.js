const YAML = require('yaml');

module.exports = class DataExtractorPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('DataExtractorPlugin', (compilation, callback) => {
      for (var filename in compilation.assets) {
        if (filename.match(/^_\/data\//)) {
          compilation.assets[filename.slice('_/data/'.length)] = compilation.assets[filename];
        }
        delete compilation.assets[filename];
      }
      callback();
    });
  }
}
