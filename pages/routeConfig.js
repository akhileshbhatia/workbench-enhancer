app.config(function ($routeProvider, $sceDelegateProvider) {
  const chromeExtensionUrl = "chrome-extension://" + chrome.runtime.id + "**";
  //whitelisting chromeExtensionUrl so that every html from the extension is allowed to be rendered by angular
  $sceDelegateProvider.resourceUrlWhitelist(["self", chromeExtensionUrl]);

  $routeProvider
    .when("/", {
      templateUrl: chrome.extension.getURL("templates/allData.html"),
      controller: "allDataController"
    })
    .otherwise({
      redirectTo: "/"
    });
})
