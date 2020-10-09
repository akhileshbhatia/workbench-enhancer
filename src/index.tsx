import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const id = 'wb-enhancer-app';
let container = document.createElement('div');
container.setAttribute('id', id);
document.body.insertBefore(container, document.getElementById('mainBlock'));

ReactDOM.render(<App />, document.getElementById(id));
