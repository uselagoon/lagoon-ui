import React from 'react';
import Skeleton from 'react-loading-skeleton';

import OrgHeader from '../Orgheader';
import { TableWrapper } from '../SharedStyles';
import { StyledGroupMembers } from './Styles';

const GroupMembersSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const groupMembers = (
    <div className="data-row">
      <div className="name">
        <Skeleton />
      </div>
      <div className="name">
        <Skeleton />
      </div>

      <div className="name">
        <Skeleton />
      </div>
      <div className="name">
        <Skeleton />
      </div>
      <div className="name">
        <Skeleton />
      </div>
    </div>
  );
  return (
    <StyledGroupMembers>
      <OrgHeader headerText="Users" searchBar />

      <div className="data-table" style={{ marginTop: '-60px' }}>
        {[...Array<undefined>(Math.floor(numberOfFields / 2))].map(() => groupMembers)}
      </div>
      <OrgHeader headerText="Projects" searchBar />
      <div className="data-table" style={{ marginTop: '-60px' }}>
        {[...Array<undefined>(Math.floor(numberOfFields / 2))].map(() => groupMembers)}
      </div>
    </StyledGroupMembers>
  );
};

export default GroupMembersSkeleton;
