app.config(function($routeProvider,$sceDelegateProvider){
  var chromeExtensionUrl = "chrome-extension://" + chrome.runtime.id + "**";
  //whitelisting chromeExtensionUrl so that every html from the extension is allowed to be rendered by angular
  $sceDelegateProvider.resourceUrlWhitelist(["self",chromeExtensionUrl]);

  $routeProvider
    .when("/",{
      templateUrl : chrome.extension.getURL("templates/allData.html"),
      controller : "allDataController"
    })
    .when("/bookmarks",{
      template: "<p>Work in progress</p>"
    })
    .otherwise({
      redirectTo: "/"
    });
})
