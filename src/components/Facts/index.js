import React, { useState } from 'react';

import useTranslation from 'lib/useTranslation';

import useSortableData from '../../lib/withSortedItems';
import { Header, StyledFacts } from './StyledFacts';

const Facts = ({ facts }) => {
  const t = useTranslation();

  const { sortedItems, getClassNamesFor, requestSort } = useSortableData(facts, {
    key: 'name',
    direction: 'ascending',
  });

  const [factTerm, setFactTerm] = useState('');
  const [hasFilter, setHasFilter] = React.useState(false);

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

  const filterResults = item => {
    const lowercasedFilter = factTerm.toLowerCase();

    if (factTerm == null || factTerm === '') {
      return facts;
    }

    return Object.keys(item).some(key => {
      if (item[key] !== null) {
        return item[key].toString().toLowerCase().includes(lowercasedFilter);
      }
    });
  };

  return (
    <StyledFacts>
      <div className="filters">
        <input
          type="text"
          id="filter"
          placeholder={t('placeholders.facts')}
          value={factTerm}
          onChange={handleFactFilterChange}
        />
      </div>
      <Header>
        <button
          type="button"
          onClick={() => handleSort('name')}
          className={`button-sort name ${getClassNamesFor('name')}`}
        >
          {t('facts.name')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('source')}
          className={`button-sort value ${getClassNamesFor('source')}`}
        >
          {t('facts.source')}
        </button>
        <button
          type="button"
          onClick={() => handleSort('value')}
          className={`button-sort value ${getClassNamesFor('value')}`}
        >
          {t('facts.value')}
        </button>
      </Header>
      <div className="data-table">
        {!sortedItems.filter(fact => filterResults(fact)).length && <div className="data-none">No Facts</div>}
        {sortedItems
          .filter(fact => filterResults(fact))
          .map(fact => {
            return (
              <div className="data-row row-heading" key={fact.id}>
                <div className="col col-1">
                  <div className="name">{fact.name}</div>
                  <div className="description">{fact.description}</div>
                </div>
                <div className="col col-2">{fact.source}</div>
                <div className="col col-3">{fact.value}</div>
              </div>
            );
          })}
      </div>
    </StyledFacts>
  );
};

export default Facts;
