const path = require('path');
const DataExtractorPlugin = require('./src/webpack/DataExtractorPlugin');
const JsonPostProcessPlugin = require('./src/webpack/JsonPostProcessPlugin');
const CVPostProcessor = require('./src/webpack/CVPostProcessor');
const ApiPostProcessor = require('./src/webpack/ApiPostProcessor');
const ToYamlPostProcessor = require('./src/webpack/ToYamlPostProcessor');

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

function loadData(folder, name, plugins=[]) {
  return {
    entry: {
      index: './data/index.js'
    },
    output: {
      path: path.resolve(__dirname, folder),
    },
    module: {
      rules: [
        {
          test: /\.yml$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: name,
                context: 'src'
              }
            },
            'yaml-loader'
          ]
        }
      ]
    },
    plugins: [
      new DataExtractorPlugin(),
      new JsonPostProcessPlugin(CVPostProcessor),
      ...plugins
    ],
    mode: 'development'
  };
}

const apiModule = loadData('api', '[path][name].json', [ new JsonPostProcessPlugin(ApiPostProcessor) ]);
const dataModule = loadData('_data2', '[path][name].yml', [ new JsonPostProcessPlugin(ToYamlPostProcessor, true) ]);

module.exports = [
  applicationModule,
  apiModule,
  dataModule
]

