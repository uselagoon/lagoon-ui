import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import OrgHeader from '../Orgheader';
import { StyledUsers } from './Styles';

interface Props {
  title?: string;
}

const UsersSkeleton: FC<Props> = ({ title }) => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const groupSkeleton = (index: number) => (
    <div
      key={`groupSkeleton-${index}`}
      className="data-row"
      style={{ display: 'flex', gap: '1rem', paddingLeft: '1rem' }}
    >
      <div className="customer" style={{ width: '15%' }}>
        <Skeleton height={40} />
      </div>
      <div className="customer" style={{ width: '15%' }}>
        <Skeleton height={40} />
      </div>
      <div className="customer" style={{ width: '25%' }}>
        <Skeleton height={40} />
      </div>
      <div className="customer" style={{ width: '15%' }}>
        <Skeleton height={40} />
      </div>
      <div className="customer" style={{ width: '15%' }}>
        <Skeleton height={40} />
      </div>
      <div className="customer" style={{ width: '15%' }}>
        <Skeleton height={40} />
      </div>
    </div>
  );
  return (
    <>
      <OrgHeader headerText={title ? title : 'Users'} />
      <StyledUsers>
        <div className="data-table">
          {[...Array<undefined>(numberOfFields)].map((_, index) => groupSkeleton(index))}
        </div>
      </StyledUsers>
    </>
  );
};

export default UsersSkeleton;
