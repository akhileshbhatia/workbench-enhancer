app.controller("workbenchEnhancerController",function($scope){
  console.log("In angular controller");

  $scope.queryBtnClick = function(event){
    event.preventDefault();
    $scope.textAreaVal = "set through the controller";
  }
});
