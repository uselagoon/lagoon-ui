import React, { useState } from 'react';
import { bp, color, fontSize } from 'lib/variables';
import useSortableData from '../../lib/withSortedItems';
import SelectFilter from 'components/Filters';
import { Icon } from 'semantic-ui-react';

const getOptionsFromInsights = (insights, key) => {
    let uniqueOptions = insights &&
      new Set(insights.filter(f => f[key]).map(f => f[key]));

    return [...uniqueOptions].sort();
};

const Insights = ({ insights }) => {

  console.log("insights: ", insights);

    const { sortedItems, getClassNamesFor, requestSort } = useSortableData(insights, {key: 'id', direction: 'ascending'});
    const [nameSelected, setName] = useState([]);
    const [typeSelected, setType] = useState([]);

    const [factTerm, setFactTerm] = useState('');
    const [hasFilter, setHasFilter] = React.useState(false);

    const names = getOptionsFromInsights(insights, 'file');
    const types = getOptionsFromInsights(insights, 'type');

    // Handlers
    const handleFactFilterChange = (event) => {
        setHasFilter(false);

        if (event.target.value !== null || event.target.value !== '') {
            setHasFilter(true);
        }
        setFactTerm(event.target.value);
    };

    const handleSort = (key) => {
        return requestSort(key);
    };

    const handleNameChange = (name) => {
        let values = name && name.map(n => n.value) || [];
        setName(values);
    };

    const handleTypeChange = (type) => {
        let values = type && type.map(t => t.value) || [];
        setType(values);
    };

    // Options
    const nameOptions = (name) => {
        return name && name.map(n => ({ value: n, label: n}));
    };

    const typeOptions = (type) => {
        return type && type.map(t => ({ value: t, label: t}));
    };

    // Selector filtering
    const matchesNameSelector = (item) => {
        return (nameSelected.length > 0) ?
          Object.keys(item).some(key => {
              if (item[key] !== null) {
                  return nameSelected.indexOf(item['file'].toString()) > -1;
              };
          })
          : true;
    }

    const matchesTypeSelector = (item) => {
        return (typeSelected.length > 0) ?
          Object.keys(item).some(key => {
              if (item[key] !== null) {
                  return typeSelected.indexOf(item['type'].toString()) > -1;
              };
          })
          : true;
    }

    const matchesTextFilter = (item) => {
        return (factTerm != null || factTerm !== '') ?
          Object.keys(item).some(key => {
              if (item[key] !== null) {
                  return item[key].toString().toLowerCase().includes(factTerm.toLowerCase());
              }
          })
          : true;
    }

    const shouldItemBeShown = (item) => {
        return (matchesNameSelector(item) && matchesTypeSelector(item)  && matchesTextFilter(item));
    };

    return (
        <div className="insights">
            <div className="overview">
                <ul className="overview-list">
                    <li className="result"><label>Insights </label><span className="text-large">{Object.keys(sortedItems).length}</span></li>
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
                      title="Type"
                      loading={!types}
                      options={types && typeOptions(types)}
                      onFilterChange={handleTypeChange}
                      isMulti
                    />
                </div>
            </div>
            <div className="filters">
                <input type="text" id="filter" placeholder="Filter insights e.g. sbom.json"
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
                    type="button"
                    onClick={() => handleSort('download')}
                    className={`button-sort download ${getClassNamesFor('download')}`}
                >
                    Download
                </button>
            </div>
            <div className="insights-container">
                {sortedItems.filter(item => shouldItemBeShown(item)).length == 0 &&
                <div className="data-table">
                    <div className="data-none">
                        No insights
                    </div>
                </div>
                }
                {sortedItems
                  .filter(item => shouldItemBeShown(item))
                  .map((insight) => {
                    return (
                        <div className="data-row row-heading" key={insight.id}>
                            <div className="col col-2">{insight.file}</div>
                            <div className="col col-2">{insight.type}</div>
                            <div className="col col-3">{insight.created}</div>
                            <div className="col col-3">
                              <a href={insight.downloadUrl} target="_blank"><Icon link name='download'/>Download</a>
                            </div>
                        </div>
                    );
                })}
            </div>
            <style jsx>{`
              .header {
                @media ${bp.smallOnly} {
                  flex-wrap: wrap;
                  margin: 10px;
                }
                @media ${bp.wideUp} {
                  align-items: center;
                  display: flex;
                  margin: 15px 20px 10px;
                }

                display: flex;
                justify-content: space-between;

                label {
                  display: none;
                  padding-left: 20px;
                  @media ${bp.wideUp} {
                    display: block;
                  }
                }
              }

              .text-large {
                font-size: 1.4em;
              }

              .overview {
                ul.overview-list {
                  display: flex;
                  justify-content: space-between;
                  padding: 10px 20px;
                  margin: 0 0 20px;
                  background: #f3f3f3;

                  li.result {
                    display: flex;
                    flex-direction: column;
                    margin: 0;
                  }
                }
              }

              input#filter {
                width: 100%;
                border: none;
                padding: 10px 20px;
                margin: 0;
                font-style: italic;
              }

              .button-sort {
                color: #5f6f7a;
                position: relative;
                font-family: 'source-code-pro',sans-serif;
                font-size: 13px;
                font-size: 0.8125rem;
                line-height: 1.4;
                text-transform: uppercase;
                padding-left: 20px;
                border: none;
                background: none;
                cursor: pointer;

                &:after {
                  position: absolute;
                  right:  -18px;
                  top: 0;
                  width: 20px;
                  height: 20px;
                }

                &.ascending:after {
                  content: ' \\25B2';
                }

                &.descending:after {
                  content: ' \\25BC';
                }

                &:first-child {
                  padding-left: 0;
                }
              }

              .expanded-wrapper {
                padding: 20px;
                background: ${color.lightestGrey};
                .fieldWrapper {
                  padding-bottom: 20px;
                }
              }

              .data-row {
                display: flex;
                justify-content: space-between;
                border: 1px solid ${color.white};
                border-bottom: 1px solid ${color.lightestGrey};
                border-radius: 0;
                line-height: 1.5rem;

                @media ${bp.smallOnly} {
                  padding: 10px;
                }

                @media ${bp.wideUp} {
                  padding: 15px 0;
                }

                &:hover {
                  border: 1px solid ${color.brightBlue};
                }

                &:first-child {
                  border-top-left-radius: 3px;
                  border-top-right-radius: 3px;
                }

                &:last-child {
                  border-bottom-left-radius: 3px;
                  border-bottom-right-radius: 3px;
                }

                .col {
                  @media ${bp.wideUp} {
                    padding: 0 20px;
                  }
                  width: 33.33%;
                }

                .col-2 {
                  text-align: center;
                }

                .col-3  {
                  text-align: end;
                }

                .description {
                  font-style: italic;
                  font-size: 12px;
                }

                a.external-link {
                  color: ${color.brightBlue};
                  text-decoration: underline;
                  font-style: italic;
                }
              }

              .data-none {
                border: 1px solid ${color.white};
                border-bottom: 1px solid ${color.lightestGrey};
                border-radius: 3px;
                line-height: 1.5rem;
                padding: 8px 0 7px 0;
                text-align: center;
              }

              .row-heading {
                background: ${color.white};
              }
            `}</style>
        </div>
    );
};

export default Insights;
