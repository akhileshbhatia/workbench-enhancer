import React, { ReactElement } from 'react';
import './app.scss';
import { getHoursAndMinsFromTimestamp, updateTextArea } from './common/HelperFunctions';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/StarBorder';
import { QueryData } from './QueryData';
import { ChromeStorageQueryData } from './common/Types';

export type QueryDetailsProps = {
  timestamp: number,
  details: ChromeStorageQueryData,
  handleDelete: (timestamp: number) => Promise<void>
};

export function QueryDetails(props: QueryDetailsProps): ReactElement {
  const { timestamp, details } = props;

  return (
    <div className='row'>
      <div className='column-flex-2'>
        <b>{getHoursAndMinsFromTimestamp(timestamp)}</b>
      </div>
      <div className='column-flex-6' data-testid="querydata-component" onClick={() => updateTextArea(details.data)}>
        <QueryData {...details} />
      </div>
      <div className='column-flex-1' data-testid="delete-icon" onClick={() => props.handleDelete(timestamp)}>
        <DeleteIcon />
      </div>
      <div className='column-flex-1' data-testid="bookmark-icon">
        <StarIcon />
      </div>
    </div>
  );
}
