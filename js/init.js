//select id from account
//select id,name from account

//all variables defined in this file are in global scope. Meaning they can be accessed in any of subsequent js files

//initializes the current html to link to angular application by adding ng-app,ng-controller and custom directive
const body = document.getElementsByTagName('body')[0];
body.setAttribute('ng-app', 'workbenchEnhancerApp');
body.setAttribute('ng-controller', 'baseController');
body.setAttribute('ng-cloak', '');

const pathname = window.location.pathname.replace('/', '').replace('.php', '').replace('#', '');

let textarea, queryBtn;

switch (pathname) {
  case 'query':
    textarea = document.getElementById('soql_query_textarea');
    queryBtn = document.getElementsByName('querySubmit')[0];
    break;

  case 'execute':
    textarea = document.getElementById('scriptInput');
    queryBtn = document.getElementsByName('execute')[0];
    break;

  case 'search':
    textarea = document.getElementById('sosl_search_textarea');
    queryBtn = document.getElementsByName('searchSubmit')[0];
    break;
}

textarea.setAttribute('ng-model', 'allDataObj.textAreaVal');
queryBtn.setAttribute('ng-click', 'allDataObj.addDataToStorage($event)');
queryBtn.setAttribute('update-model', '');

const customDiv = document.createElement('div');
customDiv.setAttribute('main-extension', '');
body.insertBefore(customDiv, document.getElementById('mainBlock'));

//initialize angular application
const app = angular.module('workbenchEnhancerApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute']);

// //clear storage completely
// chrome.storage.local.clear(function(){
//   alert('Cleared storage');
// });

//clear storage for specific key
// chrome.storage.local.remove('08 Jan 2017',function(){
//   alert('Removed');
// })
