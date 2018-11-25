const path = require('path');
const DataExtractorPlugin = require('./src/webpack/DataExtractorPlugin');

const applicationModule = {
  entry: { index: "./src/index.js" }, // webpack folder's entry js - excluded from jekll's build process.
  output: { // we're going to put the generated file in the assets folder so jekyll will grab it.
    path: path.resolve(__dirname, 'assets/js'),
    filename: "[name].bundle.min.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        loader: 'babel-loader',
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  mode: 'development' // Avoids a warning when running `webpack`. Set to 'production' for minified version.
};

const apiModule = {
  entry: {
    index: './data/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'api'),
  },
  module: {
    rules: [
      {
        test: /\.yml$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].json',
              context: 'src'
            }
          }, {
            loader: 'yaml-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new DataExtractorPlugin(),
  ],
  mode: 'development'
};

module.exports = [
  applicationModule,
  apiModule
]

