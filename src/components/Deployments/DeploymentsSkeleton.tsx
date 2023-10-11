import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledDeployments } from './StyledDeployments';

const DeploymentsSkeleton = () => {
  const numberOfDeploymentFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const skeletonItem = (
    <div className="deploymentRow">
      <div className="data-row">
        <div className="name">
          <Skeleton />
        </div>
        <div className="started">
          <Skeleton />
        </div>
        <div className="status">
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
      <div className="data-table">{[...Array<undefined>(numberOfDeploymentFields)].map(() => skeletonItem)}</div>
    </StyledDeployments>
  );
};

export default DeploymentsSkeleton;
