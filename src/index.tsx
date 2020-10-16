import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const id = 'wb-enhancer-app';
let container = document.createElement('div');
container.setAttribute('id', id);
document.body.insertBefore(container, document.getElementById('mainBlock'));

chrome.storage.local.get('query', (data) => {
  // If else block is temporary
  if (data.query) {
    ReactDOM.render(<App {...data} />, document.getElementById(id));
  } else {
    const tempData = {
      "14 Oct 2020": [
        [
          1602655220,
          "select whatever from wherever"
        ],
        [
          1602655052,
          "select name from temp"
        ]
      ],
      "04 Mar 2017": [
        [
          1488585600,
          "select old_data from table"
        ]
      ]
    }
    chrome.storage.local.set({ query: tempData }, () => {
      ReactDOM.render(<App {...{ query: tempData }} />, document.getElementById(id));
    });
  }
});

