import {
  getFormattedDateAndTimestamp,
  setDataToChromeStorage,
  serializeMap,
  getDataFromChromeStorage
} from './common/HelperFunctions';
import { extensionStateKey } from './common/Constants';

export async function addToStorage(
  dataForPath: Map<string, Map<number, Record<string, unknown>>>,
  currentPathName: string,
  newData: Record<string, string>): Promise<void> {

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
    const newMap = new Map<number, Record<string, unknown>>();
    newMap.set(newTimestamp, newData);
    dataForPathArray.unshift([formattedDate, newMap]); // insert new record in the data
  }
  const dateMap = new Map<string, string>();
  for (const [date, info] of dataForPathArray) { // Serialize data again before storing
    dateMap.set(date, serializeMap<number, Record<string, unknown>>(info));
  }

  await setDataToChromeStorage(currentPathName, serializeMap<string, string>(dateMap));

}

export async function updateExtensionState(currentPathName: string, newState: boolean): Promise<void> {
  const currentExtensionStates = await getDataFromChromeStorage(extensionStateKey) || {};
  currentExtensionStates[currentPathName] = newState;
  await setDataToChromeStorage(extensionStateKey, currentExtensionStates);
}
