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
  var queryBtn = document.getElementsByName("querySubmit")[0];
}
else if(pathname == "/execute.php"){
  var textarea = document.getElementById("scriptInput");
  var queryBtn = document.getElementsByName("execute")[0];
}
else if(pathname == "/search.php"){
  var textarea = document.getElementById("sosl_search_textarea");
  var queryBtn = document.getElementsByName("searchSubmit")[0];
}
textarea.setAttribute("ng-model","textAreaVal");
queryBtn.setAttribute("ng-click","AddDataToStorage($event)");

var customDiv = document.createElement("div");
customDiv.setAttribute("main-extension","");
body.insertBefore(customDiv,document.getElementById('mainBlock'));

// //clear storage completely
// chrome.storage.local.clear(function(){
//   alert("Cleared storage");
// });

//clear storage for specific key
// chrome.storage.local.remove("08 Jan 2017",function(){
//   alert("Removed");
// })

// Code for Text Editor
var editorNode = null;
var editableArea = null;

//Create a wrapper for the Ace Editor
var editorNode = document.createElement("div");
var editableArea = document.getElementById("soql_query_textarea");
//Insert it just above the original editable area
editableArea.parentNode.insertBefore(editorNode, editableArea);
//Give it an ID
editorNode.setAttribute("id", "_aceAnywhereEditor");
//Set inital content from the original editable area
editorNode.innerHTML = editableArea.value;
//Same height
editorNode.style.height = "111px";
//Same width
editorNode.style.width = "744px";
//Hide the original editable area
editableArea.style.display = "none";


//Import Ace from a CDN
var aceJS = document.createElement("script");
//aceJS.src = "//cdnjs.cloudflare.com/ajax/libs/ace/1.1.2/ace.js";
aceJS.src = "//cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js";
aceJS.setAttribute("charset", "utf-8");

//When the script it finally loaded
aceJS.onload = function()
{
  var aceExtLanguageTools = document.createElement("script");
  aceExtLanguageTools.src = "//cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ext-language_tools.js";
  aceExtLanguageTools.onload = function()
  {
    var loadAce = document.createElement("script");
    loadAce.innerHTML =
    '\
      var editableArea = document.getElementById("'+editableArea.id+'")\n\
      ace.require("ace/ext/language_tools");\n\
      var editor = ace.edit("_aceAnywhereEditor");\n\
      editor.$blockScrolling = Infinity;\n\
      var beautify = ace.require("ace/ext/beautify");\n\
      editor.getSession().setMode("ace/mode/sql");\n\
      editor.setOptions(\n\
      {\n\
        enableBasicAutocompletion: true,\n\
        fontFamily: "tahoma",\n\
        fontSize: "14pt"\n\
      });\n\
      editor.getSession().on("change", function(e)\n\
      {\n\
        editableArea.innerHTML = editor.getSession().getValue();\n\
      });\n\
    ';

    document.head.appendChild(loadAce);
  };
  document.head.appendChild(aceExtLanguageTools);
};
document.head.appendChild(aceJS);
