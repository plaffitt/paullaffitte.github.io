const jq = require('node-jq');

async function jqRun(query, data) {
  return jq.run(query, data, {input: 'json'});
}

class CV {

  constructor() {
    [
      'activities',
      'categories',
      'profile',
      'skills'
    ].map(name => this.registerPart(name));

    this.processor = async (f, d) => this._processor(f, d);
  }

  registerPart(name) {
    this[name] = new Promise((resolve, reject) => {
      this[`${name}PromiseControl`] = {resolve, reject};
    });
  }

  resolvePart(name, data) {
    this[`${name}PromiseControl`].resolve(data);
  }

  processPart(name, data) {
    console.log(`process ${name}`);
    name = name.charAt(0).toUpperCase() + name.slice(1);

    if (`process${name}` in this)
      return this[`process${name}`](data);
    else
      console.warn(`warning: process${name} not implemented, passing raw data`);

    return Promise.resolve(data);
  }

  async _processor(filename, data) {
    let name = filename.split('.');
    name.pop();
    name = name.join('.');

    this.resolvePart(name, data);
    return await this.processPart(name, data);
  }

  async processActivities(data) {
    let skills = await this.skills;
    return await jqRun('.', data);
  }

  async processCategories(data) {
    return await jqRun('.', data);
  }

  async processSkills(data) {
    return await jqRun('.', data);
  }
}

let instance = new CV();
module.exports = instance.processor;
