app.service("dataService", function () {
  return {
    getData: () => {
      return new Promise((resolve, reject) => {
        try {
          chrome.storage.local.get(pathname, (data) => resolve(data[pathname]));
        } catch (err) {
          reject(err);
        }
      });
    },
    getExtensionStates: () => {
      return new Promise((resolve, reject) => {
        try {
          chrome.storage.local.get('extension_states', (data) => resolve(data));
        } catch (err) {
          reject(err);
        }
      });
    }
  }
});
