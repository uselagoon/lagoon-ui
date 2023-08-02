import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledUsers } from './Styles';

const UsersSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const groupSkeleton = (
    <div className="data-row">
      <div className="user">
        <Skeleton />
      </div>
    </div>
  );
  return (
    <StyledUsers>
      <div className="header">
        <label>Users</label>
        <label></label>
        <input aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" disabled />
      </div>
      <div className="data-table">{[...Array<undefined>(numberOfFields)].map(() => groupSkeleton)}</div>
    </StyledUsers>
  );
};

export default UsersSkeleton;
