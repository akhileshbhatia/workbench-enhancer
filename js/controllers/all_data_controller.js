app.controller('allDataController', function ($scope, $filter, dataService) {
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  $scope.allDataObj.textAreaVal = '';
  $scope.readMoreLessBtn = { 'clicked': false };
  $scope.accordionArray = [];
  let queries;

  $scope.allDataObj.addDataToStorage = function () {
    if ($scope.allDataObj.textAreaVal.trim() != '') {
      const date = new Date(); // Use for todays date
      // var date = new Date(2017, 02, 04); //new Date(yyyy,mm,dd). Use for specific dates. Months ordered from 0 in javascript
      const todaysDate = $filter('date')(date, 'dd MMM yyyy');
      const currentTime = Math.round(date / 1000);
      const dataToSave = [currentTime, $scope.allDataObj.textAreaVal.trim()];
      chrome.storage.local.get(pathname, function (data) {
        if ($filter('isEmpty')(data[pathname])) { // if absolutely no data found, create new empty object
          data[pathname] = {};
        }
        if (data[pathname].hasOwnProperty(todaysDate)) { // check if object has that key already, if it does, add the data
          data[pathname][todaysDate].unshift(dataToSave);
        } else { // if key doesnt exist, create a new one
          data[pathname][todaysDate] = [dataToSave];
        }
        chrome.storage.local.set(data);
      });
    }
  };

  const getData = async () => {
    try {
      queries = await dataService.getData();
    } catch (err) {
      console.log('Error in obtaining data from storage ', err);
    }
    $scope.storageData = queries;
    if ($scope.storageData != undefined) {
      $scope.sortedDates = Object.keys($scope.storageData).sort((a, b) => new Date(b) - new Date(a));
      //set the text area to the latest query in the storage
      if ($scope.sortedDates.length >= 1) { //atleast one date present
        $scope.allDataObj.textAreaVal = $scope.storageData[$scope.sortedDates[0]][0][1];
      }
    }
  };

  getData(); //to be called on page load. Cannot be converted to IIFE because needs to called when a query is deleted as well

  $scope.setQueryText = function (text) {
    if (!$scope.readMoreLessBtn.clicked) {
      $scope.allDataObj.textAreaVal = text.trim();
    }
    $scope.readMoreLessBtn.clicked = false;
  };

  $scope.deleteQuery = (deleteFromDate, arrayToDelete) => {
    const index = queries[deleteFromDate].indexOf(arrayToDelete);
    if (index !== -1) {
      queries[deleteFromDate].splice(index, 1);
      if (queries[deleteFromDate].length == 0) {
        delete queries[deleteFromDate];
      }
      $scope.storageData = queries;
      chrome.storage.local.set({ [pathname]: queries });
    } else {
      console.log('No such query found');
    }
  }

  $scope.openAllPanels = function (searchQuery) {
    //doing this opens a panel if its closed while searching
    if (searchQuery.length >= 1) {
      $scope.accordionArray.fill(true);
    }
  }
});


app.filter('isEmpty', () => (data) => angular.equals({}, data) || data == undefined || data == null);