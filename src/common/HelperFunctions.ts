import { QueryDataMap, ChromeStorageQueryData, TimeDetailsMap } from './Types';

export function getDataFromChromeStorage(key: string): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, (data) => {
        key === null ? resolve(data) : resolve(data[key]);
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

export function setDataToChromeStorage(key: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ [key]: data }, () => {
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

export function deserializeData(data: string): { output: QueryDataMap } {
  const finalMap = new Map();
  if (data) {
    const dateMap = deserializeToMap<string, string>(data);
    for (const [date, info] of dateMap.entries()) {
      const newValue = deserializeToMap<number, ChromeStorageQueryData>(info);
      finalMap.set(date, newValue);
    }
  }
  return { output: finalMap };
}

export function getHoursAndMinsFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  // Pad 0 to hours and mins in case they are single digit
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${mins}`;
}

export function getFormattedDateAndTimestamp(): {
  formattedDate: string,
  timestamp: number
} {
  const todaysDate = new Date();
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(todaysDate);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(todaysDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(todaysDate);
  return {
    formattedDate: `${day} ${month} ${year}`,
    timestamp: Math.round(<number><unknown>todaysDate / 1000)
  };
}

export function updateTextArea(value: string): void {
  document.querySelector('textarea').value = value;
}

export async function formatDataAndAddtoStorage(
  dataArray: [string, TimeDetailsMap][],
  currentPathName: string
): Promise<void> {
  const dataToStore = new Map<string, string>();
  for (const [date, details] of dataArray) { // Serialize data again before storing
    dataToStore.set(date, serializeMap<number, Record<string, unknown>>(details));
  }
  await setDataToChromeStorage(currentPathName, serializeMap<string, string>(dataToStore));
}

export function getBookmarkedData(allData: QueryDataMap): QueryDataMap {
  const bookmarkedData = new Map() as QueryDataMap;
  allData.forEach((detailsMap, date) => {
    const bookmarkedTimeDetailsMap = new Map() as TimeDetailsMap;
    detailsMap.forEach((value, timestamp) => value.isBookmarked && bookmarkedTimeDetailsMap.set(timestamp, value));
    if (bookmarkedTimeDetailsMap.size) {
      bookmarkedData.set(date, bookmarkedTimeDetailsMap);
    }
  });
  return bookmarkedData;
}
