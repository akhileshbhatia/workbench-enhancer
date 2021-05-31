import { addToStorage, updateExtensionState, deleteFromStorage } from './StorageServices';
import { ChromeStorageQueryData, QueryDataMap, TimeDetailsMap } from './common/Types';
import {
  getFormattedDateAndTimestamp,
  getDataFromChromeStorage,
  setDataToChromeStorage
} from './common/HelperFunctions';
import { getRandomTimestamp } from './test/HelperFunctions';
import { extensionStateKey } from './common/Constants';

jest.mock('./common/HelperFunctions');

describe('Storage services', () => {
  const pathName = 'test-path';
  describe('Add to storage', () => {
    let queryDataMap: QueryDataMap;
    let timeDetailsMap: TimeDetailsMap;
    let fakeDateAndTimestamp: ReturnType<typeof getFormattedDateAndTimestamp>;
    const newData: ChromeStorageQueryData = {
      data: 'And Then There Were None',
      isBookmarked: false
    };
    const timestamp = 1371561054;
    const dataArray = ['The Murder of Roger Ackroyd', 'The A.B.C Murders'];
    const defaultDate = '15 September 2021';

    beforeEach(() => {
      queryDataMap = new Map() as QueryDataMap;
      timeDetailsMap = new Map() as TimeDetailsMap;

      dataArray.forEach(data => {
        timeDetailsMap.set(getRandomTimestamp(), { data, isBookmarked: false });
      });
      if (timeDetailsMap.size) {
        queryDataMap.set(defaultDate, timeDetailsMap);
      }
      jest.clearAllMocks();
    });

    const init = (date: string) => {
      fakeDateAndTimestamp = {
        formattedDate: date,
        timestamp
      };
      (getFormattedDateAndTimestamp as jest.Mock).mockImplementation(() => fakeDateAndTimestamp);
    };

    it('adds to existing date if date exists', async () => {
      init(defaultDate);
      await addToStorage(queryDataMap, pathName, newData);
      // TO DO: Add expects
    });

    it('adds to new date if date does not exist', async () => {
      const date = '5 October 2021';
      init(date);
      await addToStorage(queryDataMap, pathName, newData);
      // TO DO: Add expects
    });
  });

  describe('Update extension state', () => {
    it('updates extension state object', async () => {
      (getDataFromChromeStorage as jest.Mock).mockImplementation(() => {
        return {
          [pathName]: true
        };
      });
      await updateExtensionState(pathName, false);
      expect((setDataToChromeStorage as jest.Mock)).toHaveBeenCalledWith(extensionStateKey, { [pathName]: false });
    });
  });

  describe('Delete from storage', () => {
    const timeDetailsMap = new Map() as TimeDetailsMap;
    const queryDataMap = new Map() as QueryDataMap;
    const defaultDate = '15 September 2021';
    const timestamps = [1392350458, 1410277586];
    const dataArray = ['Batman begins', 'The Dark Knight'];
    dataArray.forEach((data, index) => {
      timeDetailsMap.set(timestamps[index], { data, isBookmarked: false });
    });
    queryDataMap.set(defaultDate, timeDetailsMap);

    it('should keep the date till the last element is deleted', async () => {
      const expected: ChromeStorageQueryData = {
        data: dataArray[1], isBookmarked: false
      };
      let updatedData = await deleteFromStorage(timestamps[0], defaultDate, 'test', queryDataMap);
      expect(updatedData.size).toBe(1);
      expect(updatedData.get(defaultDate).get(timestamps[0])).toBeUndefined();
      expect(updatedData.get(defaultDate).get(timestamps[1])).toEqual(expected);

      updatedData = await deleteFromStorage(timestamps[1], defaultDate, 'test', queryDataMap);
      expect(updatedData.size).toBe(0);
    });
  });
});
