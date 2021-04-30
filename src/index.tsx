import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { deserializeData, getDataFromChromeStorage } from './common/HelperFunctions';
import { extensionStateKey, appId, mainBlockId } from './common/Constants';
import { addToStorage } from './StorageServices';

(async () => {
  const container = document.createElement('div');
  container.setAttribute('id', appId);
  container.style.height = '0px';
  document.body.insertBefore(container, document.getElementById(mainBlockId));

  const currentPathName = window.location.pathname.replace('/', '').replace('.php', '').replace('#', '');
  const extensionStates = await getDataFromChromeStorage(extensionStateKey);
  const deserializedData = deserializeData(await getDataFromChromeStorage(currentPathName) as unknown as string);

  const queryBtn: HTMLElement = document.querySelector(`input[name='${currentPathName}Submit']`);
  const textarea: HTMLTextAreaElement = document.querySelector('textarea');
  queryBtn.onclick = async () => {
    const data = textarea.value.trim();
    if (!data) {
      return; // If textarea is empty, do nothing
    }
    await addToStorage(deserializedData.output, currentPathName, { data });
  };

  const props = {
    ...deserializedData,
    defaultDrawerState: (extensionStates && extensionStates[currentPathName] as boolean) ?? true,
    currentPathName
  };
  ReactDOM.render(<App {...props} />, container);
})();
