import React from 'react';
import { RenderResult, render, fireEvent, getByTestId } from '@testing-library/react';
import { QueryDetailsProps, QueryDetails } from './QueryDetails';
import * as HelperFunctions from './common/HelperFunctions';

describe('QueryDetails', () => {
  let component: RenderResult;
  let handleDelete;
  let updateTextAreaSpy;

  const init = (timestamp: number, data: string): void => {
    const props: QueryDetailsProps = {
      timestamp,
      details: { data },
      handleDelete
    };
    component = render(<QueryDetails {...props} />);
  };

  beforeEach(() => {
    handleDelete = jest.fn();
    init(20212021, 'test-data');
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
    expect(updateTextAreaSpy).toHaveBeenCalled();
  });

});
