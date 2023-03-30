import React from "react";
import ProjectChildPageLink from "components/link/ProjectChildPageLink";
import ProjectLink from "components/link/Project";
import { StyledLeftNavTabs } from "./StyledLeftNavTabs";

const LeftNavTabs = ({ activeTab, project }) => {
  return (
    <StyledLeftNavTabs className="navigation">
      <li
        className={`overview ${
          activeTab == "overview" ? "active" : ""
        } deployLink`}
      >
        <ProjectLink projectSlug={project.name}>Overview</ProjectLink>
      </li>
      <li
        className={`variables ${
          activeTab == "variables" ? "active" : ""
        } deployLink`}
      >
        <ProjectChildPageLink
          childPage={"variables"}
          projectSlug={project.name}
          className="deployLink"
        >
          Variables
        </ProjectChildPageLink>
      </li>
      {project.deployTargetConfigs.length > 0 && (
        <li
          className={`deploy-targets ${
            activeTab == "deploy-targets" ? "active" : ""
          } deployLink`}
        >
          <ProjectChildPageLink
            childPage={"deploy-targets"}
            projectSlug={project.name}
            className="deployLink"
          >
            Deploy Targets
          </ProjectChildPageLink>
        </li>
      )}
    </StyledLeftNavTabs>
  );
};

export default LeftNavTabs;
