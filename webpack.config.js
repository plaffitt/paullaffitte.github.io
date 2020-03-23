const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const applicationModule = ({ prod }) => ({
  mode: prod ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  resolve: {
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname),
  },
});

module.exports = applicationModule;

