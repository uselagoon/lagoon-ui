import React, { useState, useEffect } from 'react';
import useSortableProblemsData from './sortedItems';
import Problem from "components/Problem";
import SelectFilter from 'components/Filters';
import {StyledProblems} from "./StyledProblems";

const getOptionsFromProblems = (problems, key) => {
  let uniqueOptions= problems &&
    new Set(problems.filter(p => p[key]).map(p => p[key]));

  return [...uniqueOptions];
};

const Problems = ({problems}) => {
  const { sortedItems, requestSort, getClassNamesFor } = useSortableProblemsData(problems);
  const [severitySelected, setSeverity] = useState([]);
  const [sourceSelected, setSource] = useState([]);
  const [servicesSelected, setService] = useState([]);

  const [problemTerm, setProblemTerm] = useState('');
  const [hasFilter, setHasFilter] = useState(false);
  const [problemStats, setProblemStats] = useState([]);

  const severities = getOptionsFromProblems(problems, 'severity');
  const sources = getOptionsFromProblems(problems, 'source');
  const services = getOptionsFromProblems(problems, 'service');


  // Handlers
  const handleSort = (key) => requestSort(key);

  const handleTextFilterChange = (event) => {
    setHasFilter(false);

    if (event.target.value !== null || event.target.value !== '') {
      setHasFilter(true);
    }
    setProblemTerm(event.target.value);
  };

  const handleSourceChange = (source) => {
    let values = source && source.map(s => s.value) || [];
    setSource(values);
  };

  const handleSeverityChange = (severity) => {
    let values = severity && severity.map(s => s.value) || [];
    setSeverity(values);
  };

  const handleServiceChange = (service) => {
    let values = service && service.map(s => s.value) || [];
    setService(values);
  };

  // Options
  const severityOptions = (severity) => {
    return severity && severity.map(s => ({ value: s, label: s}));
  };

  const sourceOptions = (sources) => {
    return sources && sources.map(s => ({ value: s, label: s}));
  };

  const serviceOptions = (services) => {
    return services && services.map(s => ({ value: s, label: s}));
  };

  // Selector filtering
  const matchesSeveritySelector = (item) => {
    return (severitySelected.length > 0) ?
      Object.keys(item).some(key => {
        if (item[key] !== null) {
          return severitySelected.indexOf(item['severity'].toString()) > -1;
        };
      })
    : true;
  }

  const matchesSourceSelector = (item) => {
    return (sourceSelected.length > 0) ?
      Object.keys(item).some(key => {
        if (item[key] !== null) {
          return sourceSelected.indexOf(item['source'].toString()) > -1;
        };
      })
    : true;
  }

  const matchesServiceSelector = (item) => {
    return (servicesSelected.length > 0) ?
      Object.keys(item).some(key => {
        if (item[key] !== null) {
          return servicesSelected.indexOf(item['service'].toString()) > -1;
        };
      })
    : true;
  }

  const matchesTextFilter = (item) => {
    return (problemTerm != null || problemTerm !== '') ?
      Object.keys(item).some(key => {
        if (item[key] !== null) {
          return item[key].toString().toLowerCase().includes(problemTerm.toLowerCase());
        }
      })
    : true;
  }

  const shouldItemBeShown = (item) => {
    return (matchesSeveritySelector(item) && matchesServiceSelector(item) && matchesSourceSelector(item) && matchesTextFilter(item));
  };

  useEffect(() => {
    let stats = {
      'critical': sortedItems.filter(p => p.severity === 'CRITICAL').length,
      'high': sortedItems.filter(p => p.severity === 'HIGH').length,
      'medium': sortedItems.filter(p => p.severity === 'MEDIUM').length,
      'low': sortedItems.filter(p => p.severity === 'LOW').length
    };

    if (stats != problemStats) {
      setProblemStats(stats);
    }
  }, []);

  return (
    <StyledProblems>
      <div className="overview">
        <ul className="overview-list">
          <li className="result"><label>Problems </label><span className="text-large">{Object.keys(sortedItems).length}</span></li>
          <li className="result"><label>Critical </label><span className="text-large red">{problemStats.critical}</span></li>
          <li className="result"><label>High </label><span className="text-large blue">{problemStats.high}</span></li>
          <li className="result"><label>Medium </label><span className="text-large yellow">{problemStats.medium}</span></li>
          <li className="result"><label>Low </label><span className="text-large grey">{problemStats.low}</span></li>
        </ul>
      </div>
      <div className="filters-wrapper">
        <div className="select-filters">
          <SelectFilter
            title="Severity"
            loading={!severities}
            options={severities && severityOptions(severities)}
            onFilterChange={handleSeverityChange}
            isMulti
          />
          <SelectFilter
            title="Source"
            loading={!sources}
            options={sources && sourceOptions(sources)}
            onFilterChange={handleSourceChange}
            isMulti
          />
          <SelectFilter
            title="Service"
            loading={!services}
            options={services && serviceOptions(services)}
            onFilterChange={handleServiceChange}
            isMulti
          />
        </div>
      </div>
      <div className="filters">
          <input type="text" id="filter" placeholder="Filter problems e.g. CVE-2020-2342"
            value={problemTerm}
            onChange={handleTextFilterChange}
          />
        </div>
      <div className="header">
        <button
            type="button"
            onClick={() => handleSort('identifier')}
            className={`button-sort identifier ${getClassNamesFor('identifier')}`}
        >
          Problem id
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
            onClick={() => handleSort('service')}
            className={`button-sort service ${getClassNamesFor('service')}`}
        >
          Service
        </button>
        <button
            type="button"
            onClick={() => handleSort('associatedPackage')}
            className={`button-sort associatedPackage ${getClassNamesFor('associatedPackage')}`}
        >
          Package
        </button>
      </div>
      <div className="problems-container">
        {sortedItems.filter(item => shouldItemBeShown(item)).length == 0 &&
          <div className="data-table">
            <div className="data-none">
              No Problems
            </div>
          </div>
        }
        {sortedItems
          .filter(item => shouldItemBeShown(item))
          .map((problem) => <Problem key={`${problem.identifier}-${problem.id}`} problem={problem}/>)
        }
      </div>
    </StyledProblems>
  );
};

export default Problems;
