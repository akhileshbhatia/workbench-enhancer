chrome.runtime.onInstalled.addListener((details) => {
  if (details && details.reason === 'update') {
    chrome.storage.local.get('query', (data) => {
      console.log(details);
      console.log(data);
      const dateMap = new Map();
      const timeQueryMap = new Map();
      timeQueryMap.set(1488585600, 'select old_data from table');
      timeQueryMap.set(1488581230, 'select new_data from new_table');
      dateMap.set('04 March 2017', timeQueryMap);

      const timeQueryMap2 = new Map();
      timeQueryMap2.set(1488585098, 'select old_data from table');
      timeQueryMap2.set(1488581315, 'select new_data from new_table');
      dateMap.set('10 October 2020', timeQueryMap2);
      const obj = {
        query: dateMap
      };
      console.log(obj);
    });
  }
});
