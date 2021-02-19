import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { deserializeData, getDataForPath } from './common/HelperFunctions';
import { extensionStateKey, appId, mainBlockId } from './common/Constants';
import { addToStorage } from './UpdateStorage';

(async () => {
  const container = document.createElement('div');
  container.setAttribute('id', appId);
  container.style.height = '0px';
  document.body.insertBefore(container, document.getElementById(mainBlockId));

  const currentPathName = window.location.pathname.replace('/', '').replace('.php', '').replace('#', '');
  const data = await getDataForPath(currentPathName) as unknown as string;
  const extensionStates = await getDataForPath(extensionStateKey);
  const deserializedData = deserializeData(data);

  const queryBtn: HTMLElement = document.querySelector(`input[name='${currentPathName}Submit']`);
  const textarea: HTMLTextAreaElement = document.querySelector('textarea');
  queryBtn.onclick = () => {
    const data = textarea.value.trim();
    if (!data) {
      return; // If textarea is empty, do nothing
    }
    addToStorage(deserializedData.output, currentPathName, { data });
  }

  const props = {
    ...deserializedData,
    defaultDrawerState: (extensionStates && extensionStates[currentPathName]) ?? true,
    currentPathName
  };
  ReactDOM.render(<App {...props} />, container);
})();


