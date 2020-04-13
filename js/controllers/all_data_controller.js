app.controller('allDataController', function ($scope, $filter, dataService) {
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  $scope.allDataObj.textAreaVal = '';
  $scope.readMoreLessBtn = { 'clicked': false };
  $scope.accordionArray = [];

  $scope.allDataObj.addDataToStorage = async () => {
    if ($scope.allDataObj.textAreaVal.trim() != '') {
      const date = new Date(); // Use for todays date
      // var date = new Date(2017, 02, 04); //new Date(yyyy,mm,dd). Use for specific dates. Months ordered from 0 in javascript
      const todaysDate = $filter('date')(date, 'dd MMM yyyy');
      const currentTime = Math.round(date / 1000);
      const dataToSave = [currentTime, $scope.allDataObj.textAreaVal.trim()];
      const queries = JSON.parse(JSON.stringify($scope.queryDetails));// deep copy
      /* 
        Deep copying just to update the data into chrome storage.
        Could have updated the scope object directly but there is no need to do that
        because the page will be refreshed anyway, so getData will update the scope object.
        This helps prevent an uneccesary run of the angularjs digest cycle
      */
      if (queries.hasOwnProperty(todaysDate)) {
        queries[todaysDate].unshift(dataToSave);
      }
      dataService.setData(queries);
    }
  };

  const updateTextAreaWithLatestQuery = () => {
    if ($scope.sortedDates.length >= 1) { //atleast one date present
      $scope.allDataObj.textAreaVal = $scope.queryDetails[$scope.sortedDates[0]][0][1];
    }
  }

  const getData = async () => {
    try {
      $scope.queryDetails = await dataService.getData();
    } catch (err) {
      console.log('Error in obtaining data from storage ', err);
    }
    if (!$filter('isEmpty')($scope.queryDetails)) {
      $scope.sortedDates = Object.keys($scope.queryDetails).sort((a, b) => new Date(b) - new Date(a));
      updateTextAreaWithLatestQuery();
    }
  };

  getData(); //to be called on page load. Cannot be converted to IIFE because needs to called when a query is deleted as well

  $scope.setQueryText = (text) => {
    if (!$scope.readMoreLessBtn.clicked) {
      $scope.allDataObj.textAreaVal = text.trim();
    }
    $scope.readMoreLessBtn.clicked = false;
  };

  $scope.deleteQuery = (deleteFromDate, arrayToDelete) => {
    const index = $scope.queryDetails[deleteFromDate].indexOf(arrayToDelete);
    if (index !== -1) {
      $scope.queryDetails[deleteFromDate].splice(index, 1);
      if ($scope.queryDetails[deleteFromDate].length == 0) {
        delete $scope.queryDetails[deleteFromDate];
      }
      updateTextAreaWithLatestQuery();
      dataService.setData($scope.queryDetails);
    } else {
      console.log('No such query found');
    }
  };

});


app.filter('isEmpty', () => (data) => angular.equals({}, data) || data == undefined || data == null);