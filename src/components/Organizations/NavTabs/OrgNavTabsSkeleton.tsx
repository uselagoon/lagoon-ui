import React, { FC } from 'react';

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

const OrgNavTabsSkeleton: FC<NavSkeletonProps> = ({ activeTab }) => {
  const organization = { id: 0, name: ""}

  return (
    <StyledNavigation className="navigation">
      <li className={`overview ${activeTab == 'overview' ? 'active' : ''} navLink`}>
        <OrganizationLink organizationSlug={organization.id} organizationName={organization.name} className="navLink">
          Overview
        </OrganizationLink>
      </li>
      <li className={`groups ${activeTab == 'groups' ? 'active' : ''} navLink`}>
        <OrgGroupsLink organizationSlug={organization.id} organizationName={organization.name} className="navLink">
          Groups
        </OrgGroupsLink>
      </li>
      <li className={`users ${activeTab == 'users' ? 'active' : ''} navLink`}>
        <OrgUsersLink organizationSlug={organization.id} organizationName={organization.name} className="navLink">
          Users
        </OrgUsersLink>
      </li>
      <li className={`projects ${activeTab == 'projects' ? 'active' : ''} navLink`}>
        <OrgProjectsLink organizationSlug={organization.id} organizationName={organization.name} className="navLink">
          Projects
        </OrgProjectsLink>
      </li>
      <li className={`notifications ${activeTab == 'notifications' ? 'active' : ''} navLink`}>
        <OrgNotificationsLink organizationSlug={organization.id} organizationName={organization.name} className="navLink">
          Notifications
        </OrgNotificationsLink>
      </li>
    </StyledNavigation>
  )
};

export default OrgNavTabsSkeleton;
