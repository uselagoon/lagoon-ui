import React from 'react';
import EnvironmentLink from 'components/link/Environment';
import BackupsLink from 'components/link/Backups';
import DeploymentsLink from 'components/link/Deployments';
import TasksLink from 'components/link/Tasks';
import ProblemsLink from 'components/link/Problems';
import FactsLink from 'components/link/Facts';
import InsightsLink from 'components/link/Insights';
import {StyledNavigation} from "./StylednavTabs";


const NavTabs = ({ activeTab, environment }) => (
  <StyledNavigation className="navigation">
    <li
      className={`overview ${
        activeTab == 'overview' ? 'active' : ''
      } deployLink`}
    >
      <EnvironmentLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className="deployLink"
      >
        Overview
      </EnvironmentLink>
    </li>
    <li
      className={`deployments ${
        activeTab == 'deployments' ? 'active' : ''
      } deployLink`}
    >
      <DeploymentsLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className="deployLink"
      >
        Deployments
      </DeploymentsLink>
    </li>
    <li
      className={`backups ${
        activeTab == 'backups' ? 'active' : ''
      } deployLink`}
    >
      <BackupsLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className="deployLink"
      >
        Backups
      </BackupsLink>
    </li>
    <li
      className={`tasks ${activeTab == 'tasks' ? 'active' : ''} ${"deployLink"}`}
    >
      <TasksLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className="deployLink"
      >
        Tasks
      </TasksLink>
    </li>
    {(environment.project.problemsUi == 1) && <li
      className={`problems ${activeTab == 'problems' ? 'active' : ''} deployLink`}
    >
      <ProblemsLink
          environmentSlug={environment.openshiftProjectName}
          projectSlug={environment.project.name}
          className="deployLink"
      >
        Problems
      </ProblemsLink>
    </li>
    }
    {(environment.project.factsUi == 1) && <li
      className={`facts ${activeTab == 'facts' ? 'active' : ''} ${"deployLink"}`}
    >
      <FactsLink
        environmentSlug={environment.openshiftProjectName}
        projectSlug={environment.project.name}
        className="deployLink"
      >
        Facts
      </FactsLink>
    </li>
    }
    {(environment.project.factsUi == 1) && <li
        className={`insights ${activeTab == 'insights' ? 'active' : ''} deployLink`}
      >
        <InsightsLink
          environmentSlug={environment.openshiftProjectName}
          projectSlug={environment.project.name}
          className="deployLink"
        >
          Insights
        </InsightsLink>
      </li>
    }

  </StyledNavigation>
);

export default NavTabs;
