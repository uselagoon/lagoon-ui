import React, { useState } from 'react';

import Problem from 'components/Problem';

import { StyledProblemsByProject } from './StyledProblemsByProject';
import useSortableData from './sortedItems';

const ProblemsByProject = ({ problems, minified }) => {
  const { sortedItems, getClassNamesFor, requestSort } = useSortableData(problems, {
    key: 'id',
    direction: 'ascending',
  });

  const [problemTerm, setProblemTerm] = useState('');
  const [hasFilter, setHasFilter] = React.useState(false);

  const handleProblemFilterChange = event => {
    setHasFilter(false);

    if (event.target.value !== null || event.target.value !== '') {
      setHasFilter(true);
    }
    setProblemTerm(event.target.value);
  };

  const handleSort = key => {
    return requestSort(key);
  };

  const filterResults = item => {
    const lowercasedFilter = problemTerm.toLowerCase();
    if (problemTerm == null || problemTerm === '') {
      return problems;
    }

    return Object.keys(item).some(key => {
      if (item[key] !== null) {
        return item[key].toString().toLowerCase().includes(lowercasedFilter);
      }
    });
  };

  return (
    <StyledProblemsByProject className="problems">
      <div className="filters">
        <input
          type="text"
          id="filter"
          placeholder="Filter problems e.g. CVE-2020-2342"
          value={problemTerm}
          onChange={handleProblemFilterChange}
        />
      </div>
      <div className="header">
        <button
          type="button"
          onClick={() => handleSort('identifier')}
          className={`button-sort identifier ${getClassNamesFor('identifier')}`}
        >
          Identifier
        </button>
        <button
          type="button"
          onClick={() => handleSort('severity')}
          className={`button-sort severity ${getClassNamesFor('severity')}`}
        >
          Severity
        </button>
        <button
          type="button"
          onClick={() => handleSort('source')}
          className={`button-sort source ${getClassNamesFor('source')}`}
        >
          Source
        </button>
        <button
          type="button"
          onClick={() => handleSort('created')}
          className={`button-sort created ${getClassNamesFor('created')}`}
        >
          Last detected
        </button>
        <button
          type="button"
          onClick={() => handleSort('severityScore')}
          className={`button-sort severityScore ${getClassNamesFor('severityScore')}`}
        >
          Score
        </button>
        <button
          type="button"
          onClick={() => handleSort('associatedPackage')}
          className={`button-sort associatedPackage ${getClassNamesFor('associatedPackage')}`}
        >
          Package
        </button>
      </div>
      <div className="data-table">
        {sortedItems.filter(problem => filterResults(problem)).length == 0 && (
          <div className="data-none">No Problems</div>
        )}
        {sortedItems
          .filter(problem => filterResults(problem))
          .map(problem => (
            <Problem key={`${problem.identifier}-${problem.id}`} problem={problem} />
          ))}
      </div>
    </StyledProblemsByProject>
  );
};

export default ProblemsByProject;
