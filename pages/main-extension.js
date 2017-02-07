//initialize angular application
var app = angular.module("workbenchEnhancerApp",[]);

app.directive("mainExtension",function(){
  var request = new HttpRequest();
  var mainExtension ={};
  mainExtension.restrict="A";
  request.get(chrome.extension.getURL("templates/main-extension.html"),function(response){
    mainExtension.template = response;
  });
  return mainExtension;
})

var HttpRequest = function(){
  this.get = function(url,callBack){
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function(){
      if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
        callBack(xmlHttpRequest.responseText);
      }
    }
    xmlHttpRequest.open("GET",url,true);
    xmlHttpRequest.send(null);
  }
}
