import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from '../src/App';
import getStore from '../src/getStore';

const preloadLock = {
  promises: [],
  resolves: {},
}

const waitForActionsToFinishMiddleware = store => next => action => {
  const state = action.type.split('/').pop();
  const isAsyncThunk = ['pending', 'fulfilled'].includes(state);

  if (!isAsyncThunk) {
    return next(action);
  }

  const { requestId } = action.meta;
  const result = next(action);

  if (state == 'pending') {
    preloadLock.promises.push(new Promise(r => preloadLock.resolves[requestId] = r));
  } else if (state == 'fulfilled') {
    preloadLock.resolves[requestId]();
  }

  return result;
};

const getStoreWithMiddleware = () => getStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    waitForActionsToFinishMiddleware,
  ),
});

async function preloadState(app, store) {
  const html = renderToString(app);
  await Promise.all(preloadLock.promises);
  const preloadedState = store.getState();

  return preloadedState;
}

function getFetch(files) {
  return (url) => {
    const contents = files[url.substr(1)].contents;
    return {
      json: () => JSON.parse(contents),
    };
  };
}

const renderApp = async ({ contents }, files) => {
  global.fetch = getFetch(files);
  const store = getStoreWithMiddleware();
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  const preloadedState = await preloadState(app, store);

  const renderedApp = `<div id="container">${renderToString(app)}</div><script src="preloadedState.js"></script>`;
  return {
    html: contents.replace('<div id="container"></div>', renderedApp),
    state: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};`,
  };
}

function reactSSR() {
  return async function(files, metalsmith, done) {
    const { html, state } = await renderApp(files['index.html'], files);

    files['index.html'] = {
      contents: html,
    };
    files['preloadedState.js'] = {
      contents: state,
    };

    done();
  };
};

export default reactSSR;
