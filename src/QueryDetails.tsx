import React, { ReactElement, useState } from 'react';
import './app.scss';
import { getHoursAndMinsFromTimestamp } from './common/HelperFunctions';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/StarBorder';
import QueryText from './QueryText';

export default function QueryDetails(props): ReactElement {
  const [time, details] = Object.values(props);
  const [showMore, changeShowMore] = useState(true);
  const propsForQueryText = {
    details,
    showMore,
    changeShowMore
  }
  return (
    <div className='row'>
      <div className='column-flex-2'>
        <b>{getHoursAndMinsFromTimestamp(time)}</b>
      </div>
      <div className='column-flex-6'>
        <QueryText {...propsForQueryText} />
      </div>
      <div className='column-flex-1 cursor-pointer'>
        <DeleteIcon />
      </div>
      <div className='column-flex-1 cursor-pointer'>
        <StarIcon />
      </div>
    </div>
  )
}


