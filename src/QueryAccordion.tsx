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
  return (
    <Accordion expanded={openAccordion || !!searchTerm}>
      <AccordionSummary
        className="accordion-summary"
        expandIcon={<ExpandMoreIcon />}
        onClick={() => toggleAccordionState()}
      >
        <div className="accordion-heading">{date}</div>
      </AccordionSummary>
      {
        entries.map((entry, index) => (
          <AccordionDetails key={index} className="accordion-details">
            <QueryDetails {...entry} />
          </AccordionDetails>
        ))
      }
    </Accordion>
  )
}
