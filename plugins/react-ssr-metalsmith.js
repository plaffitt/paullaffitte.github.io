import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from '../src/App';
import getStore from '../src/getStore';

const renderApp = async ({ contents }, files) => {
  const store = getStore();

  global.fetch = (url) => {
    const contents = files[url.substr(1)].contents;
    return {
      json: () => JSON.parse(contents),
    };
  };
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await new Promise(resolve => setTimeout(resolve, 2000));

  const preloadedState = store.getState();

  return contents.replace('<div id="container"></div>', `
    <div id="container">${renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
    </script>
  `);
}

function reactSSR() {
  return async function(files, metalsmith, done) {
    files['index.html'] = {
      contents: await renderApp(files['index.html'], files),
    };
    done();
  };
};

export default reactSSR;
