const { RawSource } = require('webpack-sources');

module.exports = class JsonPostProcessPlugin {
  constructor(processor, raw=false) {
    this.processor = processor;
    this.raw = raw;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('JsonPostProcessPlugin', async (compilation, callback) => {
      let processors = Object.keys(compilation.assets).map(async filename => {
        let data = JSON.parse(compilation.assets[filename].source());
        let name = filename.split('.');
        name.pop();
        name = name.join('.');
        return {
          filename: filename,
          data: await this.processor(name, data)
        };
      });

      (await Promise.all(processors)).forEach(result => {
        let newSource = (this.raw || typeof result.data == 'string')
          ? result.data
          : JSON.stringify(result.data, null, 2);

        compilation.assets[result.filename] = new RawSource(newSource);
      });

      callback();
    });
  }
}
