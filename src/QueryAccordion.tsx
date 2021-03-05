import React, { ReactElement, useState } from 'react';
import './app.scss';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import QueryDetails from './QueryDetails';

export default function QueryAccordion(props): ReactElement {
  const { date, entries, searchTerm } = props;
  const [openAccordion, setAccordionState] = useState(false);
  const toggleAccordionState = () => {
    setAccordionState(!openAccordion);
  }
  const doesDataMatchToSearch = (entry) => {
    // If there is no search term OR 'data' attribute exists and matches the search term
    // At this point, we can be sure that entry is an array with length atleast 2
    return !searchTerm || (!!entry[1].data && entry[1].data.includes(searchTerm));
  }

  return (
    <Accordion className="accordion" expanded={openAccordion || !!searchTerm}>
      <AccordionSummary
        className="accordion-summary"
        expandIcon={<ExpandMoreIcon />}
        onClick={() => toggleAccordionState()}
      >
        <div className="accordion-heading">{date}</div>
      </AccordionSummary>
      <div>
        {
          entries.map((entry, index) => {
            /* If entry doesn't have minimum two values (timestamp and details), 
            there is something wrong with it so skip it */
            if (Array.isArray(entry) && entry.length >= 2 && doesDataMatchToSearch(entry)) {
              const queryDetailsProps = {
                timestamp: entry[0],
                details: entry[1],
                handleDelete: (timestamp: string) => props.handleDelete(timestamp, date)
              };
              return (
                <AccordionDetails key={index} className="accordion-details">
                  <QueryDetails {...queryDetailsProps} />
                </AccordionDetails>
              )
            }
          })
        }
      </div>
    </Accordion>
  )
}
