import React, { useEffect, useState } from 'react';

import SelectFilter from 'components/Filters';
import Problem from 'components/Problem';
import useTranslation from 'lib/useTranslation';

import { StyledProblems } from './StyledProblems';
import useSortableProblemsData from './sortedItems';

const getOptionsFromProblems = (problems, key) => {
  let uniqueOptions = problems && new Set(problems.filter(p => p[key]).map(p => p[key]));

  return [...uniqueOptions];
};

const Problems = ({ problems }) => {
  const t = useTranslation();

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
  const handleSort = key => requestSort(key);

  const handleTextFilterChange = event => {
    setHasFilter(false);

    if (event.target.value !== null || event.target.value !== '') {
      setHasFilter(true);
    }
    setProblemTerm(event.target.value);
  };

  const handleSourceChange = source => {
    let values = (source && source.map(s => s.value)) || [];
    setSource(values);
  };

  const handleSeverityChange = severity => {
    let values = (severity && severity.map(s => s.value)) || [];
    setSeverity(values);
  };

  const handleServiceChange = service => {
    let values = (service && service.map(s => s.value)) || [];
    setService(values);
  };

  // Options
  const severityOptions = severity => {
    return severity && severity.map(s => ({ value: s, label: s }));
  };

  const sourceOptions = sources => {
    return sources && sources.map(s => ({ value: s, label: s }));
  };

  const serviceOptions = services => {
    return services && services.map(s => ({ value: s, label: s }));
  };

  // Selector filtering
  const matchesSeveritySelector = item => {
    return severitySelected.length > 0
      ? Object.keys(item).some(key => {
          if (item[key] !== null) {
            return severitySelected.indexOf(item['severity'].toString()) > -1;
          }
        })
      : true;
  };

  const matchesSourceSelector = item => {
    return sourceSelected.length > 0
      ? Object.keys(item).some(key => {
          if (item[key] !== null) {
            return sourceSelected.indexOf(item['source'].toString()) > -1;
          }
        })
      : true;
  };

  const matchesServiceSelector = item => {
    return servicesSelected.length > 0
      ? Object.keys(item).some(key => {
          if (item[key] !== null) {
            return servicesSelected.indexOf(item['service'].toString()) > -1;
          }
        })
      : true;
  };

  const matchesTextFilter = item => {
    return problemTerm != null || problemTerm !== ''
      ? Object.keys(item).some(key => {
          if (item[key] !== null) {
            return item[key].toString().toLowerCase().includes(problemTerm.toLowerCase());
          }
        })
      : true;
  };

  const shouldItemBeShown = item => {
    return (
      matchesSeveritySelector(item) &&
      matchesServiceSelector(item) &&
      matchesSourceSelector(item) &&
      matchesTextFilter(item)
    );
  };

  useEffect(() => {
    let stats = {
      critical: sortedItems.filter(p => p.severity === 'CRITICAL').length,
      high: sortedItems.filter(p => p.severity === 'HIGH').length,
      medium: sortedItems.filter(p => p.severity === 'MEDIUM').length,
      low: sortedItems.filter(p => p.severity === 'LOW').length,
    };

    if (stats != problemStats) {
      setProblemStats(stats);
    }
  }, []);

  return (
    <StyledProblems>
      <div className="overview">
        <ul className="overview-list">
          <li className="result">
            <label>{t('problems.label.problems')} </label>
            <span className="text-large">{Object.keys(sortedItems).length}</span>
          </li>
          <li className="result">
            <label>{t('problems.label.critical')} </label>
            <span className="text-large red">{problemStats.critical}</span>
          </li>
          <li className="result">
            <label>{t('problems.label.high')} </label>
            <span className="text-large blue">{problemStats.high}</span>
          </li>
          <li className="result">
            <label>{t('problems.label.medium')} </label>
            <span className="text-large yellow">{problemStats.medium}</span>
          </li>
          <li className="result">
            <label>{t('problems.label.low')} </label>
            <span className="text-large grey">{problemStats.low}</span>
          </li>
        </ul>
      </div>
      <div className="filters-wrapper">
        <div className="select-filters">
          <SelectFilter
            title={t('problems.filters.severity')}
            loading={!severities}
            options={severities && severityOptions(severities)}
            onFilterChange={handleSeverityChange}
            isMulti
          />
          <SelectFilter
            title={t('problems.filters.source')}
            loading={!sources}
            options={sources && sourceOptions(sources)}
            onFilterChange={handleSourceChange}
            isMulti
          />
          <SelectFilter
            title={t('problems.filters.service')}
            loading={!services}
            options={services && serviceOptions(services)}
            onFilterChange={handleServiceChange}
            isMulti
          />
        </div>
      </div>
      <div className="filters">
        <input
          type="text"
          id="filter"
          placeholder={t('placeholders.problemsFilter')}
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
          {t('problems.problemID')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('severity')}
          className={`button-sort severity ${getClassNamesFor('severity')}`}
        >
          {t('problems.severity')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('source')}
          className={`button-sort source ${getClassNamesFor('source')}`}
        >
          {t('problems.source')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('created')}
          className={`button-sort created ${getClassNamesFor('created')}`}
        >
          {t('problems.lastDetected')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('service')}
          className={`button-sort service ${getClassNamesFor('service')}`}
        >
          {t('problems.service')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('associatedPackage')}
          className={`button-sort associatedPackage ${getClassNamesFor('associatedPackage')}`}
        >
          {t('problems.package')}
        </button>
      </div>
      <div className="problems-container">
        {sortedItems.filter(item => shouldItemBeShown(item)).length == 0 && (
          <div className="data-table">
            <div className="data-none">{t('problems.noProblems')}</div>
          </div>
        )}
        {sortedItems
          .filter(item => shouldItemBeShown(item))
          .map(problem => (
            <Problem key={`${problem.identifier}-${problem.id}`} problem={problem} />
          ))}
      </div>
    </StyledProblems>
  );
};

export default Problems;
