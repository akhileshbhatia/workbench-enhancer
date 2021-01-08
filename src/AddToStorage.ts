import {
  getFormattedDateAndTimestamp,
  setDataToPath,
  serializeMap,
  getDataForPath
} from './common/HelperFunctions';
import { extensionStateKey } from './common/Constants';

export function addToStorage(
  existingDataForPath: Map<string, Map<number, Record<string, unknown>>>,
  currentPathName: string): void {

  const queryBtn: HTMLElement = document.querySelector(`input[name='${currentPathName}Submit']`);
  const textarea: HTMLTextAreaElement = document.querySelector('textarea');
  const newDataForPath = new Map<string, string>();

  queryBtn.onclick = async () => {
    const { formattedDate, timestamp: newTimestamp } = getFormattedDateAndTimestamp();
    const newData = {
      data: textarea.value
    };
    let currentTimeDetailsMap = new Map<number, Record<string, unknown>>();
    if (existingDataForPath.has(formattedDate)) {
      currentTimeDetailsMap = existingDataForPath.get(formattedDate);
      existingDataForPath.delete(formattedDate);
    }
    const newTimeDetailsMap = new Map<number, Record<string, unknown>>();
    newTimeDetailsMap.set(newTimestamp, newData);
    newDataForPath.set
      (
        formattedDate,
        serializeMap<number, Record<string, unknown>>(new Map([...newTimeDetailsMap, ...currentTimeDetailsMap]))
      );
    await setDataToPath(currentPathName, serializeMap<string, string>(newDataForPath));
  }
}

export async function updateExtensionState(currentPathName: string, newState: boolean): Promise<void> {
  const currentExtensionStates = await getDataForPath(extensionStateKey) || {};
  currentExtensionStates[currentPathName] = newState;
  await setDataToPath(extensionStateKey, currentExtensionStates);
}
