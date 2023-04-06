import React, { useState } from 'react';
import moment from 'moment';
import useSortableData from '../../lib/withSortedItems';

import { getDeploymentDuration } from 'components/Deployment';
import CancelDeployment from 'components/CancelDeployment';
import ProjectLink from 'components/link/Project';
import DeploymentsLink from 'components/link/Deployments';
import DeploymentLink from 'components/link/Deployment';
import { Deployments, DeploymentsDataTable, DeploymentsHeader } from './StyledDeploymentsByFilter';

/**
 * The primary list of running deployments.
 */
const DeploymentsByFilter = ({ deployments }) => {
  const { sortedItems, getClassNamesFor, requestSort } = useSortableData(deployments, {key: 'created', direction: 'descending'});
  const [searchTerm, setSearchTerm] = useState('');
  const [hasFilter, setHasFilter] = useState(false);

  const formatString = (textToEdit, labelClassToQuery) => {
    // if the string is bigger than the data-row container, then add new lines.
    const getTextWidth = (string) => {
      // gets the width of a string that *will* be rendered
      const canvas = new OffscreenCanvas(500, 200);
      const context = canvas.getContext("2d");
      context.font = getComputedStyle(document.body).font;
      return context.measureText(string).width;
    };

    const labelWidth = document.querySelector(
      `.data-row > .${labelClassToQuery}`
    ).clientWidth;

    const editString = (string) => {
      // find all "-" or "/" and replace with line breaks prefixed by the symbol found.
      const regex = /[-\/]/g;
      return string.replace(regex, (match) => match + "\n");
    };

    const combine = (strings) => {
      let combined = "";
      let line = "";

      for (let i = 0; i < strings.length; i++) {
        const newLine = line + strings[i];
        const width = getTextWidth(newLine);

        if (width < labelWidth || i === strings.length - 1) {
          line = newLine;
        } else {
          combined += line + "\n";
          line = strings[i];
        }
        if (i === strings.length - 1) {
          combined += line;
        }
      }
      return combined;
    };

    if (labelWidth < getTextWidth(textToEdit)) {
      return combine(editString(textToEdit).split("\n"));
    }
    return textToEdit;
  };
  

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
    <Deployments>
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
      <DeploymentsHeader>
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
      </DeploymentsHeader>
      <DeploymentsDataTable>
        {!sortedItems.filter(deployment => filterResults(deployment)).length && <div className="data-none">No deployments</div>}
        {sortedItems.filter(deployment => filterResults(deployment)).map((deployment) => {
          return (
            <div className="data-row row-heading" key={deployment.id}>
              <div className="project">
                <ProjectLink projectSlug={deployment.environment.project.name}>
                  {formatString(deployment.environment.project.name, "project")}
                </ProjectLink>
              </div>
              <div className="environment">
                <DeploymentsLink
                  environmentSlug={deployment.environment.openshiftProjectName}
                  projectSlug={deployment.environment.project.name}
                >
                  {formatString(deployment.environment.name, "environment")}
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
                  .format("DD MMM YYYY, HH:mm:ss (Z)")}
              </div>
              <div className={`status ${deployment.status}`}>
                {deployment.status.charAt(0).toUpperCase() +
                  deployment.status.slice(1)}
              </div>
              <div className="duration">
                {getDeploymentDuration(deployment)}
              </div>
              <div>
                {["new", "pending", "queued", "running"].includes(
                  deployment.status
                ) && (
                  <CancelDeployment
                    deployment={deployment}
                    afterText="Cancelled"
                    beforeText="Cancel"
                  />
                )}
              </div>
            </div>
          );
        })}
      </DeploymentsDataTable>
    </Deployments>
  );
};

export default DeploymentsByFilter;
