import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { SkeletonWrapper } from 'components/Deployment/StyledDeployment';
import { FieldWrapper } from 'styles/commonStyles';

import { StyledTask } from './StyledTask';

const TaskSkeleton = () => (
  <StyledTask className="task">
    <div className="details">
      <FieldWrapper className="created">
        <div>
          <label>Created</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </FieldWrapper>
      <FieldWrapper className="service">
        <div>
          <label>Service</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </FieldWrapper>
      <FieldWrapper className="status">
        <div>
          <label>Status</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </FieldWrapper>

      <FieldWrapper className="duration">
        <div>
          <label>Duration</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </FieldWrapper>
    </div>

    <SkeletonTheme baseColor="#222" highlightColor="#9a9a9a">
      <SkeletonWrapper>
        <Skeleton style={{ height: '200px' }} />
      </SkeletonWrapper>
    </SkeletonTheme>
  </StyledTask>
);

export default TaskSkeleton;
