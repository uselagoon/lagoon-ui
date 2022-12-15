import React, { useState } from 'react';
import moment from 'moment';
import { bp, color } from 'lib/variables';
import useSortableData from '../../lib/withSortedItems';
import css from 'styled-jsx/css';

import Box from 'components/Box';
import { getDeploymentDuration } from 'components/Deployment';
import CancelDeployment from 'components/CancelDeployment';
import ProjectLink from 'components/link/Project';
import DeploymentsLink from 'components/link/Deployments';
import DeploymentLink from 'components/link/Deployment';
import { filter } from 'ramda';

const { className: boxClassName, styles: boxStyles } = css.resolve`
  .box {
    margin-bottom: 7px;

    .content {
      padding: 9px 20px 14px;
      @media ${bp.tinyUp} {
        display: flex;
      }
    }
  }
`;


/**
 * The primary list of running deployments.
 */
const DeploymentsByFilter = ({ deployments }) => {
  const { sortedItems, getClassNamesFor, requestSort } = useSortableData(deployments, {key: 'created', direction: 'descending'});
  const [searchTerm, setSearchTerm] = useState('');
  const [hasFilter, setHasFilter] = useState(false);

  const handleSearchFilterChange = (event) => {
    setHasFilter(false);

    if (event.target.value !== null || event.target.value !== '') {
      setHasFilter(true);
    }
    setSearchTerm(event.target.value);
  };


  const handleSort = (key) => {
      return requestSort(key);
  };


  const filterResults = (item) => {
    const lowercasedFilter = searchTerm.toLowerCase();

    if (searchTerm == null || searchTerm === '') {
      return deployments;
    }
    
    return Object.keys(item).some(key => {
      if (typeof item[key] === 'object' && item[key] !== null) { 
        let filterKey = "";

        for (const k in item[key]) {
          if (item[key].hasOwnProperty(k) && item[key][k] !== null) {
            if (k == "" || k == undefined) {
              return;
            }
            if ((k == "project" || k == "openshift") && item[key][k].name.toString().toLowerCase().includes(lowercasedFilter)) {
              filterKey = item[key][k].name;
            }
          }
        }

        return filterKey.toString().toLowerCase().includes(lowercasedFilter);
      }
      else {
        if (item[key] !== null) {
          return item[key].toString().toLowerCase().includes(lowercasedFilter);
        }
      }
    });
  };


  return (
    <div className="deployments">
      <div className="filters">
        <label>{sortedItems.length == 1 ? `1 deployment` : `${sortedItems.length} deployments`}</label>
        <label></label>
        <input 
          type="text" id="filter"
          placeholder="Filter deployments..."
          value={searchTerm}
          onChange={handleSearchFilterChange}
        />
      </div>
      {!deployments.length && (
        <Box>
          <div className="data-none">
            <h4>No deployments</h4>
          </div>
        </Box>
      )}
      <div className="header">
        <label>Project</label>
        <label>Environment</label>
        <label>Cluster</label>
        <button
          type="button"
          onClick={() => handleSort('name')}
          className={`button-sort name ${getClassNamesFor('name')}`}
        >
          Name
        </button>
        <label className="priority">Priority</label>
        <button
            type="button"
            onClick={() => handleSort('created')}
            className={`button-sort created ${getClassNamesFor('created')}`}
        >
          Created
        </button>
        <button
            type="button"
            onClick={() => handleSort('status')}
            className={`button-sort status ${getClassNamesFor('status')}`}
        >
          Status
        </button>
        <label>Duration</label>
        <label></label>
      </div>
      <div className="data-table">
        {!sortedItems.filter(deployment => filterResults(deployment)).length && <div className="data-none">No deployments</div>}
        {sortedItems.filter(deployment => filterResults(deployment)).map((deployment) => {
          return (
            <div className="data-row row-heading" key={deployment.id}>
              <div className="project">
                <ProjectLink
                  projectSlug={deployment.environment.project.name}
                >{deployment.environment.project.name}
                </ProjectLink>
              </div>
              <div className="environment">
                <DeploymentsLink
                  environmentSlug={deployment.environment.openshiftProjectName}
                  projectSlug={deployment.environment.project.name}
                >{deployment.environment.name}
                </DeploymentsLink>
              </div>
              <div className="cluster">
                {deployment.environment.openshift.name}
              </div>
              <div className="name">
                <DeploymentLink
                  deploymentSlug={deployment.name}
                  environmentSlug={deployment.environment.openshiftProjectName}
                  projectSlug={deployment.environment.project.name}
                  key={deployment.id}
                >
                {deployment.name}
                </DeploymentLink>
              </div>
              <div className="priority">{deployment.priority}</div>
              <div className="started">
                {moment
                  .utc(deployment.created)
                  .local()
                  .format('DD MMM YYYY, HH:mm:ss (Z)')}
              </div>
              <div className={`status ${deployment.status}`}>
                {deployment.status.charAt(0).toUpperCase() +
                  deployment.status.slice(1)}
              </div>
              <div className="duration">{getDeploymentDuration(deployment)}</div>
              <div>
                {['new', 'pending', 'running'].includes(deployment.status) && (
                  <CancelDeployment deployment={deployment} afterText="Cancelled" beforeText="Cancel" />
                )}
              </div>
            </div>
          )
        })}
      </div>
      <style jsx>{`
        .header {
          @media ${bp.tinyUp} {
            margin: 0 0 14px;
          }
          @media ${bp.smallOnly} {
            flex-wrap: wrap;
          }
          @media ${bp.tabletUp} {
            margin-top: 40px;
          }

          display: flex;
          justify-content: space-between;

          label, button {
            display: none;
            padding-left: 20px;
            width: 50%;
            @media ${bp.tinyUp} {
              display: block;
              text-align: left;
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

        .data-table {
          background-color: ${color.white};
          border: 1px solid ${color.lightestGrey};
          border-radius: 3px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  
          .data-none {
            border: 1px solid ${color.white};
            border-bottom: 1px solid ${color.lightestGrey};
            border-radius: 3px;
            line-height: 1.5rem;
            padding: 8px 0 7px 0;
            text-align: center;
          }
  
          .data-row {
            border: 1px solid ${color.white};
            border-bottom: 1px solid ${color.lightestGrey};
            border-radius: 0;
            line-height: 1.5rem;
            padding: 8px 0 7px 0;

            @media ${bp.tinyUp} {
              display: flex;
              justify-content: space-between;
            }
  
            & > div {
              padding-left: 20px;
              @media ${bp.tinyUp} {
                width: 20%;
              }
              @media ${bp.xs_smallUp} {
                width: 24%;
              }
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
  
            .status {
              @media ${bp.smallOnly} {
                background: none;
                background-size: 0;
              }
              padding-left: 0;
              margin-left: 15px;
              background-position: 5px 7px;
              background-repeat: no-repeat;
              background-size: 10px 10px;
              text-indent: 20px;
  
              &.active {
                background-image: url('/static/images/in-progress.svg');
              }
  
              &.new {
                background-image: url('/static/images/in-progress.svg');
              }
  
              &.pending {
                background-image: url('/static/images/in-progress.svg');
              }
  
              &.running {
                background-image: url('/static/images/in-progress.svg');
              }
  
              &.failed {
                background-image: url('/static/images/failed.svg');
              }
  
              &.cancelled {
                background-image: url('/static/images/failed.svg');
              }
  
              &.succeeded {
                background-image: url('/static/images/successful.svg');
              }
  
              &.complete {
                background-image: url('/static/images/successful.svg');
              }
  
              span {
                @media ${bp.tiny_wide} {
                  display: none;
                }
              }
            }
          }
        }
      `}</style>
      {boxStyles}
    </div>
  );
};

export default DeploymentsByFilter;
