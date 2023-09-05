import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import OrgHeader from '../Orgheader';
import { SkeletonWrapper, StyledUsers } from './Styles';

interface Props {
  title?: string;
}

const UsersSkeleton: FC<Props> = ({ title }) => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const usersSkeleton = (index: number) => (
    <SkeletonWrapper
      key={`usersSkeleton-${index}`}
      className="data-row"
    >
      <div className="customer">
        <Skeleton height={40} />
      </div>
      <div className="customer">
        <Skeleton height={40} />
      </div>
      <div className="customer">
        <Skeleton height={40} />
      </div>
      <div className="customer">
        <Skeleton height={40} />
      </div>
      <div className="customer">
        <Skeleton height={40} />
      </div>
      <div className="customer">
        <Skeleton height={40} />
      </div>
    </SkeletonWrapper>
  );
  return (
    <>
      <OrgHeader headerText={title ? title : 'Users'} />
      <StyledUsers>
        <div className="data-table">
          {[...Array<undefined>(numberOfFields)].map((_, index) => usersSkeleton(index))}
        </div>
      </StyledUsers>
    </>
  );
};

export default UsersSkeleton;
