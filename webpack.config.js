const path = require('path');

module.exports = {
  // webpack folder's entry js - excluded from jekll's build process.
  entry: "./src/index.js",
  output: {
    // we're going to put the generated file in the assets folder so jekyll will grab it.
    path: path.resolve(__dirname, 'assets/js'),
    filename: "index.bundle.min.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  mode: 'development' // Avoids a warning when running `webpack`.
                      // Set to 'production' for minified version.
};
