export default async url => (await fetch(`/api/${url}.json`)).json();
