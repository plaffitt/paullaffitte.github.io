const jq = require('node-jq');

async function jqRun(query, data) {
  return jq.run(query, data, {input: 'json'});
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
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
    name = capitalizeFirstLetter(name);

    if (`process${name}` in this)
      return this[`process${name}`](data);
    else
      console.warn(`warning: process${name} not implemented, passing raw data`);

    return Promise.resolve(data);
  }

  async _processor(name, data) {
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
    let processed = Object.keys(data).map(name => {
      let skill = data[name];
      return skill;
    }).reduce((acc, skill) => {
      let category = skill.category;
      skill.label = capitalizeFirstLetter(skill.label);
      if (!acc[category])
        acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {});

    Object.keys(processed).forEach(category => {
      processed[category].sort((a, b) => {
        if (Object.keys(a).includes('value') || Object.keys(b).includes('value'))
          return a.value < b.value
        return ((a.label == b.label) ? 0 : ((a.label > b.label) ? 1 : -1));
      });
    });

    return processed;
  }
}

let instance = new CV();
module.exports = instance.processor;
