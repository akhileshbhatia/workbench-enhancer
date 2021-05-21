import React, { ReactNode } from 'react';

type TabPanelProps = {
  children: ReactNode
  value: number;
  index: number;
}

export function TabPanel(props: TabPanelProps): JSX.Element {
  const { value, index, children } = props;
  return (
    <div>
      {value === index && <div>{children}</div>}
    </div>
  );
}

