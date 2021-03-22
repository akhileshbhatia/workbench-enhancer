import React from 'react';
import { QueryAccordion, QueryAccordionProps } from './QueryAccordion';
import { ChromeStorageQueryData } from './common/Types';
import { RenderResult, render, fireEvent, getByTestId, getAllByTestId } from '@testing-library/react';

describe('QueryAccordion', () => {
  let component: RenderResult;
  let handleDelete;
  let accordionSummary;

  const init = (dataArray: string[], searchTerm: string = ''): void => {
    const entries = [];
    dataArray.map(data => {
      const storageData: ChromeStorageQueryData = { data };
      entries.push([1616406887321, storageData]);
    });
    const props: QueryAccordionProps = {
      date: '12 March 2021',
      searchTerm,
      handleDelete,
      entries
    };
    component = render(<QueryAccordion {...props} />);
    accordionSummary = getByTestId(component.container, 'expand-collapse-link').firstElementChild;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    handleDelete = jest.fn();
  });

  it('renders the component correctly', () => {
    init(['test-data']);
    expect(component).toMatchSnapshot();
    expect(accordionSummary.className.includes('expanded')).toBeFalsy();
  });

  it('expands accordion if there is a search term', () => {
    init(['test-data'], 'test');
    expect(accordionSummary.className.includes('expanded')).toBeTruthy();
  });

  it('renders everything if there is no search term', () => {
    const dataArray = ['test-data', 'dummy-data'];
    init(dataArray);
    expect(getAllByTestId(component.container, 'accordion-details').length).toBe(dataArray.length);
  });

  it('toggles accordion', () => {
    init(['test-data']);
    fireEvent.click(accordionSummary);
    expect(accordionSummary.className.includes('expanded')).toBeTruthy();
    fireEvent.click(accordionSummary);
    expect(accordionSummary.className.includes('expanded')).toBeFalsy();
  });

  it('shows only results matching search term', () => {
    const dataArray = ['test-data', 'dummy-data'];
    init(dataArray, 'data');
    expect(getAllByTestId(component.container, 'accordion-details').length).toBe(2);
    init(dataArray, 'dummy');
    expect(getAllByTestId(component.container, 'accordion-details').length).toBe(1);
  });
});
