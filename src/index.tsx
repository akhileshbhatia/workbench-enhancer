import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { deserializeData, getDataForPath } from './common/HelperFunctions';
import { extensionStateKey, appId, mainBlockId } from './common/Constants';
import { addToStorage } from './AddToStorage';

(async () => {
  const container = document.createElement('div');
  container.setAttribute('id', appId);
  document.body.insertBefore(container, document.getElementById(mainBlockId));

  const currentPathName = window.location.pathname.replace('/', '').replace('.php', '').replace('#', '');
  const data = await getDataForPath(currentPathName) as unknown as string;
  const extensionStates = await getDataForPath(extensionStateKey);
  const deserializedData = deserializeData(data);
  addToStorage(deserializedData.output, currentPathName);
  const props = {
    ...deserializedData,
    defaultDrawerState: (extensionStates && extensionStates[currentPathName]) ?? true,
    currentPathName
  };
  ReactDOM.render(<App {...props} />, container);
})();


