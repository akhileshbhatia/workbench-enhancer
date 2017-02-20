app.controller("workbenchEnhancerController",function($scope,$filter,dataService){
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  $scope.accordionArray = [];

  $scope.addDataToStorage = function(event){
    event.preventDefault();
    var date = new Date(); // Use for todays date
    //var date = new Date(2017,03,08); //new Date(yyyy,mm,dd). Use for specific dates. Months ordered from 0 in javascript
    var todaysDate = $filter("date")(date,"dd MMM yyyy");
    var currentTime = $filter("date")(date,"HH:mm");
    var dataToSave = [currentTime,$scope.textAreaVal.trim()];
    chrome.storage.local.get(todaysDate,function(data){
      if(angular.equals({},data)){ // //empty object means a new entry for that key will be made
        data[todaysDate] = [dataToSave];
      }
      else{
        data[todaysDate].unshift(dataToSave);
      }
      chrome.storage.local.set(data,function(){
        getData(); //call to getData function again to refresh view
      })
    });
  }

  var getData = function(){
    var askForPromise = dataService.GetData();
    askForPromise.then(
      function(data){
        $scope.storageData = data;
        $scope.sortedDates = Object.keys($scope.storageData).sort(function(a,b){
          return (new Date(b) - new Date(a));
        });
      },
      function(){
        console.log("Some error in receiving data");
      }
    )
  }
  getData(); //call on page load

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
