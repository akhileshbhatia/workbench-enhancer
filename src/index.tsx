import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { deserializeData } from './common/HelperFunctions';

const id = 'wb-enhancer-app';
let container = document.createElement('div');
container.setAttribute('id', id);
document.body.insertBefore(container, document.getElementById('mainBlock'));

const path = window.location.pathname.replace('/', '').replace('.php', '').replace('#', '');

chrome.storage.local.get(path, (data) => {
  ReactDOM.render(<App {...deserializeData(data[path])} />, container);
});

