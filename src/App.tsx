import React, { ReactElement, useState, ChangeEvent, useCallback } from 'react';
import './app.scss';
import {
  Drawer,
  IconButton,
  makeStyles,
  Theme,
  TextField,
  InputAdornment,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';

import clsx from 'clsx';
import { updateExtensionState, deleteFromStorage, updateProperty } from './StorageServices';

import { QueryDataMap } from './common/Types';
import { TabPanel } from './TabPanel';
import { getBookmarkedData } from './common/HelperFunctions';

const drawerWidth = 300;

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

export type AppProps = {
  output: QueryDataMap,
  defaultDrawerState: boolean,
  currentPathName: string
};

export function App(props: AppProps): ReactElement {
  const { output, defaultDrawerState, currentPathName } = props;
  const classes: Record<string, string> = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(defaultDrawerState);
  const [searchTerm, setSearchTerm] = useState('');
  const [allData, setAllData] = useState(output);
  const [tabValue, setTabValue] = useState(0);
  const bookmarkedData: QueryDataMap = getBookmarkedData(allData);

  const updateDrawerState = useCallback(async (newState: boolean) => {
    setDrawerOpen(newState);
    await updateExtensionState(currentPathName, newState);
  }, []);

  const handleSearchTermUpdate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleDelete = useCallback(async (timestamp: number, dateToDeleteFrom: string) => {
    const updatedData = await deleteFromStorage(timestamp, dateToDeleteFrom, currentPathName, allData);
    setAllData(() => new Map([...updatedData]));
  }, []);

  const setIsBookmarked = useCallback(async (timestamp: number, dateToUpdateFrom: string, value: boolean) => {
    const updatedData = await updateProperty(
      { isBookmarked: value },
      timestamp,
      dateToUpdateFrom,
      currentPathName,
      allData
    );
    setAllData(() => new Map([...updatedData]));
  }, []);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        data-testid="open-drawer-button"
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
          <IconButton onClick={() => updateDrawerState(false)} data-testid="close-drawer-button">
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div data-testid="data-div">
          <TextField
            variant="outlined"
            className={classes.inputField}
            value={searchTerm}
            onChange={handleSearchTermUpdate}
            data-testid="search-text-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="All" />
            <Tab label="Bookmarked" />
          </Tabs>
        </AppBar>
        <TabPanel
          value={tabValue}
          index={0}
          data={allData}
          searchTerm={searchTerm}
          handleDelete={handleDelete}
          setIsBookmarked={setIsBookmarked}
        />
        <TabPanel
          value={tabValue}
          index={1}
          data={bookmarkedData}
          searchTerm={searchTerm}
          handleDelete={handleDelete}
          setIsBookmarked={setIsBookmarked}
        />
      </Drawer>
    </div >
  );
}
