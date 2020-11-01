export function getDataForPath(path: string): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(path, (data) => {
        path === null ? resolve(data) : resolve(data[path]);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function clearStorage(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.clear(() => resolve());
    } catch (err) {
      reject(err);
    }
  });
}

export function setDataToPath(path: string, data: any): Promise<void> {
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

export function serializeMap<keyType, valueType>(map: Map<keyType, valueType>): string {
  return JSON.stringify(Array.from(map.entries()));
}

export function deserializeToMap<keyType, valueType>(data: string): Map<keyType, valueType> {
  return new Map(JSON.parse(data));
}

export function deserializeData(data: string): { output: Map<string, Map<number, Record<string, unknown>>> } {
  const dateMap = deserializeToMap<string, string>(data);
  const finalMap = new Map();
  for (const [date, info] of dateMap.entries()) {
    const newValue = deserializeToMap<number, Record<string, unknown>>(info);
    finalMap.set(date, newValue);
  }
  return { output: finalMap };
}

export function getFormattedTime(timestamp: string): any {
  const date = new Date(+timestamp * 1000);
  return `${date.getHours()}:${date.getMinutes()}`;
}
