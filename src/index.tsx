import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { deserializeDataForPath } from './common/HelperFunctions';

const id = 'wb-enhancer-app';
let container = document.createElement('div');
container.setAttribute('id', id);
document.body.insertBefore(container, document.getElementById('mainBlock'));
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

chrome.storage.local.get('query', (data) => {
  // If else block is temporary
  const output = deserializeDataForPath(data.query);
  console.log(output);
  // if (false && data.query && Object.keys(data.query).length > 0) {
  //   ReactDOM.render(<App {...data} />, document.getElementById(id));
  // } else {
  //   chrome.storage.local.clear(() => {
  //     chrome.storage.local.set({ query: tempData }, () => {
  //       ReactDOM.render(<App {...{ query: tempData }} />, document.getElementById(id));
  //     });
  //   })
  // }
});

