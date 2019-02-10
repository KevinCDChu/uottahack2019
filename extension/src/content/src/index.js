/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

import App from './App';

const proxyStore = new Store({
  portName: 'MY_APP',
});

const anchor = document.createElement('div');
anchor.id = 'injected-app-anchor';

document.body.appendChild(anchor);

proxyStore.ready().then(() => {
  ReactDOM.render(
    <Provider store={proxyStore}>
      <App />
    </Provider>,
    document.getElementById('injected-app-anchor'),
  );
});

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*
*     Remember: Edit index.extension.js instead
*
*  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/
