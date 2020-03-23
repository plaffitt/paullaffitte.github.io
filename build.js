const metalsmith = require('metalsmith');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');
const yamlApiGenerator = require('./plugins/yamlApiGenerator');
const webpack = require('./plugins/webpack-metalsmith');

const prod = process.argv.includes('--prod');

const ms = metalsmith(__dirname)
  .destination(prod ? 'build' : 'build-dev')
  .use(yamlApiGenerator({
    source: '../legacy/data',
  }))
  .use(webpack({
    prod
  }));

if (prod) {
  ms.build(function(err) { if (err) throw err });
} else {
  ms.use(serve({port:8282}))
    .use(watch())
    .build(err => { if (err) throw err });
}
