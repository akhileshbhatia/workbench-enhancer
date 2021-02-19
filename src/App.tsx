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
import { updateExtensionState } from './UpdateStorage';
import QueryAccordion from './QueryAccordion';


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

export default function App(props): ReactElement {
  const { output, defaultDrawerState, currentPathName } = props;
  const classes: Record<string, string> = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(defaultDrawerState);
  const [searchTerm, setSearchTerm] = useState('');

  const updateDrawerState = async (newState: boolean) => {
    setDrawerOpen(newState);
    await updateExtensionState(currentPathName, newState);
  }

  const handleSearchTermUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

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
        <div hidden={output.size !== 0}>
          <h2>Please add queries/searches to see them here!</h2>
        </div>
        <div hidden={output.size === 0}>
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
            [...output.keys()].map(date => {
              const entries = [...output.get(date).entries()];
              const props = { date, entries, searchTerm };
              return <QueryAccordion key={date} {...props} />;
            })
          }
        </div>
      </Drawer>
    </div >
  )
}


