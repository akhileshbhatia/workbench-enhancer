import { Migration1 } from './migration1';
import { extensionStateKey } from '../../common/Constants';
import {
  getDataFromChromeStorage,
  clearStorage,
  setDataToChromeStorage,
  serializeMap
} from '../../common/HelperFunctions';

let mockChromeStorageData;
let migration1;
jest.mock('../../common/HelperFunctions');

describe('Migration 1', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    migration1 = new Migration1();
    (getDataFromChromeStorage as jest.Mock).mockImplementation(() => mockChromeStorageData);
  });

  it('should not upgrade when no data in storage', async () => {
    mockChromeStorageData = {};
    expect(await migration1.shouldUpgrade()).toBeFalsy();
  });

  it('should not upgrade when data IS NOT in old format', async () => {
    // Data in a newer format
    mockChromeStorageData = {
      search: "[[\"05 Mar 2021\",\"[[1614931068,{\\\"data\\\":\\\"search1-old-extension\\\"}]]\"]]"
    };
    expect(await migration1.shouldUpgrade()).toBeFalsy();
  });

  it('should upgrade when data IS in old format', async () => {
    mockChromeStorageData = {
      search: {
        '10 April 2020': [[1586771698, 'search something'], [1586786716, 'search something else']]
      },
      [extensionStateKey]: {
        query: true,
        search: false
      }
    };
    expect(await migration1.shouldUpgrade()).toBeTruthy();
  });

  it('should upgrade correctly', async () => {
    mockChromeStorageData = {
      search: {
        '10 April 2020': [[1586771698, 'search something'], [1586786716, 'search something else']],
        '9 April 2020': [[1586774320, 'old search 1'], [1586779615, 'old search 2']]
      },
      [extensionStateKey]: {
        query: true,
        search: false
      }
    };
    (serializeMap as jest.Mock).mockImplementation(jest.requireActual('../../common/HelperFunctions').serializeMap);
    const expectedData = [
      'search',
      '[["10 April 2020","[[1586771698,{\\"data\\":\\"search something\\"}],' +
      '[1586786716,{\\"data\\":\\"search something else\\"}]]"],' +
      '["9 April 2020","[[1586774320,{\\"data\\":\\"old search 1\\"}],' +
      '[1586779615,{\\"data\\":\\"old search 2\\"}]]"]]'
    ];
    const expectedExtensionState = ['extension_states', { query: true, search: false }];
    await migration1.upgrade();
    expect((clearStorage as jest.Mock)).toHaveBeenCalledTimes(1);
    expect((setDataToChromeStorage as jest.Mock).mock.calls[0]).toEqual(expectedData);
    expect((setDataToChromeStorage as jest.Mock).mock.calls[1]).toEqual(expectedExtensionState);
  });
});
