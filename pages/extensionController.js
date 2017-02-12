app.controller("workbenchEnhancerController",function($scope,dataService){
  $scope.addDataToStorage = function(event){
    //event.preventDefault();
    var date = new Date();
    var month = parseInt(date.getMonth(),10) + 1;
    var todaysDate = date.getDate() + "-" + month + "-" + date.getFullYear();
    //var todaysDate = "9-2-2017";
    chrome.storage.local.get(todaysDate,function(data){
      if(angular.equals({},data)){ // //empty object means a new entry for that key will be made
        data[todaysDate] = [$scope.textAreaVal.trim()];
      }
      else{
        data[todaysDate].unshift($scope.textAreaVal.trim());
      }
      chrome.storage.local.set(data,function(){
        $scope.getData(); //call to getData function again to refresh view
      })
    });
  }

  $scope.getData = function(){
    var askForPromise = dataService.GetData();
    askForPromise.then(
      function(data){
        $scope.allData = data;
      },
      function(){
        console.log("Some error in receiving data");
      }
    )
  }

  $scope.getData();

  $scope.setQueryText = function(event){
    $scope.textAreaVal = event.target.textContent.trim();
  }
});

app.service("dataService",function($q){
  return{
    GetData: function(){
      var defferdObj = $q.defer();
      chrome.storage.local.get(null,function(data){
        defferdObj.resolve(data);
      })
      return defferdObj.promise;
    }
  }
})
