import React, { useState } from 'react';

import { useLazyQuery } from '@apollo/react-hooks';
import Button from 'components/Button';
import SelectFilter from 'components/Filters';
import gql from 'graphql-tag';
import { isValidUrl } from 'lib/util';

import useSortableData from '../../lib/withSortedItems';
import { StyledInsights } from './StyledInsights';

const getOptionsFromInsights = (insights, key) => {
  let uniqueOptions = insights && new Set(insights.filter(f => f[key]).map(f => f[key]));

  return insights && [...uniqueOptions].sort();
};

const getDownloadURL = gql`
  query getEnvironment($environmentID: Int!) {
    environment: environmentById(id: $environmentID) {
      id
      insights {
        id
        downloadUrl
      }
    }
  }
`;

const Insights = ({ insights, environmentID }) => {
  const { sortedItems, getClassNamesFor, requestSort } = useSortableData(insights, {
    key: 'id',
    direction: 'ascending',
  });
  const [nameSelected, setName] = useState([]);
  const [typeSelected, setType] = useState([]);
  const [serviceSelected, setService] = useState([]);

  const [factTerm, setFactTerm] = useState('');
  const [hasFilter, setHasFilter] = React.useState(false);
  const [insightDownloads, setInsightDownloads] = useState({});
  const [targetInsightId, setTargetInsightId] = useState(null);

  const [getInsightsDownload, { loading, error }] = useLazyQuery(getDownloadURL, {
    variables: {
      environmentID: environmentID,
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      if (!targetInsightId || !data) {
        setTargetInsightId(null);
        return;
      }
      const allInsights = data.environment?.insights;
      const targetInsight = allInsights?.find(insight => insight.id === targetInsightId);

      if (targetInsight?.downloadUrl && isValidUrl(targetInsight.downloadUrl)) {
        const { id, downloadUrl } = targetInsight;
        setInsightDownloads(prevUrls => ({
          ...prevUrls,
          [id]: downloadUrl,
        }));

        window.open(downloadUrl, '_blank', 'noopener,noreferrer');
      } else {
        console.error(`Error fetching insights download: ${targetInsightId}`);
      }
      setTargetInsightId(null);
    },
    onError: error => {
      console.error('Error fetching insights:', error);
      setTargetInsightId(null);
    },
  });

  const handleDownload = insight => {
    if (loading) return;
    const insightDownload = insightDownloads[insight.id];

    if (insightDownload) {
      window.open(insightDownload, '_blank', 'noopener,noreferrer');
    } else {
      setTargetInsightId(insight.id);
      getInsightsDownload();
    }
  };

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
            <label>{insightsLength <= 1 ? `Insight` : `Insights`}</label>
            <span className="text-large">{insightsLength}</span>
          </li>
        </ul>
      </div>
      <div className="filters-wrapper">
        <div className="select-filters">
          <SelectFilter
            title="Name"
            loading={!names}
            options={names && nameOptions(names)}
            onFilterChange={handleNameChange}
            isMulti
          />
          <SelectFilter
            title="Service"
            loading={!services}
            options={services && serviceOptions(services)}
            onFilterChange={handleServiceChange}
            isMulti
          />
          <SelectFilter
            title="Type"
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
          placeholder="Filter insights e.g. sbom.json"
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
          File
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
          onClick={() => handleSort('type')}
          className={`button-sort type ${getClassNamesFor('type')}`}
        >
          Type
        </button>
        <button
          type="button"
          onClick={() => handleSort('created')}
          className={`button-sort created ${getClassNamesFor('created')}`}
        >
          Created
        </button>
        <button
          type="size"
          onClick={() => handleSort('size')}
          className={`button-sort size ${getClassNamesFor('size')}`}
        >
          Size
        </button>
        <button type="button" className={`button-sort download ${getClassNamesFor('download')}`}>
          Download
        </button>
      </div>
      <div className="insights-container">
        {sortedItems.filter(item => shouldItemBeShown(item)).length == 0 && (
          <div className="data-table">
            <div className="data-none">No insights</div>
          </div>
        )}
        {sortedItems
          .filter(item => shouldItemBeShown(item))
          .map(insight => {
            const { id, file, service, type, created, size } = insight;

            return (
              <div className="data-row row-heading" key={id}>
                <div className="col col-2">{file}</div>
                <div className="col col-2">{service}</div>
                <div className="col col-2">{type}</div>
                <div className="col col-3">{created}</div>
                <div className="col col-3">{size}</div>
                <div className="col col-3">
                  <Button action={() => handleDownload(insight)}>Download</Button>
                </div>
              </div>
            );
          })}
      </div>
    </StyledInsights>
  );
};

export default Insights;
