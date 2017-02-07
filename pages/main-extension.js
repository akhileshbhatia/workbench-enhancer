//initialize angular application
var app = angular.module("workbenchEnhancerApp",[]);

app.directive("mainExtension",function(){
  var mainExtension = {};
  mainExtension.restrict = "A";
  mainExtension.templateUrl = "templates/main-extension.html";
  return mainExtension;
})
