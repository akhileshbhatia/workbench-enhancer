import React from 'react';
import { RenderResult, render, fireEvent, getByTestId } from '@testing-library/react';
import { QueryDetailsProps, QueryDetails } from './QueryDetails';
import { updateTextArea, getHoursAndMinsFromTimestamp } from './common/HelperFunctions';

jest.mock('./common/HelperFunctions');

describe('QueryDetails', () => {
  let component: RenderResult;
  let handleDelete;

  const init = (): void => {
    const props: QueryDetailsProps = {
      timestamp: 1411070714,
      details: { data: 'test-data', isBookmarked: false },
      handleDelete,
      setIsBookmarked: jest.fn()
    };
    component = render(<QueryDetails {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    handleDelete = jest.fn();
    (getHoursAndMinsFromTimestamp as jest.Mock).mockReturnValue('10:45');
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
    fireEvent.click(getByTestId(component.container, 'querydata-component'));
    expect((updateTextArea as jest.Mock)).toHaveBeenCalledTimes(1);
    expect((updateTextArea as jest.Mock)).toHaveBeenCalledWith('test-data');
  });

});
