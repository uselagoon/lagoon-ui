import React from 'react';

import { BellOutlined, DeploymentUnitOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import OrgGroupsLink from 'components/link/Organizations/Groups';
import OrgNotificationsLink from 'components/link/Organizations/Notifications';
import OrganizationLink from 'components/link/Organizations/Organization';
import OrgProjectsLink from 'components/link/Organizations/Projects';

import { StyledNavigation } from './StyledNavTabs';

const OrgNavTabs = ({ activeTab, organization }) => (
  <StyledNavigation>
    <li className={`overview ${activeTab == 'overview' ? 'active' : ''} linkContainer`}>
      <OrganizationLink organizationName={organization.name} organizationSlug={organization.id} className="navLink">
        <ReadOutlined className="icon" />
        <span className="destination">Overview</span>
      </OrganizationLink>
    </li>
    <li className={`groups ${activeTab == 'groups' ? 'active' : ''} linkContainer`}>
      <OrgGroupsLink organizationSlug={organization.id} organizationName={organization.name} className="navLink">
        <TeamOutlined className="icon" />
        <span className="destination">Groups</span>
      </OrgGroupsLink>
    </li>
    <li className={`projects ${activeTab == 'projects' ? 'active' : ''} linkContainer`}>
      <OrgProjectsLink organizationSlug={organization.id} organizationName={organization.name} className="navLink">
        <DeploymentUnitOutlined className="icon" />
        <span className="destination">Projects</span>
      </OrgProjectsLink>
    </li>
    <li className={`notifications ${activeTab == 'notifications' ? 'active' : ''} linkContainer`}>
      <OrgNotificationsLink organizationSlug={organization.id} organizationName={organization.name} className="navLink">
        <BellOutlined className="icon" />
        <span className="destination">Notifications</span>
      </OrgNotificationsLink>
    </li>
  </StyledNavigation>
);

export default OrgNavTabs;
