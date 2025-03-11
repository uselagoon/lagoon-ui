import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import getConfig from 'next/config';

import { DeploymentUnitOutlined, ReadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import DeployTargetsLink from 'components/link/DeployTargets';
import ProjectLink from 'components/link/Project';
import ProjectChildPageLink from 'components/link/ProjectChildPageLink';

import { StyledProjectNavTabs } from './StyledProjectNavTabs';

/* eslint-disable-next-line
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-call
*/
const { publicRuntimeConfig } = getConfig();

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
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      publicRuntimeConfig.LAGOON_UI_VIEW_ENV_VARIABLES == null && (
        <li className={`variables ${activeTab == 'variables' ? 'active' : ''} linkContainer`}>
          <ProjectChildPageLink childPage={'variables'} projectSlug={projectName} className="navLink">
            <UnorderedListOutlined className="icon" />
            <span className="destination"> Variables</span>
          </ProjectChildPageLink>
        </li>
      )
    }
    {activeTab == 'deployTargets' && (
      <li className={`deployTargets ${activeTab == 'deployTargets' ? 'active' : ''} linkContainer`}>
        <DeployTargetsLink className="navLink" projectSlug={projectName}>
          <DeploymentUnitOutlined className="icon" />
          <span className="destination"> Deploy Targets</span>
        </DeployTargetsLink>
      </li>
    )}
    <Skeleton style={{ height: '50px', lineHeight: '0.5' }} />
  </StyledProjectNavTabs>
);

export default ProjectNavTabsSkeleton;
