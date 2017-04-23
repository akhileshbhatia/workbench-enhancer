//select id from account
//select id,name from account

//initializes the current html to link to angular application by adding ng-app,ng-controller and custom directive
var body = document.getElementsByTagName('body')[0];
body.setAttribute("ng-app","workbenchEnhancerApp");
body.setAttribute("ng-controller","workbenchEnhancerController");
body.setAttribute("ng-cloak","");
body.setAttribute("ng-init","InitializeModelsForPath()");

var pathname = window.location.pathname.replace("/","").replace(".php","");;

if(pathname == "query"){
  var textarea = document.getElementById("soql_query_textarea");
  var queryBtn = document.getElementsByName("querySubmit")[0];
}
else if(pathname == "execute"){
  var textarea = document.getElementById("scriptInput");
  var queryBtn = document.getElementsByName("execute")[0];
}
else if(pathname == "search"){
  var textarea = document.getElementById("sosl_search_textarea");
  var queryBtn = document.getElementsByName("searchSubmit")[0];
}
textarea.setAttribute("ng-model","textAreaVal");
queryBtn.setAttribute("ng-click","AddDataToStorage($event)");
queryBtn.setAttribute("update-model","");

//AddModels();

var customDiv = document.createElement("div");
customDiv.setAttribute("main-extension","");
body.insertBefore(customDiv,document.getElementById('mainBlock'));

// function AddModels(){
//   switch (pathname) {
//     case "query":
//           document.getElementById("QB_field_sel").setAttribute("ng-model","querySelect");
//           document.getElementById("QB_orderby_field").setAttribute("ng-model","queryOrderBy");
//           document.getElementById("QB_orderby_sort").setAttribute("ng-model","querySort");
//           document.getElementById("QB_nulls").setAttribute("ng-model","queryNulls");
//           document.getElementById("QB_limit_txt").setAttribute("ng-model","queryLimit");
//           document.getElementById("QB_filter_field_0").setAttribute("ng-model","queryFilter");
//           document.getElementById("QB_filter_compOper_0").setAttribute("ng-model","queryFilterCondition");
//           document.getElementById("QB_filter_value_0").setAttribute("ng-model","queryFilterValue");
//           break;
//
//     default:
//           break;
//   }
// }
// //clear storage completely
// chrome.storage.local.clear(function(){
//   alert("Cleared storage");
// });

//clear storage for specific key
// chrome.storage.local.remove("08 Jan 2017",function(){
//   alert("Removed");
// })
