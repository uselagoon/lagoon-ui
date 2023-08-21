import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledGroupMembers } from './Styles';

const ProjectGroupSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor(((window.innerHeight / 2) * 8) / 10 / 65) : 10;

  const groupsSkeleton = (
    <div className="data-row">
      <div className="customer">
        <Skeleton />
      </div>
      <div className="customer">
        <Skeleton />
      </div>
      <div className="customer">
        <Skeleton />
      </div>
      <div>
        <Skeleton />
      </div>
    </div>
  );
  return (
    <StyledGroupMembers>
      <div className="header" style={{ marginTop: '20px', paddingRight: '0' }}>
        <label style={{ paddingLeft: '0' }}>Groups</label>
        <input aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" disabled />
      </div>
      <div className="data-table">{[...Array<undefined>(numberOfFields)].map(() => groupsSkeleton)}</div>
    </StyledGroupMembers>
  );
};

export default ProjectGroupSkeleton;
