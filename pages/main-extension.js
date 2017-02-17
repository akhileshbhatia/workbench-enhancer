//initialize angular application
var app = angular.module("workbenchEnhancerApp",["ngAnimate","ui.bootstrap"]);

app.directive("mainExtension",function($sce){
  var mainExtension ={};
  mainExtension.restrict="A";
  mainExtension.templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL("templates/main-extension.html"));
  //mainExtension.templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL("templates/angular-panel.html"));
  return mainExtension;
});

app.filter("isEmpty",function(){
  return function(data) {
    return angular.equals({},data);
  }
})
