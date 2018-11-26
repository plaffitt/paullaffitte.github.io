const jq = require('node-jq');

async function jqRun(query, data) {
  return jq.run(query, data, {input: 'json'});
}

module.exports = async function(filename, data) {
  return await jqRun('.', data);
}