import React, { ReactElement, Fragment, useState } from 'react';
import { Link } from '@material-ui/core';
import './app.scss';

export default function QueryData(props): ReactElement {
  const [showMore, changeShowMore] = useState(true);

  if (props.data.length <= 50) {
    return props.data;
  }
  if (showMore) {
    return (
      <Fragment>
        {props.data.substr(0, 50)}
        ...<Link onClick={() => changeShowMore(false)}>Show More</Link>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        {props.data}
        <Link onClick={() => changeShowMore(true)}>Show Less</Link>
      </Fragment>
    )
  }
}
