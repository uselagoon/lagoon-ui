import React, { FC } from 'react';

import getConfig from 'next/config';

import {
  BellOutlined,
  GlobalOutlined,
  GroupOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import { StyledNavigation } from './StyledNavTabs';

/* eslint-disable-next-line
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-call
*/
const { publicRuntimeConfig } = getConfig();

interface NavSkeletonProps {
  activeTab: string;
}

const OrgNavTabsSkeleton: FC<NavSkeletonProps> = ({ activeTab }) => (
  <StyledNavigation className="navigation">
    <li className={`overview ${activeTab == 'overview' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <ReadOutlined className="icon" />
        <span className="destination">Organization Overview</span>
      </a>
    </li>

    <li className={`groups ${activeTab == 'groups' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <GroupOutlined className="icon" />
        <span className="destination">Groups</span>
      </a>
    </li>
    <li className={`users ${activeTab == 'users' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <TeamOutlined className="icon" />
        <span className="destination">Users</span>
      </a>
    </li>
    <li className={`projects ${activeTab == 'projects' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <GlobalOutlined className="icon" />
        <span className="destination">Projects</span>
      </a>
    </li>
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      publicRuntimeConfig.LAGOON_UI_VIEW_ENV_VARIABLES == null && (
        <li className={`variables ${activeTab == 'variables' ? 'active' : ''} linkContainer`}>
          <a className="navLink">
            <UnorderedListOutlined className="icon" />
            <span className="destination">Variables</span>
          </a>
        </li>
      )
    }
    <li className={`notifications ${activeTab == 'notifications' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <BellOutlined className="icon" />
        <span className="destination">Notifications</span>
      </a>
    </li>
    <li className={`manage ${activeTab == 'manage' ? 'active' : ''} linkContainer`}>
      <a className="navLink">
        <SettingOutlined className="icon" />
        <span className="destination">Manage</span>
      </a>
    </li>
  </StyledNavigation>
);

export default OrgNavTabsSkeleton;
