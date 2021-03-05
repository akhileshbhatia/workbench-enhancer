import React, { ReactElement } from 'react';
import './app.scss';
import { getHoursAndMinsFromTimestamp } from './common/HelperFunctions';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/StarBorder';
import QueryData from './QueryData';

export default function QueryDetails(props): ReactElement {
  const { timestamp, details } = props;
  const updateTextArea = () => document.querySelector('textarea').value = details.data;
  return (
    <div className='row'>
      <div className='column-flex-2'>
        <b>{getHoursAndMinsFromTimestamp(timestamp)}</b>
      </div>
      <div className='column-flex-6' onClick={() => updateTextArea()}>
        <QueryData {...details} />
      </div>
      <div className='column-flex-1' onClick={() => props.handleDelete(timestamp)}>
        <DeleteIcon />
      </div>
      <div className='column-flex-1'>
        <StarIcon />
      </div>
    </div>
  )
}


