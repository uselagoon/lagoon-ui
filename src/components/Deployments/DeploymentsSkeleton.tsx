import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledDeployments } from './StyledDeployments';

const DeploymentsSkeleton = () => {
  const numberOfDeploymentFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const skeletonItem = (idx: number) => (
    <div className="deploymentRow" key={idx}>
      <div className="data-row">
        <div className="name">
          <Skeleton />
        </div>
        <div className="started">
          <Skeleton />
        </div>
        <div>
          <Skeleton width={'80%'} />
        </div>
        <div className="duration">
          <Skeleton width={'80%'} />
        </div>
      </div>
      <div className="cancel-button">
        <Skeleton width={'80%'} />
      </div>
    </div>
  );

  return (
    <StyledDeployments>
      <div className="header">
        <label>Name</label>
        <label>Created</label>
        <label>Status</label>
        <label>Duration</label>
      </div>
      <div className="data-table">
        {[...Array<undefined>(numberOfDeploymentFields)].map((_, idx) => skeletonItem(idx))}
      </div>
    </StyledDeployments>
  );
};

export default DeploymentsSkeleton;
