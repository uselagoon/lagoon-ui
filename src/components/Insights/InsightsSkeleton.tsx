import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledInsights } from './StyledInsights';

const InsightsSkeleton = () => {
  return (
    <StyledInsights>
      <div className="overview">
        <ul className="overview-list">
          <li className="result">
            <span className="text-large">
              <Skeleton />
            </span>
          </li>
        </ul>
      </div>
      <div className="filters-wrapper">
        <div className="select-filters skeleton">
          <Skeleton inline />
          <Skeleton inline />
          <Skeleton inline />
        </div>
      </div>
      <div className="filters">
        <input type="text" id="filter" placeholder="Filter insights e.g. sbom.json" value={undefined} />
      </div>
      <div className="header">
        <button type="button" className="button-sort file">
          File
        </button>
        <button type="button" className="button-sort service">
          Service
        </button>
        <button type="button" className="button-sort type">
          Type
        </button>
        <button type="button" className="button-sort created">
          Created
        </button>
        <button className="button-sort size">Size</button>
        <button type="button" className="button-sort download">
          Download
        </button>
      </div>
      <div className="insights-container">
        <Skeleton count={5} style={{ height: '100px', lineHeight: '0.1' }} />
      </div>
    </StyledInsights>
  );
};

export default InsightsSkeleton;
