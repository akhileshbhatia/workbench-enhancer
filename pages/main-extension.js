//initialize angular application
var app = angular.module("workbenchEnhancerApp",[]);

app.directive("mainExtension",function($sce){
  var mainExtension ={};
  mainExtension.restrict="A";
  mainExtension.templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL("templates/main-extension.html"));
  //mainExtension.templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL("pages/temp.html"));
  return mainExtension;
});

app.filter("isEmpty",function(){
  return function(data) {
    if(angular.equals({},data))
      return true;
    else
      return false;
  }
})
