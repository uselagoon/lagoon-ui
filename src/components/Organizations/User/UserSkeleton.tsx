import React from 'react';
import Skeleton from 'react-loading-skeleton';

import OrgHeader from '../Orgheader';
import { TableWrapper } from '../SharedStyles';
import { StyledUser } from './Styles';

const UserSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const userSkeleton = (
    <div className="data-row" style={{ paddingLeft: '1rem', display: 'flex', gap: '1rem' }}>
      <div style={{ width: '20%' }}>
        <Skeleton height={30} />
      </div>
      <div style={{ width: '60%' }}>
        <Skeleton height={30} />
      </div>

      <div style={{ width: '20%' }}>
        <Skeleton height={30} />
      </div>
    </div>
  );

  const projectsSkeleton = (
    <div className="data-row" style={{ paddingLeft: '1rem', display: 'flex', gap: '1rem' }}>
      <div style={{ width: '80%' }}>
        <Skeleton height={30} />
      </div>
      <div style={{ width: '20%' }}>
        <Skeleton height={30} />
      </div>
    </div>
  );
  return (
    <StyledUser>
      <TableWrapper>
        <OrgHeader headerText="Groups" searchBar />

        <div className="data-table" style={{ margin: '60px 0' }}>
          {[...Array<undefined>(Math.floor(numberOfFields / 2))].map(() => userSkeleton)}
        </div>
        <OrgHeader headerText="Projects" searchBar />
        <div className="data-table">
          {[...Array<undefined>(Math.floor(numberOfFields / 2))].map(() => projectsSkeleton)}
        </div>
      </TableWrapper>
    </StyledUser>
  );
};

export default UserSkeleton;
