import React, { ReactElement, useState } from 'react';
import './app.scss';
import { Drawer, IconButton, makeStyles, Theme } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import { getHoursAndMinsFromTimestamp } from './common/HelperFunctions';
import { updateExtensionState } from './AddToStorage';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
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
}));

export function App(props): ReactElement {
  const { output, defaultDrawerState, currentPathName } = props;
  const classes: Record<string, string> = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(defaultDrawerState);

  const updateDrawerState = async (newState: boolean) => {
    setDrawerOpen(newState);
    await updateExtensionState(currentPathName, newState);
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
        {
          [...output.keys()].map(date => (
            <div key={date}>
              <h3>{date}</h3>
              {
                [...output.get(date).entries()].map(([time, details]) => (
                  <div key={time}>
                    <span><b>{getHoursAndMinsFromTimestamp(time)}</b></span>
                    <span>{details.data}</span>
                  </div>
                ))
              }
            </div>
          ))
        }
      </Drawer>
    </div >
  )
}


