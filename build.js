require("@babel/register");
const metalsmith = require('metalsmith');
const browsersync = require('metalsmith-browser-sync');
const htmlmin = require('metalsmith-html-minifier');
const yamlApiGenerator = require('./plugins/yamlApiGenerator');
const webpack = require('./plugins/webpack-metalsmith');
const reactSSR = require('./plugins/react-ssr-metalsmith').default;

const prod = process.argv.includes('--prod');

const ms = metalsmith(__dirname)
  .use(yamlApiGenerator())
  .use(webpack({
    prod
  }))
  .use(reactSSR());

if (prod) {
  ms.use(htmlmin());
} else {
  ms.use(browsersync({
    server: './build',
    files: [ './src' + '/**/*' ]
  }));
}

ms.build(function(err) {
  if (err) throw err;
});
