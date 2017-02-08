//select id from account
//select id,name from account

//initializes the current html to link to angular application by adding ng-app,ng-controller and custom directive
var body = document.getElementsByTagName('body')[0];
body.setAttribute("ng-app","workbenchEnhancerApp");
body.setAttribute("ng-controller","workbenchEnhancerController");

var textarea = document.getElementById("soql_query_textarea");
textarea.setAttribute("ng-model","textAreaVal");

var queryBtn = document.getElementsByName('querySubmit')[0];
queryBtn.setAttribute("ng-click","queryBtnClick($event)");

var customDiv = document.createElement("div");
customDiv.setAttribute("main-extension","");
body.insertBefore(customDiv,document.getElementById('mainBlock'));
