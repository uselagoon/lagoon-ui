import React from 'react';

import { getCreatedDate } from 'components/Dates';

import { StyledDefaultContent } from './StyledContent';

const DefaultDisplay = ({ problem }) => {
  const createdDate = getCreatedDate(problem.created);
  const data = JSON.parse(problem.data) || '';

  return (
    <StyledDefaultContent className="content-display-wrapper">
      {problem.description && problem.description.length > 0 && (
        <div className="field-wrapper">
          <label>Description</label>
          <div className="description">{problem.description}</div>
        </div>
      )}
      {createdDate && (
        <div className="field-wrapper">
          <label>Created</label>
          <div className="created">{createdDate}</div>
        </div>
      )}
      {problem.version && problem.version.length > 0 && (
        <div className="field-wrapper">
          <label>Version</label>
          <div className="version">{problem.version}</div>
        </div>
      )}
      {problem.fixedVersion && problem.fixedVersion.length > 0 && (
        <div className="field-wrapper">
          <label>Fixed in Version</label>
          <div className="fixed-version">{problem.fixedVersion}</div>
        </div>
      )}
      {problem.links && problem.links.length > 0 && (
        <div className="field-wrapper">
          <label>Associated link (CVE)</label>
          <div className="links">
            <a href={problem.links} target="_blank">
              {problem.links}
            </a>
          </div>
        </div>
      )}
      {problem.service && problem.service.length > 0 && (
        <div className="field-wrapper">
          <label>Service</label>
          <div className="service">{problem.service}</div>
        </div>
      )}
      <div className="rawdata">
        <label>Data</label>
        <div className="rawdata-elements">
          {Object.entries(data).map(([a, b]) => {
            if (b) {
              return (
                <div key={`${a.toLowerCase()}-${problem.id}`} className="rawdata-element">
                  <label>{a}</label>
                  <div className="data">
                    <pre>{b}</pre>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </StyledDefaultContent>
  );
};

export default DefaultDisplay;
