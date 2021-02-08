import React, { ReactElement } from 'react';
import './app.scss';
import { getHoursAndMinsFromTimestamp } from './common/HelperFunctions';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/StarBorder';
import QueryData from './QueryData';

export default function QueryDetails(props): ReactElement {
  const [time, details] = Object.values(props);
  const updateTextArea = () => document.querySelector('textarea').value = details.data;
  return (
    <div className='row'>
      <div className='column-flex-2'>
        <b>{getHoursAndMinsFromTimestamp(time)}</b>
      </div>
      <div className='column-flex-6 cursor-pointer' onClick={() => updateTextArea()}>
        <QueryData {...details} />
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


