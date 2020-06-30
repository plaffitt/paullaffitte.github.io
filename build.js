require("@babel/register");
const metalsmith = require('metalsmith');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');
const yamlApiGenerator = require('./plugins/yamlApiGenerator');
const webpack = require('./plugins/webpack-metalsmith');
const reactSSR = require('./plugins/react-ssr-metalsmith').default;

const prod = process.argv.includes('--prod');

const ms = metalsmith(__dirname)
  .use(yamlApiGenerator({
    source: '../legacy/data',
  }))
  .use(webpack({
    prod
  }))
  .use(reactSSR());

if (prod) {
  ms.build(function(err) { if (err) throw err });
} else {
  ms.use(serve({port:8282}))
    .use(watch())
    .build(err => { if (err) throw err });
}
