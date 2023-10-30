import React from 'react';

import getConfig from 'next/config';

import { DeploymentUnitOutlined, UnorderedListOutlined, ReadOutlined } from '@ant-design/icons';
import DeployTargetsLink from 'components/link/DeployTargets';
import ProjectLink from 'components/link/Project';
import ProjectVariablesLink from 'components/link/ProjectVariables';

import { StyledProjectNavTabs } from './StyledProjectNavTabs';

const { publicRuntimeConfig } = getConfig();

const ProjectNavTabs = ({ activeTab, project }) => {
  return (
    <StyledProjectNavTabs className="navigation">
      <li className={`overview ${activeTab === 'overview' ? 'active' : ''} linkContainer`}>
        <ProjectLink projectSlug={project.name} className="navLink">
          <ReadOutlined className="icon" />
          <span className="destination"> Project Overview</span>
        </ProjectLink>
      </li>
      {publicRuntimeConfig.LAGOON_UI_VIEW_ENV_VARIABLES == null && (
        <li data-cy="variablesLink" className={`variables ${activeTab === 'variables' ? 'active' : ''} linkContainer`}>
          <ProjectVariablesLink projectSlug={project.name} className="navLink">
            <UnorderedListOutlined className="icon" />
            <span className="destination"> Variables</span>
          </ProjectVariablesLink>
        </li>
      )}
      {project.deployTargetConfigs.length > 0 && (
        <li className={`deployTargets ${activeTab === 'deployTargets' ? 'active' : ''} linkContainer`}>
          <DeployTargetsLink projectSlug={project.name} className="navLink">
            <DeploymentUnitOutlined className="icon" />
            <span className="destination"> Deploy Targets</span>
          </DeployTargetsLink>
        </li>
      )}
    </StyledProjectNavTabs>
  );
};

export default ProjectNavTabs;
