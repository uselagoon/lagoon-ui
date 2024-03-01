import React from 'react';
import Skeleton from 'react-loading-skeleton';

import OrgHeader from '../Orgheader';
import { StyledGroupMembers } from './Styles';

const GroupMembersSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const groupMembers = (key: number) => (
    <div className="data-row" key={key}>
      <div className="name">
        <Skeleton height={40} />
      </div>
      <div className="name">
        <Skeleton height={40} />
      </div>

      <div className="name">
        <Skeleton height={40} />
      </div>
      <div className="name">
        <Skeleton height={40} />
      </div>
      <div className="name">
        <Skeleton height={40} />
      </div>
    </div>
  );
  return (
    <StyledGroupMembers>
      <OrgHeader headerText="Users" searchBar />

      <div className="data-table" style={{ marginTop: '-60px' }}>
        {[...Array<undefined>(Math.floor(numberOfFields / 2))].map((_, idx) => groupMembers(idx))}
      </div>
      <OrgHeader headerText="Projects" searchBar />
      <div className="data-table" style={{ marginTop: '-60px' }}>
        {[...Array<undefined>(Math.floor(numberOfFields / 2))].map((_, idx) => groupMembers(idx))}
      </div>
    </StyledGroupMembers>
  );
};

export default GroupMembersSkeleton;
