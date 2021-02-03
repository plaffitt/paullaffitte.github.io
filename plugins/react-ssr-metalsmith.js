import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../src/App';

const renderApp = async ({ contents }, files, preloadedState) => {
  const store = createStore(s => s, preloadedState);
  const app = (
    <Provider store={ store }>
      <App />
    </Provider>
  );

  const renderedApp = `<div id="container">${renderToString(app)}</div>`;
  return contents.replace('<div id="container"></div>', renderedApp);
}

function reactSSR() {
  return async function(files, metalsmith, done) {
    const html = await renderApp(files['index.html'], files, metalsmith.metadata().api);

    files['index.html'] = {
      contents: html,
    };

    done();
  };
};

export default reactSSR;
