import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledGroups } from './Styles';

const GroupsSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const groupSkeleton = (
    <div className="data-row">
      <div className="group">
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
    <StyledGroups>
      <div className="header">
        <label>Groups</label>
        <label></label>
        <input aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" disabled />
      </div>
      <div className="data-table">{[...Array<undefined>(numberOfFields)].map(() => groupSkeleton)}</div>
    </StyledGroups>
  );
};

export default GroupsSkeleton;
