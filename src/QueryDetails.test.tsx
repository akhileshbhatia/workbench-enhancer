import React from 'react';
import { RenderResult, render, fireEvent, getByTestId } from '@testing-library/react';
import { QueryDetailsProps, QueryDetails } from './QueryDetails';
import * as HelperFunctions from './common/HelperFunctions';
import { getRandomTimestamp } from './test/HelperFunctions';

describe('QueryDetails', () => {
  let component: RenderResult;
  let handleDelete;
  let updateTextAreaSpy;

  const init = (): void => {
    const props: QueryDetailsProps = {
      timestamp: getRandomTimestamp(),
      details: { data: 'test-data' },
      handleDelete
    };
    component = render(<QueryDetails {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    handleDelete = jest.fn();
    init();
  });

  it('renders the component correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('calls the handleDelete function', () => {
    fireEvent.click(getByTestId(component.container, 'delete-icon'));
    expect(handleDelete).toHaveBeenCalled();
  });

  it('calls the updateTextArea function', () => {
    document.getElementsByTagName('body')[0].appendChild(document.createElement('textarea')); // Add a textarea to body
    updateTextAreaSpy = jest.spyOn(HelperFunctions, 'updateTextArea');

    fireEvent.click(getByTestId(component.container, 'querydata-component'));
    expect(updateTextAreaSpy).toHaveBeenCalledTimes(1);
    expect(updateTextAreaSpy).toHaveBeenCalledWith('test-data');
  });

});
