import React from 'react';
import Skeleton from 'react-loading-skeleton';

import OrgHeader from '../Orgheader';
import { NameTagCol, StyledOrgNotifications } from './Styles';

const NotificationSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const notificationSkeleton = (key: number) => (
    <div className="data-row" key={key}>
      <NameTagCol>
        <div className="name">
          <Skeleton height={25} width={100} />
        </div>
        <div className="notiftype">
          <Skeleton height={25} width={100} />
        </div>
      </NameTagCol>
      <div className="notifdata">
        <Skeleton height={25} width={300} />
      </div>

      <div className="actions">
        <Skeleton height={25} width={80} />

        <Skeleton height={25} width={90} />
      </div>
    </div>
  );
  return (
    <StyledOrgNotifications>
      <OrgHeader headerText="Notifications" searchBar />
      <div className="data-table">
        {[...Array<undefined>(numberOfFields)].map((_, idx) => notificationSkeleton(idx))}
      </div>
    </StyledOrgNotifications>
  );
};

export default NotificationSkeleton;
