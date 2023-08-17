import React, { FC } from 'react';

import { BellOutlined, DeploymentUnitOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
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
