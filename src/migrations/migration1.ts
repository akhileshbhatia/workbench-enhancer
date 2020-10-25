import { Migration } from './interface';
import { getDataForPath, clearStorage, setDataToPath, serializeMap } from '../common/HelperFunctions';
/**
 * Converts obj in each path (query, search and execute) to
 * new data structure into map
 */
class Migration1 implements Migration {
  private allData: Object;

  async shouldUpgrade() {
    this.allData = await getDataForPath(null); // 'null' gets all the data for all paths
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
        const timeQueryMap = new Map<number, string>();
        // Set timestamp as key and query as value in timeQueryMap
        data[currentDate].map(info => timeQueryMap.set(info[0], info[1]));
        dateMap.set(currentDate, serializeMap(timeQueryMap));
      }
      await setDataToPath(path, serializeMap(dateMap));
    }
  }
}

export async function migration1() {
  const migration1 = new Migration1();
  if (await migration1.shouldUpgrade()) {
    await migration1.upgrade();
  }
}
