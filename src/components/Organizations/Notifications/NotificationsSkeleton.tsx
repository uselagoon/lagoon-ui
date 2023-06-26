import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledOrgNotifications } from './Styles';

const NotificationSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const notificationSkeleton = (
    <div className="data-row">
      <div className="name">
        <Skeleton />
      </div>
      <div className="notiftype">
        <Skeleton />
      </div>
      <div className="notifdata">
        <Skeleton />
      </div>
    </div>
  );
  return (
    <StyledOrgNotifications>
      <div className="header">
        <label>Notifications</label>
        <label></label>
        <input aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" disabled />
      </div>
      <div className="data-table">{[...Array<undefined>(numberOfFields)].map(() => notificationSkeleton)}</div>
    </StyledOrgNotifications>
  );
};

export default NotificationSkeleton;
