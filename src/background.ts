import { migration1 } from './migrations/migration1'; // TODO: Convert this into dynamic import

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details && details.reason === 'update') {
    await migration1();
  }
});
