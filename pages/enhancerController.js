app.controller("workbenchEnhancerController",function($scope){

  $scope.queryBtnClick = function(event){
    event.preventDefault();
    var date = new Date();
    var month = parseInt(date.getMonth(),10) + 1;
    var todaysDate = date.getDate() + "-" + month + "-" + date.getFullYear();
    chrome.storage.local.get(todaysDate,function(data){
      if(angular.equals({},data)){ // //empty object means a new entry for that key will be made
        data[todaysDate] = [$scope.textAreaVal.trim()];
      }
      else{
        data[todaysDate].push($scope.textAreaVal.trim());
      }
      chrome.storage.local.set(data,function(){
        console.log("data added to storage");
      })
    });
  }
});
