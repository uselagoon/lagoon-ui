import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { BulkDeploymentsDataTable, BulkDeploymentsHeader } from './StyledBulkDeployments';

const BulkDeploymentsSkeleton = () => {
  const numberOfItems = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;
  const rowItem = (
    <div className="data-row">
      <div className="project">
        <Skeleton width={'100%'} />
      </div>
      <div className="environment">
        <Skeleton width={'100%'} />
      </div>
      <div className="name">
        <Skeleton width={'100%'} />
      </div>
      <div className="priority">
        <Skeleton width={'100%'} />
      </div>
      <div className="created">
        <Skeleton width={'100%'} />
      </div>
      <div>
        <Skeleton width={'100%'} />
      </div>
      <div className="duration">
        <Skeleton width={'100%'} />
      </div>
      <div>
        <Skeleton width={'100%'} />
      </div>
    </div>
  );

  return (
    <div className="deployments">
      <BulkDeploymentsHeader>
        <label>Project</label>
        <label>Environment</label>
        <label className="name">Name</label>
        <label className="priority">Priority</label>
        <label className="created">Created</label>
        <label className="status">Status</label>
        <label className="duration">Duration</label>
        <label></label>
      </BulkDeploymentsHeader>
      <BulkDeploymentsDataTable>{[...Array<undefined>(numberOfItems)].map(() => rowItem)}</BulkDeploymentsDataTable>
    </div>
  );
};

export default BulkDeploymentsSkeleton;
