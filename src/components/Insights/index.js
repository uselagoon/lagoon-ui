import React, { useState } from 'react';

import Button from 'components/Button';
import SelectFilter from 'components/Filters';
import useTranslation from 'lib/useTranslation';

import useSortableData from '../../lib/withSortedItems';
// import { Icon } from 'semantic-ui-react';
import { StyledInsights } from './StyledInsights';

const getOptionsFromInsights = (insights, key) => {
  let uniqueOptions = insights && new Set(insights.filter(f => f[key]).map(f => f[key]));

  return insights && [...uniqueOptions].sort();
};

const Insights = ({ insights }) => {
  const t = useTranslation();
  const { sortedItems, getClassNamesFor, requestSort } = useSortableData(insights, {
    key: 'id',
    direction: 'ascending',
  });
  const [nameSelected, setName] = useState([]);
  const [typeSelected, setType] = useState([]);
  const [serviceSelected, setService] = useState([]);

  const [factTerm, setFactTerm] = useState('');
  const [hasFilter, setHasFilter] = React.useState(false);

  const names = getOptionsFromInsights(insights, 'file');
  const types = getOptionsFromInsights(insights, 'type');
  const services = getOptionsFromInsights(insights, 'service');

  // Handlers
  const handleFactFilterChange = event => {
    setHasFilter(false);

    if (event.target.value !== null || event.target.value !== '') {
      setHasFilter(true);
    }
    setFactTerm(event.target.value);
  };

  const handleSort = key => {
    return requestSort(key);
  };

  const handleNameChange = name => {
    let values = (name && name.map(n => n.value)) || [];
    setName(values);
  };

  const handleServiceChange = service => {
    let values = (service && service.map(s => s.value)) || [];
    setService(values);
  };

  const handleTypeChange = type => {
    let values = (type && type.map(t => t.value)) || [];
    setType(values);
  };

  // Options
  const nameOptions = name => {
    return name && name.map(n => ({ value: n, label: n }));
  };

  const serviceOptions = service => {
    return service && service.map(s => ({ value: s, label: s }));
  };

  const typeOptions = type => {
    return type && type.map(t => ({ value: t, label: t }));
  };

  // Selector filtering
  const matchesNameSelector = item => {
    return nameSelected.length > 0
      ? Object.keys(item).some(key => {
          if (item[key] !== null) {
            return nameSelected.indexOf(item['file'].toString()) > -1;
          }
        })
      : true;
  };

  const matchesServiceSelector = item => {
    return serviceSelected.length > 0
      ? Object.keys(item).some(key => {
          if (item[key] !== null) {
            return serviceSelected.indexOf(item['service'].toString()) > -1;
          }
        })
      : true;
  };

  const matchesTypeSelector = item => {
    return typeSelected.length > 0
      ? Object.keys(item).some(key => {
          if (item[key] !== null) {
            return typeSelected.indexOf(item['type'].toString()) > -1;
          }
        })
      : true;
  };

  const matchesTextFilter = item => {
    return factTerm != null || factTerm !== ''
      ? Object.keys(item).some(key => {
          if (item[key] !== null) {
            return item[key].toString().toLowerCase().includes(factTerm.toLowerCase());
          }
        })
      : true;
  };

  const shouldItemBeShown = item => {
    return (
      matchesNameSelector(item) && matchesServiceSelector(item) && matchesTypeSelector(item) && matchesTextFilter(item)
    );
  };

  const insightsLength = sortedItems.filter(item => shouldItemBeShown(item)).length;

  return (
    <StyledInsights>
      <div className="overview">
        <ul className="overview-list">
          <li className="result">
            <label>{insightsLength <= 1 ? t('insights.insight') : t('insights.insights')}</label>
            <span className="text-large">{insightsLength}</span>
          </li>
        </ul>
      </div>
      <div className="filters-wrapper">
        <div className="select-filters">
          <SelectFilter
            title={t('insights.filters.name')}
            loading={!names}
            options={names && nameOptions(names)}
            onFilterChange={handleNameChange}
            isMulti
          />
          <SelectFilter
            title={t('insights.filters.service')}
            loading={!services}
            options={services && serviceOptions(services)}
            onFilterChange={handleServiceChange}
            isMulti
          />
          <SelectFilter
            title={t('insights.filters.type')}
            loading={!types}
            options={types && typeOptions(types)}
            onFilterChange={handleTypeChange}
            isMulti
          />
        </div>
      </div>
      <div className="filters">
        <input
          type="text"
          id="filter"
          placeholder={t('placeholders.insights')}
          value={factTerm}
          onChange={handleFactFilterChange}
        />
      </div>
      <div className="header">
        <button
          type="button"
          onClick={() => handleSort('file')}
          className={`button-sort file ${getClassNamesFor('file')}`}
        >
          {t('insights.file')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('service')}
          className={`button-sort service ${getClassNamesFor('service')}`}
        >
          {t('insights.service')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('type')}
          className={`button-sort type ${getClassNamesFor('type')}`}
        >
          {t('insights.type')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('created')}
          className={`button-sort created ${getClassNamesFor('created')}`}
        >
          {t('insights.created')}
        </button>
        <button
          type="size"
          onClick={() => handleSort('size')}
          className={`button-sort size ${getClassNamesFor('size')}`}
        >
          {t('insights.size')}
        </button>
        <button type="button" className={`button-sort download ${getClassNamesFor('download')}`}>
          {t('insights.download')}
        </button>
      </div>
      <div className="insights-container">
        {sortedItems.filter(item => shouldItemBeShown(item)).length == 0 && (
          <div className="data-table">
            <div className="data-none">{t('insights.noInsights')}</div>
          </div>
        )}
        {sortedItems
          .filter(item => shouldItemBeShown(item))
          .map(insight => {
            return (
              <div className="data-row row-heading" key={insight.id}>
                <div className="col col-2">{insight.file}</div>
                <div className="col col-2">{insight.service}</div>
                <div className="col col-2">{insight.type}</div>
                <div className="col col-3">{insight.created}</div>
                <div className="col col-3">{insight.size}</div>
                <div className="col col-3">
                  <a href={insight.downloadUrl} target="_blank">
                    <Button>{t('general.download')}</Button>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </StyledInsights>
  );
};

export default Insights;
