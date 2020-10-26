import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { deserializeData, getDataForPath } from './common/HelperFunctions';

(async () => {
  const appId = 'wb-enhancer-app';
  let container = document.createElement('div');
  container.setAttribute('id', appId);
  document.body.insertBefore(container, document.getElementById('mainBlock'));

  const currentPathName = window.location.pathname.replace('/', '').replace('.php', '').replace('#', '');
  const data = await getDataForPath(currentPathName) as string;
  const extensionStates = await getDataForPath('extension_states');
  const props = {
    ...deserializeData(data),
    defaultDrawerState: extensionStates[currentPathName]
  };
  ReactDOM.render(<App {...props} />, container);
})();


