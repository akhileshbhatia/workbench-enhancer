app.controller('baseController', function ($scope, $filter, dataService) {
  $scope.isAllLinkActive = true;
  let stateInfo;

  (async () => {
    try {
      stateInfo = await dataService.getExtensionStates();
    } catch (err) {
      console.log('Error in receiving extension states ', err);
    }

    if ($filter('isEmpty')(stateInfo['extension_states'])) { //when no object for the key 'extension_states' found, create the object
      stateInfo['extension_states'] = {};
      $scope.state = true; // set the default state of extension to true i.e. 'open'
    } else {
      $scope.state = stateInfo['extension_states'].hasOwnProperty(pathname) ? stateInfo['extension_states'][pathname] : true;
    }

    stateInfo['extension_states'][pathname] = $scope.state;

    chrome.storage.local.set(stateInfo);
  })(); //IIFE because we need the extension states as soon as we load the page

  $scope.toggleExtensionState = function () {
    $scope.state = !$scope.state;
    stateInfo['extension_states'][pathname] = $scope.state;
    chrome.storage.local.set(stateInfo);
  };

  $scope.allDataObj = {}; //creating an object for all calling allDataController methods using prototypical inheritance
});
