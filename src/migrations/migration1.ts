import { Migration } from './interface';
import { getDataForPath, clearStorage, setDataToPath, serializeMap } from '../common/HelperFunctions';
/**
 * Converts obj in each path (query, search and execute) to
 * new data structure into map
 */
class Migration1 implements Migration {
  private allData: Object;
  private extensionState: Object;
  private statesKey = 'extension_states';

  async shouldUpgrade() {
    this.allData = await getDataForPath(null); // 'null' gets all the data for all paths
    if (this.allData.hasOwnProperty(this.statesKey)) {
      this.extensionState = this.allData[this.statesKey];
      delete this.allData[this.statesKey]; // no need to migrate extension_states
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
    await clearStorage();
    for (const [path, data] of Object.entries(this.allData)) {
      const dateMap = new Map<string, string>();
      const sortedDates = Object.keys(data).sort((a, b) => new Date(b).valueOf() - new Date(a).valueOf());
      for (const currentDate of sortedDates) {
        const timeDetailsMap = new Map<number, object>();
        // Set key as timestamp and a obj with 'data' set to query/search value
        data[currentDate].map(info => timeDetailsMap.set(info[0], { data: info[1] }));
        dateMap.set(currentDate, serializeMap(timeDetailsMap));
      }
      await setDataToPath(path, serializeMap(dateMap));
      if (Object.keys(this.extensionState).length) {
        await setDataToPath(this.statesKey, this.extensionState);
      }
    }
  }
}

export async function migration1() {
  const migration1 = new Migration1();
  if (await migration1.shouldUpgrade()) {
    await migration1.upgrade();
  }
}
