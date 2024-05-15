import React from 'react';
import Skeleton from 'react-loading-skeleton';

import Link from 'next/link';

import { EnvironmentOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';

import OrgHeader from '../Orgheader';
import { LinkBtn, StyledOrganization, StyledOverview } from './Styles';

const OrganizationSkeleton = () => {
  const quotaDisplay = (quota: string) => {
    const pluralName = quota + 's';
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
      <div className="quotaField">
        <span>{pluralName.toUpperCase()}</span>
        <span className="quota">
          {capitalize(quota)} quota: <Skeleton width={'25%'} />
        </span>

        <Link href="#" legacyBehavior>
          <LinkBtn className="disabled">
            <EyeOutlined className="icon" /> {capitalize(pluralName)}
          </LinkBtn>
        </Link>
      </div>
    );
  };

  return (
    <StyledOrganization>
      <OrgHeader headerText="overview" />
      <StyledOverview>
        <Skeleton width={'20%'} />
        <span className="orgname"></span>
        <div className="description">
          <span className="title">Description</span>
          <Skeleton width={'20%'} />
        </div>

        <div className="info">
          <div className="quotas">
            {quotaDisplay('group')}
            {quotaDisplay('project')}
            {quotaDisplay('notification')}
          </div>
          <div className="targetwrapper">
            <div className="targets">
              <span>Available deploy targets</span>
              <div>
                <EnvironmentOutlined className="targetIcon" style={{ transform: 'translateY(-2px)' }} />
                <Skeleton width={'200px'} />
              </div>
            </div>

            <div className="users">
              <span>ADMINISTRATORS</span>
              <div>
                <UserOutlined className="userIcon" style={{ transform: 'translateY(-2px)' }} />
                <Skeleton width={'200px'} />
              </div>

              <div>
                <UserOutlined className="userIcon" style={{ transform: 'translateY(-2px)' }} />
                <Skeleton width={'200px'} />
              </div>
            </div>
          </div>
        </div>
      </StyledOverview>
    </StyledOrganization>
  );
};

export default OrganizationSkeleton;
