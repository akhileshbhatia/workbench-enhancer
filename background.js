chrome.runtime.onInstalled.addListener(function (object) {
  chrome.tabs.create({url: "http://jrod.in/workbench-enhancer"}, function (tab) {
    console.log("New tab launched with http://yoursite.com/");
  });
});