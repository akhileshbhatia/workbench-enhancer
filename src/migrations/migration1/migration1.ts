import { Migration } from '../interface';
import {
  getDataFromChromeStorage,
  clearStorage,
  setDataToChromeStorage,
  serializeMap
} from '../../common/HelperFunctions';
import { extensionStateKey } from '../../common/Constants';
/**
 * Converts obj in each path (query, search and execute) to
 * new data structure into map
 */
export class Migration1 implements Migration {
  private allData: Record<string, any>;
  private extensionState: Record<string, any>;

  async shouldUpgrade() {
    this.allData = await getDataFromChromeStorage(null); // 'null' gets all the data for all keys
    if (this.allData.hasOwnProperty(extensionStateKey)) {
      this.extensionState = this.allData[extensionStateKey];
      delete this.allData[extensionStateKey];
    }
    let doUpgrade = false;
    const allKeys = Object.keys(this.allData);
    if (allKeys.length > 0) {
      for (let i = 0; i < allKeys.length; i++) {
        if (this.allData[allKeys[i]].constructor === Object) {
          doUpgrade = true;
          break;
        }
      }
    }
    return doUpgrade;
  }

  async upgrade() {
    if (!await this.shouldUpgrade()) {
      return;
    }
    await clearStorage();
    for (const [path, data] of Object.entries(this.allData)) {
      const dateMap = new Map<string, string>();
      const sortedDates = Object.keys(data).sort((a, b) => new Date(b).valueOf() - new Date(a).valueOf());
      for (const currentDate of sortedDates) {
        const timeDetailsMap = new Map<number, Record<string, unknown>>();
        // Set key as timestamp and a obj with 'data' set to query/search value
        data[currentDate].map(info => timeDetailsMap.set(info[0], { data: info[1] }));
        dateMap.set(currentDate, serializeMap<number, Record<string, unknown>>(timeDetailsMap));
      }
      await setDataToChromeStorage(path, serializeMap<string, string>(dateMap));
      if (Object.keys(this.extensionState).length) {
        await setDataToChromeStorage(extensionStateKey, this.extensionState);
      }
    }
  }
}

export async function migration1(): Promise<void> {
  const migration1 = new Migration1();
  if (await migration1.shouldUpgrade()) {
    await migration1.upgrade();
  }
}
