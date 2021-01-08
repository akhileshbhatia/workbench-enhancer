import React, { ReactElement, useState } from 'react';
import './app.scss';
import {
  Drawer,
  IconButton,
  makeStyles,
  Theme,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { updateExtensionState } from './AddToStorage';
import QueryDetails from './QueryDetails';

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
}));

export default function App(props): ReactElement {
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
            <Accordion key={date}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <div className='accordion-heading'>{date}</div>
              </AccordionSummary>
              {
                [...output.get(date).entries()].map((entry, index) => (
                  <AccordionDetails key={index}>
                    <QueryDetails {...entry} />
                  </AccordionDetails>
                ))
              }
            </Accordion>
          ))
        }
      </Drawer>
    </div >
  )
}


