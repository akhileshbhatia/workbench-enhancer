import React from 'react';
import { RenderResult, render, fireEvent, getByTestId } from '@testing-library/react';
import { QueryDetailsProps, QueryDetails } from './QueryDetails';

describe('QueryDetails', () => {
  let component: RenderResult;
  const handleDelete = jest.fn();

  const init = (timestamp: number, data: string): void => {
    const props: QueryDetailsProps = {
      timestamp,
      details: { data },
      handleDelete
    };
    component = render(<QueryDetails {...props} />);
  };

  it('renders the component correctly', () => {
    init(20212021, 'test-data');
    expect(component).toMatchSnapshot();
  });

  it('calls the handleDelete function', () => {
    init(20212021, 'test-data');
    fireEvent.click(getByTestId(component.container, 'delete-icon'));
    expect(handleDelete).toHaveBeenCalled();
  });
});
