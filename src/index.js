import React from 'react';
import { hydrate } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import './styles/paullaffitte.scss';

async function setup() {
  const preloadedState = await (await fetch('/data.json')).json();
  const store = createStore(s => s, preloadedState);

  hydrate(
    <Provider store={ store }>
      <App />
    </Provider>,
    document.getElementById('container')
  );
}

setup();
