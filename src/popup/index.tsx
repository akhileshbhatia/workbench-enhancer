import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';


let container = document.createElement('div');
container.setAttribute('id', 'popup');
document.body.appendChild(container);
ReactDOM.render(<Popup />, document.getElementById('popup'));
