app.controller("workbenchEnhancerController",function($scope,$filter,dataService){
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  $scope.accordionArray = [];

  $scope.addDataToStorage = function(event){
    event.preventDefault();
    var date = new Date(); // Use for todays date
    //var date = new Date(2017,01,13); //new Date(yyyy,mm,dd). Use for specific dates. Months ordered from 0 in javascript
    var todaysDate = $filter("date")(date,"dd MMM yyyy");
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

  $scope.getData(); //call on page load

  $scope.setQueryText = function(event){
    $scope.textAreaVal = event.target.textContent.trim();
  }
});

// app.controller("workbenchEnhancerController",function($scope){
//   $scope.groups = [
//    {
//      title: 'Dynamic Group Header - 1',
//      content: 'Dynamic Group Body - 1'
//    },
//    {
//      title: 'Dynamic Group Header - 2',
//      content: 'Dynamic Group Body - 2'
//    }
//  ];
//
//  $scope.status = {
//    isFirstOpen: true,
//    isFirstDisabled: false
//  };
//  $scope.accordionArray = [];
// })

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
