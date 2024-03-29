import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledProjectNotifications } from './Styles';

const ProjectNotificationsSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor(((window.innerHeight / 2) * 8) / 10 / 65) : 10;

  const notificationsSkeleton = (key: number) => (
    <div className="data-row" key={key}>
      <div>
        <Skeleton height={40} />
      </div>
      <div>
        <Skeleton height={40} />
      </div>
      <div>
        <Skeleton height={40} />
      </div>
    </div>
  );
  return (
    <StyledProjectNotifications>
      <div className="header" style={{ marginTop: '20px', paddingRight: '0' }}>
        <label style={{ paddingLeft: '0' }}>Notifications</label>
        <input aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" disabled />
      </div>
      <div className="data-table">
        {[...Array<undefined>(numberOfFields)].map((_, idx) => notificationsSkeleton(idx))}
      </div>
    </StyledProjectNotifications>
  );
};

export default ProjectNotificationsSkeleton;
