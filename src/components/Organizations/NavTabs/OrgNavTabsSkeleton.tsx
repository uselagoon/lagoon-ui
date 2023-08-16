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
  organization: IOrganization;
}

const OrgNavTabsSkeleton: FC<NavSkeletonProps> = ({ activeTab }) => (
  <StyledNavigation className="navigation">
    <li className={`overview ${activeTab == 'overview' ? 'active' : ''} linkContainer`}>
      <OrganizationLink organizationName={''} organizationSlug={''} className="navLink">
        <ReadOutlined className="icon" />
        <span className="destination">Overview</span>
      </OrganizationLink>
    </li>

    <li className={`groups ${activeTab == 'groups' ? 'active' : ''} linkContainer`}>
      <OrgGroupsLink organizationSlug={''} organizationName={''} className="navLink">
        <TeamOutlined className="icon" />
        <span className="destination">Groups</span>
      </OrgGroupsLink>
    </li>
    <li className={`users ${activeTab == 'users' ? 'active' : ''} linkContainer`}>
      <OrgUsersLink organizationSlug={''} organizationName={''} className="navLink">
        <TeamOutlined className="icon" />
        <span className="destination">Users</span>
      </OrgUsersLink>
    </li>
    <li className={`user ${activeTab == 'user' ? 'active' : ''} linkContainer`}>
      <OrgUsersLink organizationSlug={''} organizationName={''} className="navLink">
        <TeamOutlined className="icon" />
        <span className="destination">User</span>
      </OrgUsersLink>
    </li>
    <li className={`projects ${activeTab == 'projects' ? 'active' : ''} linkContainer`}>
      <OrgProjectsLink organizationSlug={''} organizationName={''} className="navLink">
        <DeploymentUnitOutlined className="icon" />
        <span className="destination">Projects</span>
      </OrgProjectsLink>
    </li>
    <li className={`notifications ${activeTab == 'notifications' ? 'active' : ''} linkContainer`}>
      <OrgNotificationsLink organizationSlug={''} organizationName={''} className="navLink">
        <BellOutlined className="icon" />
        <span className="destination">Notifications</span>
      </OrgNotificationsLink>
    </li>
  </StyledNavigation>
);

export default OrgNavTabsSkeleton;