import React, { ReactElement, useState, ChangeEvent } from 'react';
import './app.scss';
import {
  Drawer,
  IconButton,
  makeStyles,
  Theme,
  TextField,
  InputAdornment
} from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';

import clsx from 'clsx';
import { updateExtensionState } from './StorageServices';
import { setDataToChromeStorage, serializeMap } from './common/HelperFunctions';
import QueryAccordion from './QueryAccordion';
import { QueryDataMap } from './common/Types';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  inputField: {
    margin: theme.spacing(1),
    width: '90%',
    height: '70px'
  }
}));

type AppProps = {
  output: QueryDataMap,
  defaultDrawerState: boolean,
  currentPathName: string
};

export default function App(props: AppProps): ReactElement {
  const { output, defaultDrawerState, currentPathName } = props;
  const classes: Record<string, string> = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(defaultDrawerState);
  const [searchTerm, setSearchTerm] = useState('');
  const [allData, setAllData] = useState(output);

  const updateDrawerState = async (newState: boolean) => {
    setDrawerOpen(newState);
    await updateExtensionState(currentPathName, newState);
  };

  const handleSearchTermUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (timestamp: number, dateToDeleteFrom: string) => {
    const detailsMap = allData.get(dateToDeleteFrom);
    detailsMap.delete(timestamp);
    if (detailsMap.size > 0) {
      allData.set(dateToDeleteFrom, detailsMap); // Reset the new map for the same date
    } else {
      allData.delete(dateToDeleteFrom); // remove the date if it has no data
    }
    setAllData(() => new Map([...allData]));
    const dataToStore = new Map<string, string>();
    for (const [date, details] of allData.entries()) {
      dataToStore.set(date, serializeMap<number, Record<string, unknown>>(details));
    }
    await setDataToChromeStorage(currentPathName, serializeMap<string, string>(dataToStore));
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => updateDrawerState(true)}
        edge="end"
        className={clsx(classes.menuButton, drawerOpen && classes.hide)}
      >
        <ChevronRight />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => updateDrawerState(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div hidden={allData.size !== 0}>
          <h2>Please add queries/searches to see them here!</h2>
        </div>
        <div hidden={allData.size === 0}>
          <TextField
            variant="outlined"
            className={classes.inputField}
            value={searchTerm}
            onChange={handleSearchTermUpdate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div>
          {
            [...allData.keys()].map(date => {
              const entries = [...allData.get(date).entries()];
              const props = { date, entries, searchTerm, handleDelete };
              return <QueryAccordion key={date} {...props} />;
            })
          }
        </div>
      </Drawer>
    </div >
  );
}


