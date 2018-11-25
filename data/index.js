const json = [
    'profile',
    'activities',
    'skills',
    'categories',
].forEach(name => require(`./${name}.yml`));
