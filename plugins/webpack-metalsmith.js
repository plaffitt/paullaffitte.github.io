const webpack = require('webpack');
const { createFsFromVolume, Volume } = require('memfs');
const join = require('memory-fs/lib/join');

// https://github.com/streamich/memfs/issues/404#issuecomment-522450466
function buildWebpackCompiler(fs, webpackConfig) {
  function ensureWebpackMemoryFs(fs) {
    if (fs.join) {
      return fs
    }
    const nextFs = Object.create(fs)
    nextFs.join = join;

    return nextFs
  }

  const webpackFs = ensureWebpackMemoryFs(fs)
  const compiler = webpack(webpackConfig)

  compiler.outputFileSystem = webpackFs
  return compiler;
}

function cleanWebpackDependencies(metalsmith, stats, files) {
  const sourceFolderLength = metalsmith.source().length + 1;
  stats.compilation.fileDependencies.forEach(webpackInput => {
    const filename = webpackInput.slice(sourceFolderLength);
    if (Object.keys(files).includes(filename)) {
      delete files[filename];
      console.log(filename)
    }
  });
}

module.exports = (options) => (files, metalsmith, done) => {
  const config = require(metalsmith.directory() + '/webpack.config.js')(options);
  const vol = new Volume();
  const fs = createFsFromVolume(vol);
  const compiler = buildWebpackCompiler(fs, config);

  compiler.run((err, stats) => {
    const webpackOutputs = vol.toJSON();

    cleanWebpackDependencies(metalsmith, stats, files);

    if (err)
      console.error(err);

    Object.keys(webpackOutputs).forEach(filename => {
      const relativeFilename = filename.slice(metalsmith.directory().length + 1);
      files[relativeFilename] = { contents: webpackOutputs[filename] };
    });

    done();
  });
};
