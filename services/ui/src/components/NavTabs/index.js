import React from 'react';
import css from 'styled-jsx/css';
import EnvironmentLink from 'components/link/Environment';
import BackupsLink from 'components/link/Backups';
import DeploymentsLink from 'components/link/Deployments';
import TasksLink from 'components/link/Tasks';
import ProblemsLink from 'components/link/Problems';
import FactsLink from 'components/link/Facts';
import RoutesLink from 'components/link/Routes';

import { bp, color } from 'lib/variables';
import { Icon } from 'semantic-ui-react';

const { className: aClassName, styles: aStyles } = css.resolve`
  a {
    color: ${color.darkGrey};
    display: block;
    padding: 20px;
  }

  .active a {
    color: ${color.black};
  }
`;

const NavTabs = ({ activeTab, environment }) => (
  <ul className="navigation">
    <li
      className={`overview ${
        activeTab == 'overview' ? 'active' : ''
      } ${aClassName}`}
    >
      <EnvironmentLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className={aClassName}
      >
        <Icon link name='bullseye'/> Overview
      </EnvironmentLink>
    </li>
    <li
      className={`deployments ${
        activeTab == 'deployments' ? 'active' : ''
      } ${aClassName}`}
    >
      <DeploymentsLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className={aClassName}
      >
        <Icon link name='bell outline'/> Deployments
      </DeploymentsLink>
    </li>
    <li
      className={`backups ${
        activeTab == 'backups' ? 'active' : ''
      } ${aClassName}`}
    >
      <BackupsLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className={aClassName}
      >
        <Icon link name='history'/> Backups
      </BackupsLink>
    </li>
    <li className={`routes ${activeTab == 'routes' ? 'active' : ''} ${aClassName}`}>
      <RoutesLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className={aClassName}
      >
        <Icon link name='external'/> Routes
      </RoutesLink>
    </li>
    <li
      className={`tasks ${activeTab == 'tasks' ? 'active' : ''} ${aClassName}`}
    >
      <TasksLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className={aClassName}
      >
        <Icon link name='check circle outline'/> Tasks
      </TasksLink>
    </li>
    {(environment.project.problemsUi == 1) && <li
      className={`problems ${activeTab == 'problems' ? 'active' : ''} ${aClassName}`}
    >
      <ProblemsLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className={aClassName}
      >
        <Icon link name='exclamation'/> Problems
      </ProblemsLink>
    </li>
    }
    {(environment.project.factsUi == 1) && <li
      className={`facts ${activeTab == 'facts' ? 'active' : ''} ${aClassName}`}
    >
      <FactsLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className={aClassName}
      >
        <Icon link name='info'/> Facts
      </FactsLink>
    </li>
    }
    <style jsx>{`
      ul.navigation {
        display: flex;
        justify-content: flex-start;
        background: ${color.lightestGrey};
        border-right: 1px solid ${color.midGrey};
        margin: 0 0 2em;
        z-index: 10;
        padding-left: 0;

        li {
          border-bottom: 1px solid ${color.midGrey};
          margin: 0;
          padding: 0;
          position: relative;

          &:hover {
            background-color: ${color.white};
          }

          &.active {
            background-color: ${color.white};
          }
        }
      }
    `}</style>
    {aStyles}
  </ul>
);

export default NavTabs;
