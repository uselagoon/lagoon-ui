import React from "react";
import ProjectVariablesLink from 'components/link/ProjectVariables';
import ProjectLink from "components/link/Project";
import DeployTargetsLink from "components/link/DeployTargets";
import { StyledProjectNavTabs } from "./StyledProjectNavTabs";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const ProjectNavTabs = ({ activeTab, project }) => {
  return (
    <StyledProjectNavTabs className="navigation">
      <li
        className={`overview ${
          activeTab == "overview" ? "active" : ""
        } deployLink`}
      >
        <ProjectLink projectSlug={project.name}>Overview</ProjectLink>
      </li>
      {publicRuntimeConfig.LAGOON_UI_VIEW_ENV_VARIABLES == null && 
        <li
          className={`variables ${
            activeTab == "variables" ? "active" : ""
          } deployLink`}
        >
          <ProjectVariablesLink
            projectSlug={project.name}
            className="deployLink"
          >
            Variables
          </ProjectVariablesLink>
        </li>
      }
      {project.deployTargetConfigs.length > 0 && (
        <li
          className={`deployTargets ${
            activeTab == "deployTargets" ? "active" : ""
          } deployLink`}
        >
          <DeployTargetsLink
            projectSlug={project.name}
            className="deployLink"
          >
            Deploy Targets
          </DeployTargetsLink>
        </li>
      )}
    </StyledProjectNavTabs>
  );
};

export default ProjectNavTabs;
