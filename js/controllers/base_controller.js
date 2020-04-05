app.controller("baseController", function ($scope, $filter, dataService) {
  $scope.isAllLinkActive = true;

  const GetExtensionState = function () {
    const askForPromise = dataService.GetExtensionStates();
    askForPromise.then(function (data) {

      if ($filter("isEmpty")(data["extension_states"])) { //when no object for the key "extension_states" found,create the object
        data["extension_states"] = {};
        $scope.state = true; // set the default state of extension to true i.e. "open"
      }
      if (data["extension_states"].hasOwnProperty(pathname)) {
        $scope.state = data["extension_states"][pathname];
      }
      else {
        $scope.state = true; // again set the default state of extension to true i.e. "open"
      }
      data["extension_states"][pathname] = $scope.state;
      chrome.storage.local.set(data, function () {

      })
    },
      function (err) {
        console.log("Following error in receiving extension states " + err);
      })
  }

  GetExtensionState(); //call on page load

  const SetExtensionState = function () {
    const askForPromise = dataService.GetExtensionStates();
    askForPromise.then(function (data) {
      data["extension_states"][pathname] = $scope.state;
      chrome.storage.local.set(data, function () {

      })
    },
      function (err) {
        console.log("Following error in receiving extension states " + err);
      })
  }

  $scope.ToggleExtension = function () {
    $scope.state = !$scope.state;
    SetExtensionState();
  }

  $scope.allDataObj = {}; //creating an object for all calling allDataController methods using prototypical inheritance
});

