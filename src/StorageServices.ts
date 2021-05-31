import {
  getFormattedDateAndTimestamp,
  setDataToChromeStorage,
  getDataFromChromeStorage,
  formatQueryDataMapToString
} from './common/HelperFunctions';
import { extensionStateKey } from './common/Constants';
import { ChromeStorageQueryData, QueryDataMap, TimeDetailsMap } from './common/Types';

export async function addToStorage(
  dataForPath: QueryDataMap,
  currentPathName: string,
  newData: ChromeStorageQueryData
): Promise<void> {

  const { formattedDate, timestamp: newTimestamp } = getFormattedDateAndTimestamp();
  const dataForPathArray = [...dataForPath];
  /*
    Since we can only insert at TODAY's date (and not in past or future), that means we only need to check
    the latest date if it exists. If the date exists, that means we need to update that date's map.
    If it doesn't exist, that means we need a new entry for that date
  */
  const latestDate = !!dataForPathArray.length && dataForPathArray[0][0];
  if (latestDate && (latestDate === formattedDate)) {
    // convert the existing details map to array to insert into beginning
    const existingMapArray = [...dataForPathArray[0][1]];
    existingMapArray.unshift([newTimestamp, newData]); // insert the new record
    dataForPathArray[0][1] = new Map(existingMapArray); // convert back to map
  } else {
    const newMap = new Map() as TimeDetailsMap;
    newMap.set(newTimestamp, newData);
    dataForPathArray.unshift([formattedDate, newMap]); // insert new record in the data
  }
  await setDataToChromeStorage(currentPathName, formatQueryDataMapToString(new Map(dataForPathArray)));
}

export async function updateExtensionState(currentPathName: string, newState: boolean): Promise<void> {
  const currentExtensionStates = await getDataFromChromeStorage(extensionStateKey) || {};
  currentExtensionStates[currentPathName] = newState;
  await setDataToChromeStorage(extensionStateKey, currentExtensionStates);
}

export async function deleteFromStorage(
  timestamp: number,
  dateToDeleteFrom: string,
  currentPathName: string,
  allData: QueryDataMap
): Promise<QueryDataMap> {
  const detailsMap = allData.get(dateToDeleteFrom);
  detailsMap.delete(timestamp);
  if (detailsMap.size > 0) {
    allData.set(dateToDeleteFrom, detailsMap); // Reset the new map for the same date
  } else {
    allData.delete(dateToDeleteFrom); // remove the date if it has no data
  }
  await setDataToChromeStorage(currentPathName, formatQueryDataMapToString(allData));
  return allData;
}

export async function updateProperty(
  newData: Record<string, unknown>,
  timestamp: number,
  dateToUpdateFrom: string,
  currentPathName: string,
  allData: QueryDataMap
): Promise<QueryDataMap> {
  const [propertyToUpdate, newValue] = Object.entries(newData)[0];
  const detailsMap = allData.get(dateToUpdateFrom);
  const data = detailsMap.get(timestamp);

  data[propertyToUpdate] = newValue;

  detailsMap.set(timestamp, data);
  allData.set(dateToUpdateFrom, detailsMap);

  await setDataToChromeStorage(currentPathName, formatQueryDataMapToString(allData));
  return allData;
}
