import React, { ReactNode } from 'react';
import { Box } from '@material-ui/core';

type TabPanelProps = {
  children?: ReactNode
  value: number;
  index: number;
}

export function TabPanel(props: TabPanelProps): JSX.Element {
  const { value, index, children } = props;
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

