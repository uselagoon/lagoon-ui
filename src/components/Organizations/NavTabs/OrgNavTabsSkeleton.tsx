import React, { FC } from 'react';

import OrgGroupsLink from 'components/link/Organizations/Groups';
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
    <li className={`overview ${activeTab == 'overview' ? 'active' : ''} navLink`}>
      <OrganizationLink organizationName={''} organizationSlug={''} className="navLink">
        Overview
      </OrganizationLink>
    </li>

    <li className={`groups ${activeTab == 'groups' ? 'active' : ''} navLink`}>
      <OrgGroupsLink organizationSlug={''} organizationName={''} className="navLink">
        Groups
      </OrgGroupsLink>
    </li>
    <li className={`projects ${activeTab == 'projects' ? 'active' : ''} navLink`}>
      <OrgProjectsLink organizationSlug={''} organizationName={''} className="navLink">
        Projects
      </OrgProjectsLink>
    </li>
    <li className={`notifications ${activeTab == 'notifications' ? 'active' : ''} navLink`}>
      <OrgNotificationsLink organizationSlug={''} organizationName={''} className="navLink">
        Notifications
      </OrgNotificationsLink>
    </li>
  </StyledNavigation>
);

export default OrgNavTabsSkeleton;
