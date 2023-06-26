import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledOrganization } from './Styles';

const OrganizationSkeleton = () => {
  return (
    <StyledOrganization>
      <div className="field-wrapper quotaProject">
        <div>
          <label>Project Quota</label>
          <Skeleton width={"85%"}/>
        </div>
        <div>
          <label>Group Quota</label>
          <Skeleton width={"85%"}/>
        </div>
        <div>
          <label>Notification Quota</label>
          <Skeleton width={"85%"}/>
        </div>
      </div>

      <div className="field-wrapper owners">
        <div>
          <label>Users</label>
          <div className="field">
            <Skeleton count={2} />
          </div>
        </div>
      </div>

      <div className="field-wrapper targets">
        <div>
          <label>Available DeployTargets</label>
          <div className="field">
            <Skeleton width={'50%'} />
          </div>
        </div>
      </div>
    </StyledOrganization>
  );
};

export default OrganizationSkeleton;
