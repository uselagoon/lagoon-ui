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
const handleChange = values => {
  window.location.href = window.location.href.split('?')[0] + '?limit=' + values.value;
};
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
const ResultsLimited = ({ limit, message }) => {
  return (
    // if the number of results = the limit, then display a message that the results are limited
    // if the number of results is less than the limit, the message won't be displayed
    // the number of results will never be more than the limit (see deployments.js, backups.js, and tasks.js)
    // as the limit is set here and the results returned will either be less than or equal to this limit, never more
    <StyledResultsLimited>
      {limit && (
        <React.Fragment>
          <div className="description">
            Number of results displayed is limited to {limit}
            {message}
          </div>
        </React.Fragment>
      )}
      <div className="results">
        {
          <ReactSelect
            styles={customStyles}
            aria-label="Results"
            placeholder="Results to display..."
            name="results"
            onChange={handleChange}
            options={options}
            required
          />
        }
      </div>
    </StyledResultsLimited>
  );
};

export default ResultsLimited;
