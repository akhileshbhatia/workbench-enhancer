import React from 'react';
import { render, queryByTestId, fireEvent, RenderResult } from '@testing-library/react';
import { QueryData } from './QueryData';
import { ChromeStorageQueryData } from './common/Types';

describe('QueryData', () => {
  let component: RenderResult;
  const init = (data: string): void => {
    const props: ChromeStorageQueryData = { data };
    component = render(<QueryData {...props} />);
  };

  it('renders the component correctly', () => {
    init('test-data');
    expect(component).toMatchSnapshot();
  });

  it('does not display either of the two links', () => {
    init('Less than 50 characters');
    expect(queryByTestId(component.container, 'show-more-link')).toBeNull();
    expect(queryByTestId(component.container, 'show-less-link')).toBeNull();
  });

  it('displays show more link and just first 50 characters', () => {
    const data = 'Some dummy text more than fifty characters in length';
    init(data);
    expect(queryByTestId(component.container, 'show-more-link')).not.toBeNull();
    expect(component.container.firstChild.textContent).toBe(`${data.substr(0, 50)}...Show More`);
  });

  it('displays complete text on show more click', () => {
    const data = 'Some dummy text more than fifty characters in length';
    init(data);
    expect(queryByTestId(component.container, 'show-less-link')).toBeNull();
    fireEvent.click(queryByTestId(component.container, 'show-more-link'));
    expect(queryByTestId(component.container, 'show-less-link')).not.toBeNull();
    expect(component.container.firstChild.textContent).toBe(`${data}Show Less`);
  });

});

