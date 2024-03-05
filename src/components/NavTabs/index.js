import React from 'react';

import getConfig from 'next/config';

import {
  AlertOutlined,
  BarChartOutlined,
  CheckSquareOutlined,
  ReadOutlined,
  RocketOutlined,
  SaveOutlined,
  TagsOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import BackupsLink from 'components/link/Backups';
import DeploymentsLink from 'components/link/Deployments';
import EnvironmentLink from 'components/link/Environment';
import EnvironmentVariablesLink from 'components/link/EnvironmentVariables';
import FactsLink from 'components/link/Facts';
import InsightsLink from 'components/link/Insights';
import ProblemsLink from 'components/link/Problems';
import TasksLink from 'components/link/Tasks';

import { StyledNavigation } from './StylednavTabs';

const { publicRuntimeConfig } = getConfig();

const NavTabs = ({ activeTab, environment }) => (
  <StyledNavigation>
    <li className={`overview ${activeTab == 'overview' ? 'active' : ''} linkContainer`}>
      <EnvironmentLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className="navLink"
      >
        <ReadOutlined className="icon" />
        <span className="destination"> Environment Overview</span>
      </EnvironmentLink>
    </li>

    <li className={`deployments ${activeTab == 'deployments' ? 'active' : ''} linkContainer`}>
      <DeploymentsLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className="navLink"
      >
        <RocketOutlined className="icon" />
        <span className="destination"> Deployments</span>
      </DeploymentsLink>
    </li>

    <li className={`backups ${activeTab == 'backups' ? 'active' : ''} linkContainer`}>
      <BackupsLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className="navLink"
      >
        <SaveOutlined className="icon" />
        <span className="destination"> Backups</span>
      </BackupsLink>
    </li>

    <li className={`tasks ${activeTab == 'tasks' ? 'active' : ''} ${'linkContainer'}`}>
      <TasksLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className="navLink"
      >
        <CheckSquareOutlined className="icon" />
        <span className="destination"> Tasks</span>
      </TasksLink>
    </li>

    {publicRuntimeConfig.LAGOON_UI_VIEW_ENV_VARIABLES == null && (
      <li className={`environmentVariables ${activeTab == 'environmentVariables' ? 'active' : ''} ${'linkContainer'}`}>
        <EnvironmentVariablesLink
          environmentSlug={environment.openshiftProjectName}
          projectSlug={environment.project.name}
          className="navLink"
        >
          <UnorderedListOutlined className="icon" />
          <span className="destination"> Variables</span>
        </EnvironmentVariablesLink>
      </li>
    )}
    {environment.project.problemsUi == 1 && (
      <li className={`problems ${activeTab == 'problems' ? 'active' : ''} linkContainer`}>
        <ProblemsLink
          environmentSlug={environment.openshiftProjectName}
          projectSlug={environment.project.name}
          className="navLink"
        >
          <AlertOutlined className="icon" />
          <span className="destination"> Problems</span>
        </ProblemsLink>
      </li>
    )}
    {environment.project.factsUi == 1 && (
      <li className={`facts ${activeTab == 'facts' ? 'active' : ''} ${'linkContainer'}`}>
        <FactsLink
          environmentSlug={environment.openshiftProjectName}
          projectSlug={environment.project.name}
          className="navLink"
        >
          <TagsOutlined className="icon" />
          <span className="destination"> Facts</span>
        </FactsLink>
      </li>
    )}
    {environment.project.factsUi == 1 && (
      <li className={`insights ${activeTab == 'insights' ? 'active' : ''} linkContainer`}>
        <InsightsLink
          environmentSlug={environment.openshiftProjectName}
          projectSlug={environment.project.name}
          className="navLink"
        >
          <BarChartOutlined className="icon" />
          <span className="destination"> Insights</span>
        </InsightsLink>
      </li>
    )}
  </StyledNavigation>
);

export default NavTabs;
