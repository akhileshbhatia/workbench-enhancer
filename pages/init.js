//select id from account
//select id,name from account

//initializes the current html to link to angular application by adding ng-app,ng-controller and custom directive
var body = document.getElementsByTagName('body')[0];
body.setAttribute("ng-app","workbenchEnhancerApp");
body.setAttribute("ng-controller","workbenchEnhancerController");
body.setAttribute("ng-cloak","");

var pathname = window.location.pathname;
if(pathname == "/query.php"){
  var textarea = document.getElementById("soql_query_textarea");
  var queryBtn = document.getElementsByName('querySubmit')[0];
}
else if(pathname == "/execute.php"){
  var textarea = document.getElementById("scriptInput");
  var queryBtn = document.getElementsByName('execute')[0];
}
textarea.setAttribute("ng-model","textAreaVal");
queryBtn.setAttribute("ng-click","addDataToStorage($event)");

var customDiv = document.createElement("div");
customDiv.setAttribute("main-extension","state");
body.insertBefore(customDiv,document.getElementById('mainBlock'));

// //clear storage completely
// chrome.storage.local.clear(function(){
//   alert("Cleared storage");
// });

//clear storage for specific key
// chrome.storage.local.remove("08 Jan 2017",function(){
//   alert("Removed");
// })
