export function getDataForPath(path: string) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(path, (data) => resolve(data));
    } catch (err) {
      reject(err);
    }
  });
}

export function clearStorage() {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.clear(() => resolve());
    } catch (err) {
      reject(err);
    }
  });
}

export function setDataToPath(path: string, data: string | Object) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ [path]: data }, () => {
        if (chrome.runtime.lastError) {
          reject('Error in setting data to chrome storage');
        }
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function serializeMap(map) {
  return JSON.stringify(Array.from(map.entries()));
}

export function deserializeToMap(data: any) {
  return new Map(JSON.parse(data));
}

export function deserializeData(data: string) {
  const dateMap = deserializeToMap(data);
  const finalMap = new Map();
  for (const [date, info] of dateMap.entries()) {
    const newValue = deserializeToMap(info);
    finalMap.set(date, newValue);
  }
  return { output: finalMap };
}

export function getFormattedTime(timestamp: string): string {
  const date = new Date(+timestamp * 1000);
  return `${date.getHours()}:${date.getMinutes()}`;
}
