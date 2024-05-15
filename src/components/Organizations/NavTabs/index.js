import React from 'react';

import {
  BellOutlined,
  GlobalOutlined,
  GroupOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import OrgGroupsLink from 'components/link/Organizations/Groups';
import OrgManageLink from 'components/link/Organizations/Manage';
import OrgNotificationsLink from 'components/link/Organizations/Notifications';
import OrganizationLink from 'components/link/Organizations/Organization';
import OrgProjectsLink from 'components/link/Organizations/Projects';
import OrgUsersLink from 'components/link/Organizations/Users';

import { StyledNavigation } from './StyledNavTabs';

const OrgNavTabs = ({ activeTab, organization }) => {
  return (
    <StyledNavigation>
      <li className={`overview ${activeTab == 'overview' ? 'active' : ''} linkContainer`}>
        <OrganizationLink
          orgFriendlyName={organization.friendlyName}
          organizationSlug={organization.name}
          organizationId={organization.id}
          className="navLink"
        >
          <ReadOutlined className="icon" />
          <span className="destination">Organization Overview</span>
        </OrganizationLink>
      </li>
      <li className={`groups ${activeTab == 'groups' ? 'active' : ''} linkContainer`}>
        <OrgGroupsLink
          orgFriendlyName={organization.friendlyName}
          organizationSlug={organization.name}
          organizationId={organization.id}
          className="navLink"
        >
          <GroupOutlined className="icon" />
          <span className="destination">Groups</span>
        </OrgGroupsLink>
      </li>
      <li className={`users ${activeTab == 'users' ? 'active' : ''} linkContainer`}>
        <OrgUsersLink
          orgFriendlyName={organization.friendlyName}
          organizationSlug={organization.name}
          organizationId={organization.id}
          className="navLink"
        >
          <TeamOutlined className="icon" />
          <span className="destination">Users</span>
        </OrgUsersLink>
      </li>
      <li className={`projects ${activeTab == 'projects' ? 'active' : ''} linkContainer`}>
        <OrgProjectsLink
          orgFriendlyName={organization.friendlyName}
          organizationSlug={organization.name}
          organizationId={organization.id}
          className="navLink"
        >
          <GlobalOutlined className="icon" />
          <span className="destination">Projects</span>
        </OrgProjectsLink>
      </li>
      <li className={`notifications ${activeTab == 'notifications' ? 'active' : ''} linkContainer`}>
        <OrgNotificationsLink
          orgFriendlyName={organization.friendlyName}
          organizationSlug={organization.name}
          organizationId={organization.id}
          className="navLink"
        >
          <BellOutlined className="icon" />
          <span className="destination">Notifications</span>
        </OrgNotificationsLink>
      </li>

      <li className={`manage ${activeTab == 'manage' ? 'active' : ''} linkContainer`}>
        <OrgManageLink
          orgFriendlyName={organization.friendlyName}
          organizationSlug={organization.name}
          organizationId={organization.id}
          className="navLink"
        >
          <SettingOutlined className="icon" />
          <span className="destination">Manage</span>
        </OrgManageLink>
      </li>
    </StyledNavigation>
  );
};

export default OrgNavTabs;
