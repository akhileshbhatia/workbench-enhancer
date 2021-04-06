import React from 'react';
import { AppProps, App } from './App';
import {
  RenderResult,
  render,
  fireEvent,
  getByTestId,
  waitFor,
  getAllByTestId,
  queryByTestId
} from '@testing-library/react';
import { QueryDataMap, TimeDetailsMap } from './common/Types';
import { updateExtensionState } from './StorageServices';
import { setDataToChromeStorage, serializeMap } from './common/HelperFunctions';
import { getRandomTimestamp } from './test/HelperFunctions';

jest.mock('./StorageServices', () => {
  return {
    updateExtensionState: jest.fn()
  };
});

jest.mock('./common/HelperFunctions', () => {
  const { getHoursAndMinsFromTimestamp, serializeMap } = jest.requireActual('./common/HelperFunctions');
  return {
    setDataToChromeStorage: jest.fn(),
    getHoursAndMinsFromTimestamp,
    serializeMap
  };
});

describe('App', () => {
  let component: RenderResult;
  let queryDataMap: QueryDataMap;
  let timeDetailsMap: TimeDetailsMap;

  beforeEach(() => {
    jest.useFakeTimers();
    queryDataMap = new Map();
    timeDetailsMap = new Map();
  });

  const init = (dataArray: string[] = [], defaultDrawerState = true, currentPathName = 'query'): void => {
    dataArray.map(data => {
      timeDetailsMap.set(getRandomTimestamp(), { data });
      queryDataMap.set('12 March 2021', timeDetailsMap);
    });
    const props: AppProps = {
      output: queryDataMap,
      defaultDrawerState,
      currentPathName
    };
    component = render(<App {...props} />);
  };

  const getDrawerDivVisibility = (): string => {
    const drawer = component.container.getElementsByClassName('MuiDrawer-root')[0].firstElementChild;
    return window.getComputedStyle(drawer).visibility;
  };

  // Deletes the top most item it can find
  const deleteItem = (): void => {
    fireEvent.click(getAllByTestId(component.container, 'delete-icon')[0]);
  };

  it('should match snapshot', () => {
    init();
    expect(component).toMatchSnapshot();
  });

  it('should hide the data div when there is no data', () => {
    init();
    expect(getByTestId(component.container, 'no-data-msg').hasAttribute('hidden')).toBeFalsy();
    expect(getByTestId(component.container, 'data-div').hasAttribute('hidden')).toBeTruthy();
  });

  it('should open the drawer by default', () => {
    init();
    expect(getDrawerDivVisibility()).toBe('visible');
  });

  it('should close the drawer by default', () => {
    init(undefined, false);
    expect(getDrawerDivVisibility()).toBe('hidden');
  });

  it('should toggle the drawer when button is clicked', async () => {
    const testPathName = 'test-path';
    init(undefined, undefined, testPathName);
    fireEvent.click(getByTestId(component.container, 'close-drawer-button'));
    await waitFor(() => {
      expect(getDrawerDivVisibility()).toBe('hidden');
      expect(updateExtensionState).toHaveBeenCalledWith(testPathName, false);
    });
    fireEvent.click(getByTestId(component.container, 'open-drawer-button'));
    await waitFor(() => {
      expect(getDrawerDivVisibility()).toBe('visible');
      expect(updateExtensionState).toHaveBeenCalledWith(testPathName, true);
    });
  });

  it('should delete elements as expected', async () => {
    const testPathName = 'test-path';
    const dataArray = ['select name from info', 'select id, date from details', 'select test from app_test'];
    init(dataArray, true, testPathName);
    // Check that all the item are present
    expect(getAllByTestId(component.container, 'accordion-details').length).toBe(dataArray.length);
    // Delete first item
    deleteItem();
    // Prepare expected output
    const dataToStore = new Map<string, string>();
    for (const [date, details] of queryDataMap.entries()) {
      dataToStore.set(date, serializeMap<number, Record<string, unknown>>(details));
    }
    await waitFor(() => {
      expect(setDataToChromeStorage).toHaveBeenCalledTimes(1);
      expect(setDataToChromeStorage).toHaveBeenCalledWith(testPathName, serializeMap<string, string>(dataToStore));
      // UI should now have one less item
      expect(getAllByTestId(component.container, 'accordion-details').length).toBe(dataArray.length - 1);
    });

    // Delete both the remaining items
    deleteItem();
    deleteItem();

    await waitFor(() => {
      expect(setDataToChromeStorage).toHaveBeenCalledTimes(3);
      expect(setDataToChromeStorage).toHaveBeenLastCalledWith(testPathName, serializeMap<string, string>(new Map()));
      expect(queryByTestId(component.container, 'accordion-details')).toBeNull();
    });
  });
});
