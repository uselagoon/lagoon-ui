import React, { FC } from 'react';

import { DeploymentUnitOutlined, UnorderedListOutlined, ReadOutlined } from '@ant-design/icons';
import DeployTargetsLink from 'components/link/DeployTargets';
import ProjectLink from 'components/link/Project';
import ProjectChildPageLink from 'components/link/ProjectChildPageLink';

import { StyledProjectNavTabs } from './StyledProjectNavTabs';

interface ProjectNavTabsSkeleton {
  activeTab: string;
  projectName: string;
}

const ProjectNavTabsSkeleton: FC<ProjectNavTabsSkeleton> = ({ activeTab, projectName }) => (
  <StyledProjectNavTabs>
    <li className={`overview ${activeTab == 'overview' ? 'active' : ''} linkContainer`}>
      <ProjectLink projectSlug={projectName} className="navLink">
        <ReadOutlined className="icon" />
        <span className="destination"> Project Overview</span>
      </ProjectLink>
    </li>
    <li className={`variables ${activeTab == 'variables' ? 'active' : ''} linkContainer`}>
      <ProjectChildPageLink childPage={'variables'} projectSlug={projectName} className="navLink">
        <UnorderedListOutlined className="icon" />
        <span className="destination"> Variables</span>
      </ProjectChildPageLink>
    </li>
    {activeTab == 'deployTargets' && (
      <li className={`deployTargets ${activeTab == 'deployTargets' ? 'active' : ''} linkContainer`}>
        <DeployTargetsLink className="navLink" projectSlug={projectName}>
          <DeploymentUnitOutlined className="icon" />
          <span className="destination"> Deploy Targets</span>
        </DeployTargetsLink>
      </li>
    )}
  </StyledProjectNavTabs>
);

export default ProjectNavTabsSkeleton;
