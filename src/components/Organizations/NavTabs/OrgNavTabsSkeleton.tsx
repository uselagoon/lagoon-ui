import React, { FC } from 'react';

import { BellOutlined, DeploymentUnitOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import OrgGroupsLink from 'components/link/Organizations/Groups';
import OrgUsersLink from 'components/link/Organizations/Users';
import OrgNotificationsLink from 'components/link/Organizations/Notifications';
import OrganizationLink from 'components/link/Organizations/Organization';
import OrgProjectsLink from 'components/link/Organizations/Projects';

import { IOrganization } from '../Organizations';
import { StyledNavigation } from './StyledNavTabs';

interface NavSkeletonProps {
  activeTab: string;
}

const OrgNavTabsSkeleton: FC<NavSkeletonProps> = ({ activeTab }) => (
  <StyledNavigation className="navigation">
    <li className={`overview ${activeTab == 'overview' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <ReadOutlined className="icon" />
        <span className="destination">Overview</span>
      </a>
    </li>

    <li className={`groups ${activeTab == 'groups' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <TeamOutlined className="icon" />
        <span className="destination">Groups</span>
      </a>
    </li>
    <li className={`users ${activeTab == 'users' ? 'active' : ''} linkContainer`}>
      <OrgUsersLink organizationSlug={''} organizationName={''} className="navLink">
        <TeamOutlined className="icon" />
        <span className="destination">Users</span>
      </OrgUsersLink>
    </li>
    {activeTab == 'user' &&
      <li className={`user ${activeTab == 'user' ? 'active' : ''} linkContainer`}>
        <OrgUsersLink organizationSlug={''} organizationName={''} className="navLink">
          <TeamOutlined className="icon" />
          <span className="destination">User</span>
        </OrgUsersLink>
      </li>
    }
    <li className={`projects ${activeTab == 'projects' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <DeploymentUnitOutlined className="icon" />
        <span className="destination">Projects</span>
      </a>
    </li>
    <li className={`notifications ${activeTab == 'notifications' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <BellOutlined className="icon" />
        <span className="destination">Notifications</span>
      </a>
    </li>
  </StyledNavigation>
);

export default OrgNavTabsSkeleton;