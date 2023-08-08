import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledGroupMembers } from './Styles';

const GroupMembersSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const groupMembers = (
    <div className="data-row">
      <div className="name">
        <Skeleton />
      </div>
      <div className="role">
        <Skeleton />
      </div>

      <div className="role">
        <Skeleton />
      </div>
    </div>
  );
  return (
    <StyledGroupMembers>
      <div className="header">
        <label>Users</label>
        <label></label>
        <input aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" disabled />
      </div>
      <div className="data-table">{[...Array<undefined>(numberOfFields)].map(() => groupMembers)}</div>
    </StyledGroupMembers>
  );
};

export default GroupMembersSkeleton;
