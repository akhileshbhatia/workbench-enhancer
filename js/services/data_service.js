app.service("dataService", function ($q) {
  const pathname = window.location.pathname.replace("/", "").replace(".php", "").replace("#", "");
  return {
    GetData: function () {
      const defferdObj = $q.defer();
      chrome.storage.local.get(pathname, function (data) {
        defferdObj.resolve(data);
      })
      return defferdObj.promise;
    },
    GetPathName: function () {
      return pathname;
    },
    GetExtensionStates: function () {
      const defferdObj = $q.defer();
      chrome.storage.local.get("extension_states", function (data) {
        defferdObj.resolve(data);
      });
      return defferdObj.promise;
    }
  }
});
