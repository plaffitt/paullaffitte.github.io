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

  async processProfile(data) {
    let makeProfile = (label, service, url) => ({label, service, url, icon: `assets/img/icons/${service}.svg`});
    let addProfile = (label, service, url, filter) => {
      if (!label)
        return;
      let opts = {label, service, url};
      if (filter)
        filter(opts);
      data.profiles.unshift(makeProfile(opts.label, opts.service, opts.url));
    };

    addProfile(data.phoneNumber, 'phone', `tel:${data.phoneNumber}`);
    addProfile(data.emailAddress, 'email', `mailto:${data.emailAddress}`);
    addProfile(data.website, 'website', data.website, (opts) => {
      let label = opts.label.split('://');
      opts.label = (label.length > 1 ? label[1] : label[0]).replace(/\/$/, '');
    });
    return data;
  }

  async processActivities(data) {
    let skills = await this.skills;
    let processed = this.categorize(data, activity => {
      activity.title = capitalizeFirstLetter(activity.title);
      if (activity.skills)
        activity.skills = activity.skills.map(skill => skills[skill]);
      return activity;
    });
    return processed;
  }

  async processSkills(data) {
    let processed = this.categorize(data, skill => {
      skill.label = capitalizeFirstLetter(skill.label);
      return skill;
    });

    Object.keys(processed).forEach(category => {
      processed[category].sort((a, b) => {
        if (Object.keys(a).includes('value') || Object.keys(b).includes('value'))
          return b.value - a.value;
        return ((a.label < b.label) ? -1 : ((a.label > b.label) ? 1 : 0));
      });
      console.log(processed[category]);
    });

    return processed;
  }

  categorize(data, processItem) {
    return Object.values(data).reduce((acc, item) => {
      let category = item.category;
      item = processItem(item);
      if (!acc[category])
        acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }
}

let instance = new CV();
module.exports = instance.processor;
