const YAML = require('yaml');

module.exports = function(filename, data) {
  return YAML.stringify(data);
}