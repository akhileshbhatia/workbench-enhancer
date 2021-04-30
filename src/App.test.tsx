import React from 'react';
import { AppProps, App } from './App';
import { RenderResult, render, fireEvent, getByTestId, waitFor } from '@testing-library/react';
import { QueryDataMap, TimeDetailsMap } from './common/Types';
import { getRandomTimestamp } from './test/HelperFunctions';

describe('App', () => {
  let component: RenderResult;
  let queryDataMap: QueryDataMap;
  let timeDetailsMap: TimeDetailsMap;

  beforeEach(() => {
    jest.useFakeTimers();
    queryDataMap = new Map() as QueryDataMap;
    timeDetailsMap = new Map() as TimeDetailsMap;
  });

  const init = (dataArray: string[] = [], defaultDrawerState = true, currentPathName = 'query'): void => {
    dataArray.map(data => {
      timeDetailsMap.set(getRandomTimestamp(), { data });
    });
    if (timeDetailsMap.size) { // Only add to queryDataMap if there is atleast one data
      queryDataMap.set('12 March 2021', timeDetailsMap);
    }
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
    });
    fireEvent.click(getByTestId(component.container, 'open-drawer-button'));
    await waitFor(() => {
      expect(getDrawerDivVisibility()).toBe('visible');
    });
  });
});
