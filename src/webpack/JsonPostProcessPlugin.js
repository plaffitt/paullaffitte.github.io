module.exports = class JsonPostProcessPlugin {
  constructor(processor, raw=false) {
    this.processor = processor;
    this.raw = raw;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('JsonPostProcessPlugin', async (compilation, callback) => {
      for (var filename in compilation.assets) {
        let data = JSON.parse(compilation.assets[filename].source());
        let newData = await this.processor(filename, data);
        compilation.assets[filename].source = () => {
          return (this.raw || typeof newData == 'string')
            ? newData
            : JSON.stringify(newData, null, 2);
        }
      }
      callback();
    });
  }
}
