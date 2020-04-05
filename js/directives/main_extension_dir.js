//directive to show the extension div
app.directive("mainExtension", function () {
  const mainExtension = {};
  mainExtension.restrict = "A";
  mainExtension.templateUrl = chrome.extension.getURL("views/base.html");
  return mainExtension;
});
