import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledProjectNotifications } from './Styles';

const ProjectNotificationsSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor(((window.innerHeight / 2) * 8) / 10 / 65) : 10;

  const notificationsSkeleton = (
    <div className="data-row">
      <div className="name">
        <Skeleton />
      </div>
      <div>
        <Skeleton />
      </div>
      <div>
        <Skeleton />
      </div>
    </div>
  );
  return (
    <StyledProjectNotifications>
      <div className="header">
        <label>Notifications</label>
        <label></label>
        <input aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" disabled />
      </div>
      <div className="data-table">{[...Array<undefined>(numberOfFields)].map(() => notificationsSkeleton)}</div>
    </StyledProjectNotifications>
  );
};

export default ProjectNotificationsSkeleton;
