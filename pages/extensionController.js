app.controller("workbenchEnhancerController",function($scope,$filter,dataService){
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  $scope.accordionArray = [];

  var pathname = dataService.GetPathName();

  $scope.addDataToStorage = function(event){
    event.preventDefault();
    if($scope.textAreaVal != ""){
      var date = new Date(); // Use for todays date
      //var date = new Date(2017,01,21); //new Date(yyyy,mm,dd). Use for specific dates. Months ordered from 0 in javascript
      var todaysDate = $filter("date")(date,"dd MMM yyyy");
      var currentTime = Math.round(date/1000);
      var dataToSave = [currentTime,$scope.textAreaVal.trim()];
      chrome.storage.local.get(pathname,function(data){
        if(angular.equals({},data[pathname])){ // if absolutely no data found, create new empty object
          data[pathname] = {};
        }
        if(data[pathname].hasOwnProperty(todaysDate)){ // check if object has that key already
          data[pathname][todaysDate].unshift(dataToSave);
        }
        else{ // if key doesnt exist, create a new one
          data[pathname][todaysDate] = [dataToSave];
        }
        chrome.storage.local.set(data,function(){
          getData(); //call to getData function again to refresh view
        })
      });
    }
  }

  var getData = function(){
    var askForPromise = dataService.GetData();
    askForPromise.then(
      function(data){
        //$scope.storageData = {};
        $scope.storageData = data[pathname];
        if($scope.storageData != undefined){
          $scope.sortedDates = Object.keys($scope.storageData).sort(function(a,b){
            return (new Date(b) - new Date(a));
          });
        }
      },
      function(){
        console.log("Some error in receiving data");
      }
    )
  }
  getData(); //call on page load

  $scope.setQueryText = function(text){
    $scope.textAreaVal = text.trim();
  }

  $scope.deleteQuery = function(deleteFromDate,arrayToDelete){
    //get the index of the data to delete from scope
    var scopeQueriesArray = $scope.storageData[deleteFromDate];
    var index = scopeQueriesArray.indexOf(arrayToDelete);
    if(index != -1){
      //delete that data from storage and refresh view
      chrome.storage.local.get(pathname,function(data){
        var storageQueriesArray = data[pathname][deleteFromDate];
        storageQueriesArray.splice(index,1);
        if(storageQueriesArray.length == 0){ //delete that key from storage if no data present for that date
          delete data[pathname][deleteFromDate];
        }
        chrome.storage.local.set(data,function(){
          getData(); //update data on view
        })
      })
    }
    else{
      console.log("No such data found");
    }
  }
});

app.service("dataService",function($q){
  var pathname = window.location.pathname.replace("/","").replace(".php","");
  return{
    GetData: function(){
      var defferdObj = $q.defer();
      chrome.storage.local.get(pathname,function(data){
        defferdObj.resolve(data);
      })
      return defferdObj.promise;
    },
    GetPathName: function(){
      return pathname;
    }
  }
})
