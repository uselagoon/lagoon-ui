import React from 'react';
import ReactSelect from 'react-select';

import { StyledResultsLimited } from './StyledResultsLimited';

const options = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
  { value: '-1', label: 'all' },
];
const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: 200,
  }),
  control: provided => ({
    ...provided,
    width: 200,
  }),
};

/**
 * Button that deploys the latest environment.
 */
const ResultsLimited = ({ limit, changeLimit, message, disableHandler }) => {
  const handleChange = values => {
    const limitValueParsed = parseInt(values.value);
    if (!Number.isNaN(limitValueParsed) && changeLimit) {
      history.pushState(null, '', window.location.href.split('?')[0] + '?limit=' + values.value);
      changeLimit(limitValueParsed === -1 ? null : limitValueParsed);
    }
  };

  return (
    // if the number of results = the limit, then display a message that the results are limited
    // if the number of results is less than the limit, the message won't be displayed
    // the number of results will never be more than the limit (see deployments.js, backups.js, and tasks.js)
    // as the limit is set here and the results returned will either be less than or equal to this limit, never more
    <StyledResultsLimited>
      {limit && (
        <React.Fragment>
          <div className="description" data-cy="resultsLimited">
            Number of results displayed is limited to {limit}
            {message}
          </div>
        </React.Fragment>
      )}
      <div className="results" data-cy="select-results">
        {
          <ReactSelect
            data-cy="result_selector"
            styles={customStyles}
            aria-label="Results"
            placeholder="Results to display..."
            name="results"
            onChange={!disableHandler ? handleChange : () => {}}
            options={options}
            required
            menuPlacement="top"
          />
        }
      </div>
    </StyledResultsLimited>
  );
};

export default ResultsLimited;
