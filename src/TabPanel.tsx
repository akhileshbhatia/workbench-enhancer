import React from 'react';
import { QueryDataMap } from './common/Types';
import { QueryAccordion } from './QueryAccordion';

type TabPanelProps = {
  value: number;
  index: number;
  data: QueryDataMap;
  searchTerm: string;
  handleDelete: (timestamp: number, date: string) => Promise<void>;
  setIsBookmarked: (timestamp: number, date: string, value: boolean) => Promise<void>;
}

export function TabPanel(props: TabPanelProps): JSX.Element {
  const { value, index, data, searchTerm, handleDelete, setIsBookmarked } = props;
  return (
    <div>
      {value === index &&
        <div>
          {
            [...data.keys()].map(date => {
              const entries = [...data.get(date).entries()];
              const props = { date, entries, searchTerm, handleDelete, setIsBookmarked };
              return <QueryAccordion key={date} {...props} />;
            })
          }
        </div>
      }
    </div>
  );
}

