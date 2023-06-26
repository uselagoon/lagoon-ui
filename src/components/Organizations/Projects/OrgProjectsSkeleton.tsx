import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledOrgProjects } from './Styles';

const OrgProjectsSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const projectSkeleton = (
    <div className="data-row">
      <div className="project">
        <Skeleton />
      </div>
      <div className="customer">
        <Skeleton />
      </div>
      <div className="customer">
        <Skeleton />
      </div>
    </div>
  );
  return (
    <StyledOrgProjects>
      <div className="header">
        <label>Projects</label>
        <label></label>
        <input aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" disabled />
      </div>
      <div className="data-table">{[...Array<undefined>(numberOfFields)].map(() => projectSkeleton)}</div>
    </StyledOrgProjects>
  );
};

export default OrgProjectsSkeleton;
