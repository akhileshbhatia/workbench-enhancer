import React, { ReactElement, useState } from 'react';
import './app.scss';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { QueryDetails } from './QueryDetails';
import { ChromeStorageQueryData } from './common/Types';

export type QueryAccordionProps = {
  date: string,
  searchTerm: string,
  handleDelete: (timestamp: number, date: string) => Promise<void>,
  entries: [number, ChromeStorageQueryData][]
}

export function QueryAccordion(props: QueryAccordionProps): ReactElement {
  const { date, entries, searchTerm } = props;
  const [openAccordion, setAccordionState] = useState(false);
  const toggleAccordionState = () => {
    setAccordionState(!openAccordion);
  };
  const doesDataMatchToSearch = (entry) => {
    // If there is no search term OR 'data' attribute exists and matches the search term
    // At this point, we can be sure that entry is an array with length atleast 2
    return !searchTerm || (!!entry[1].data && entry[1].data.includes(searchTerm));
  };

  return (
    <Accordion className="accordion" expanded={openAccordion || !!searchTerm}>
      <AccordionSummary
        className="accordion-summary"
        expandIcon={<ExpandMoreIcon />}
        data-testid="expand-collapse-link"
        onClick={() => toggleAccordionState()}
      >
        <div className="accordion-heading">{date}</div>
      </AccordionSummary>
      <div>
        {
          entries.map((entry, index) => {
            if (doesDataMatchToSearch(entry)) {
              const queryDetailsProps = {
                timestamp: entry[0],
                details: entry[1],
                handleDelete: (timestamp: number) => props.handleDelete(timestamp, date)
              };
              return (
                <AccordionDetails key={index} className="accordion-details" data-testid="accordion-details">
                  <QueryDetails {...queryDetailsProps} />
                </AccordionDetails>
              );
            }
          })
        }
      </div>
    </Accordion>
  );
}
