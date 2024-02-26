import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledOrgProjects } from './Styles';

const OrgProjectsSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const projectSkeleton = (key: number) => (
    <div className="data-row" key={key}>
      <div className="project">
        <Skeleton height={40} />
      </div>
      <div className="customer">
        <Skeleton height={40} />
      </div>
      <div className="customer">
        <Skeleton height={40} />
      </div>
    </div>
  );
  return (
    <StyledOrgProjects>
      <div className="data-table">{[...Array<undefined>(numberOfFields)].map((_, idx) => projectSkeleton(idx))}</div>
    </StyledOrgProjects>
  );
};

export default OrgProjectsSkeleton;
