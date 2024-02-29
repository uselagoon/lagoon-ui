import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import {
  CheckSquareOutlined,
  ReadOutlined,
  RocketOutlined,
  SaveOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import BackupsLink from 'components/link/Backups';
import DeploymentsLink from 'components/link/Deployments';
import EnvironmentLink from 'components/link/Environment';
import EnvironmentVariablesLink from 'components/link/EnvironmentVariables';
import TasksLink from 'components/link/Tasks';

import { StyledNavigation } from './StylednavTabs';

interface NavSkeletonProps {
  activeTab: string;
  projectName: string;
  openshiftProjectName: string;
}

const NavTabsSkeleton: FC<NavSkeletonProps> = ({ activeTab, projectName, openshiftProjectName }) => (
  <StyledNavigation>
    <li className={`overview ${activeTab == 'overview' ? 'active' : ''} linkContainer`}>
      <EnvironmentLink environmentSlug={openshiftProjectName} projectSlug={projectName} className="navLink">
        <ReadOutlined className="icon" />
        <span className="destination"> Environment Overview</span>
      </EnvironmentLink>
    </li>
    <li className={`deployments ${activeTab == 'deployments' ? 'active' : ''} linkContainer`}>
      <DeploymentsLink environmentSlug={openshiftProjectName} projectSlug={projectName} className="navLink">
        <RocketOutlined className="icon" />
        <span className="destination"> Deployments</span>
      </DeploymentsLink>
    </li>
    <li className={`backups ${activeTab == 'backups' ? 'active' : ''} linkContainer`}>
      <BackupsLink environmentSlug={openshiftProjectName} projectSlug={projectName} className="navLink">
        <SaveOutlined className="icon" />
        <span className="destination"> Backups</span>
      </BackupsLink>
    </li>
    <li className={`tasks ${activeTab == 'tasks' ? 'active' : ''} ${'linkContainer'}`}>
      <TasksLink environmentSlug={openshiftProjectName} projectSlug={projectName} className="navLink">
        <CheckSquareOutlined className="icon" />
        <span className="destination"> Tasks</span>
      </TasksLink>
    </li>
    <li className={`tasks ${activeTab == 'environmentVariables' ? 'active' : ''} ${'linkContainer'}`}>
      <EnvironmentVariablesLink environmentSlug={openshiftProjectName} projectSlug={projectName} className="navLink">
        <UnorderedListOutlined className="icon" />
        <span className="destination"> Variables</span>
      </EnvironmentVariablesLink>
    </li>
    <Skeleton style={{ height: '50px', lineHeight: '0.5' }} />
    <Skeleton style={{ height: '50px', lineHeight: '0.5' }} />
    <Skeleton style={{ height: '50px', lineHeight: '0.5' }} />
  </StyledNavigation>
);

export default NavTabsSkeleton;
