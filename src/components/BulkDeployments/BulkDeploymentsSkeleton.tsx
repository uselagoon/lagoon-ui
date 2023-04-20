import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { BulkDeploymentsDataTable, BulkDeploymentsHeader } from './StyledBulkDeployments';

const BulkDeploymentsSkeleton = () => {
  const numberOfItems = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;
  const rowItem = (
    <div className="data-row">
      <div className="project">
        <Skeleton />
      </div>
      <div className="environment">
        <Skeleton />
      </div>
      <div className="name">
        <Skeleton />
      </div>
      <div className="priority">
        <Skeleton />
      </div>
      <div className="started">
        <Skeleton />
      </div>
      <div className="status">
        <Skeleton />
      </div>
      <div className="duration"></div>
      <div></div>
    </div>
  );

  return (
    <div className="deployments">
      <BulkDeploymentsHeader>
        <label>Project</label>
        <label>Environment</label>
        <label>Name</label>
        <label className="priority">Priority</label>
        <label>Created</label>
        <label>Status</label>
        <label>Duration</label>
        <label></label>
      </BulkDeploymentsHeader>
      <BulkDeploymentsDataTable>{[...Array<undefined>(numberOfItems)].map(() => rowItem)}</BulkDeploymentsDataTable>
    </div>
  );
};

export default BulkDeploymentsSkeleton;
