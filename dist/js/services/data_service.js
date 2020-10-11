app.service("dataService", function () {
  return {
    getData: () => {
      return new Promise((resolve, reject) => {
        try {
          chrome.storage.local.get(pathname, (data) => resolve(data[pathname]));
          /*Current structure of the data object is 
          {
            "query": {
              "10 Apr 2020": [[1586779425, 'select id from account'], [1586779447, 'select name from account']],
              '"9 Apr 2020": [[1346779425, 'select firstname from details'], [1581239447, 'select id from account']]
              ...
            },
            "search": {
              "10 Apr 2020": [[1586771698, 'search something'], [1586786716, 'search something else']]
              ...
            }  
          }
          Each date is a the key and the values are array of arrays. Each inner array has two values -
          first, timestamp of the query/search and second, the query/search string itself.
          */
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
    },
    setData: (data) => chrome.storage.local.set({ [pathname]: data }),
    setExtensionState: (stateInfo) => chrome.storage.local.set(stateInfo)
  }
});
