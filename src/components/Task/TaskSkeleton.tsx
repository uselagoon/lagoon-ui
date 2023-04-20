import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { SkeletonWrapper } from 'components/Deployment/StyledDeployment';

import { StyledTask } from './StyledTask';

const TaskSkeleton = () => (
  <StyledTask className="task">
    <div className="details">
      <div className="field-wrapper created">
        <div>
          <label>Created</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </div>
      <div className="field-wrapper service">
        <div>
          <label>Service</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </div>
      <div className="field-wrapper status">
        <div>
          <label>Status</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </div>
    </div>

    <SkeletonTheme baseColor="#222" highlightColor="#9a9a9a">
      <SkeletonWrapper>
        <Skeleton style={{ height: '200px' }} />
      </SkeletonWrapper>
    </SkeletonTheme>
  </StyledTask>
);

export default TaskSkeleton;
