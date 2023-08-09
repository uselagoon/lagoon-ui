import React from 'react';
import Skeleton from 'react-loading-skeleton';

import OrgHeader from '../Orgheader';
import { GroupsWrapper, StyledGroups } from './Styles';

const GroupsSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const groupSkeleton = (
    <div className="data-row">
      <div className="group" style={{ width: '30%' }}>
        <Skeleton height={40} />
      </div>
      <div className="customer" style={{ width: '20%' }}>
        <Skeleton height={40} />
      </div>
      <div className="customer" style={{ width: '25%' }}>
        <Skeleton height={40} />
      </div>

      <div className="customer" style={{ width: '25%' }}>
        <Skeleton height={40} />
      </div>
    </div>
  );
  return (
    <GroupsWrapper>
      <OrgHeader headerText="Groups" />
      <StyledGroups>
        <div style={{ marginTop: '50px' }} className="data-table">
          {[...Array<undefined>(numberOfFields)].map(() => groupSkeleton)}
        </div>
      </StyledGroups>
    </GroupsWrapper>
  );
};

export default GroupsSkeleton;
