const webpack = require('webpack');
const { createFsFromVolume, Volume } = require('memfs');
const fs = require('fs');
const path = require('path');
const unionfs = require('unionfs');
const MemoryFileSystem = require('memory-fs');
const join = require('memory-fs/lib/join');


// https://github.com/streamich/memfs/issues/404#issuecomment-522450466
function buildWebpackCompiler(outputFs, inputFs, webpackConfig) {
  function ensureWebpackMemoryFs(outputFs) {
    if (outputFs.join) {
        return outputFs
      }
      const nextFs = Object.create(outputFs)
      nextFs.join = join;
    
      return nextFs
  }
    
  const compiler = webpack(webpackConfig)

  compiler.inputFileSystem = inputFs;
  compiler.resolvers.normal.fileSystem = inputFs;
  compiler.resolvers.context.fileSystem = inputFs;
  compiler.outputFileSystem = ensureWebpackMemoryFs(outputFs);

  return compiler;
}

function cleanWebpackDependencies(metalsmith, stats, files) {
  const sourceFolderLength = metalsmith.source().length + 1;
  stats.compilation.fileDependencies.forEach(webpackInput => {
    const filename = webpackInput.slice(sourceFolderLength);
    if (Object.keys(files).includes(filename)) {
      delete files[filename];
    }
  });
}

function withCustomOutput(metalsmith, config) {
  if (!config.output)
    config.output = {};

  config.output.path = metalsmith.directory();

  return config;
}

function createInputFs(files, metalsmith) {
  var inputMemFs = new MemoryFileSystem();

  const sourceDir = metalsmith.source();
  Object.entries(files).forEach(([filename, { contents }]) => {
    inputMemFs.mkdirpSync(path.join(sourceDir, path.dirname(filename)));
    inputMemFs.writeFileSync(path.join(sourceDir, filename), contents);
  });

  const inputFs = new unionfs.Union();
  inputFs.use(fs).use(inputMemFs);

  return inputFs;
}

module.exports = (options) => (files, metalsmith, done) => {
  const config = require(metalsmith.directory() + '/webpack.config.js')(options);

  const volume = new Volume()
  const fs = createFsFromVolume(volume);
  const compiler = buildWebpackCompiler(fs, createInputFs(files, metalsmith), withCustomOutput(metalsmith, config));

  compiler.run((err, stats) => {
    const webpackOutputs = volume.toJSON();

    cleanWebpackDependencies(metalsmith, stats, files);

    if (err)
      console.error(err);

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + "\n\n")

    Object.keys(webpackOutputs).forEach(filename => {
      const relativeFilename = filename.slice(metalsmith.directory().length + 1);
      files[relativeFilename] = { contents: webpackOutputs[filename] };
    });

    done();
  });
};
