app.controller("allDataController",function($scope,$filter,dataService){
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  $scope.allDataObj.textAreaVal = "";
  $scope.readMoreLessBtn = {"clicked" : false};
  $scope.accordionArray = [];
  var pathname = dataService.GetPathName();

// $scope.InitializeModelsForPath = function(){
//     switch (pathname) {
//       case "query":
//       $scope.querySelect = "";
//       $scope.queryOrderBy = "";
//       $scope.querySort = "";
//       $scope.queryNulls = "";
//       $scope.queryLimit = "";
//       $scope.queryFilter = "";
//       $scope.queryFilterCondition = "";
//       $scope.queryFilterValue = "";
//       break;
//       default:
//       break;
//
//     }
//   }
  $scope.allDataObj.AddDataToStorage = function(event){
    // event.preventDefault();
    if($scope.allDataObj.textAreaVal.trim() != ""){
      var date = new Date(); // Use for todays date
      //var date = new Date(2017,02,04); //new Date(yyyy,mm,dd). Use for specific dates. Months ordered from 0 in javascript
      var todaysDate = $filter("date")(date,"dd MMM yyyy");
      var currentTime = Math.round(date/1000);
      var properties = {};
      properties["isBookmarked"] = false;
      var dataToSave = [currentTime,$scope.allDataObj.textAreaVal.trim(),properties];
      chrome.storage.local.get(pathname,function(data){
        if($filter("isEmpty")(data[pathname])){ // if absolutely no data found, create new empty object
          data[pathname] = {};
        }
        if(data[pathname].hasOwnProperty(todaysDate)){ // check if object has that key already, if it does, add the data
          data[pathname][todaysDate].unshift(dataToSave);
        }
        else{ // if key doesnt exist, create a new one
          data[pathname][todaysDate] = [dataToSave];
        }
        chrome.storage.local.set(data,function(){

        })
      });
    }
  }

  var GetData = function(){
    var askForPromise = dataService.GetData();
    askForPromise.then(
      function(data){
        //$scope.storageData = {};
        $scope.storageData = data[pathname];
        if($scope.storageData != undefined){
          $scope.sortedDates = Object.keys($scope.storageData).sort(function(a,b){
            return (new Date(b) - new Date(a));
          });
          //set the text area to the latest query in the storage
          if($scope.sortedDates.length >=1){ //atleast one date present
            $scope.allDataObj.textAreaVal = $scope.storageData[$scope.sortedDates[0]][0][1];
          }
        }
      },
      function(){
        console.log("Some error in receiving data");
      }
    )
  }

  GetData(); //call on page load


$scope.SetQueryText = function(text){
  if(!$scope.readMoreLessBtn.clicked){
    $scope.allDataObj.textAreaVal = text.trim();
  }
  $scope.readMoreLessBtn.clicked = false;
}

$scope.DeleteQuery = function(deleteFromDate,arrayToDelete){
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
        GetData(); //update data on view
      })
    })
  }
  else{
    console.log("No such data found");
  }
}

// var SetWatches = function(){
//   switch (pathname) {
//     case "query":
//           $scope.$watchGroup(['querySelect','queryOrderBy','querySort','queryNulls',
//                               'queryLimit','queryFilter','queryFilterCondition','queryFilterValue'],
//                               function(){
//                                 console.dir(textarea);
//                               })
//           break;
//     default:
//           break;
//   }
// }
//
//  SetWatches();

$scope.OpenAllPanels = function(searchQuery){
  //doing this opens a panel if its closed while searching
  if(searchQuery.length >= 1){
    $scope.accordionArray.fill(true);
  }
}
});


app.filter("isEmpty",function(){
  return function(data) {
    return angular.equals({},data) || data == undefined || data == null;
  }
})
