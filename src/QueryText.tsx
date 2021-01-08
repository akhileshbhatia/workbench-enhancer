import React, { ReactElement, Fragment } from 'react';
import { Link } from '@material-ui/core';
import './app.scss';

const QueryText = (props): ReactElement => {
  if (props.details.data.length <= 50) {
    return props.details.data;
  }
  if (props.showMore) {
    return (
      <Fragment>
        {props.details.data.substr(0, 50)}
        ...<Link className='cursor-pointer' onClick={() => props.changeShowMore(false)}>Show More</Link>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        {props.details.data}
        ...<Link className='cursor-pointer' onClick={() => props.changeShowMore(true)}>Show Less</Link>
      </Fragment>
    )
  }
}

export default QueryText;
