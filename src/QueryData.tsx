import React, { ReactElement, useState } from 'react';
import { Link } from '@material-ui/core';
import './app.scss';
import { ChromeStorageQueryData } from './common/Types';

export function QueryData(props: ChromeStorageQueryData): ReactElement {
  const [showMore, changeShowMore] = useState(true);

  if (props.data.length <= 50) {
    return (
      <div>
        {props.data}
      </div>
    );
  }
  if (showMore) {
    return (
      <div>
        {props.data.substr(0, 50)}
        ...<Link data-testid="show-more-link" onClick={() => changeShowMore(false)}>Show More</Link>
      </div>
    );
  } else {
    return (
      <div>
        {props.data}
        <Link data-testid="show-less-link" onClick={() => changeShowMore(true)}>Show Less</Link>
      </div>
    );
  }
}
