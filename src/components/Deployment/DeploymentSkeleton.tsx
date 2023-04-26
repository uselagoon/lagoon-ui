import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { ButtonRow, DeploymentDetails, FieldWrapper, SkeletonWrapper } from './StyledDeployment';

const DeploymentSkeleton = () => (
  <div className="deployment">
    <DeploymentDetails>
      <FieldWrapper className="created">
        <div>
          <label>Created</label>
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
      <FieldWrapper className="logstatus">
        <div>
          <label>Log view</label>
          <div className="field">
            <Skeleton />
          </div>
        </div>
      </FieldWrapper>
    </DeploymentDetails>
    <ButtonRow>
      <Skeleton />
    </ButtonRow>
    <SkeletonWrapper>
      <Skeleton count={10} style={{ height: '60px', lineHeight: '0.1' }} />
    </SkeletonWrapper>
  </div>
);

export default DeploymentSkeleton;
