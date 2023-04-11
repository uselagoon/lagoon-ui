import React, { FC } from "react";
import ProjectChildPageLink from "components/link/ProjectChildPageLink";
import ProjectLink from "components/link/Project";
import { StyledProjectNavTabs } from "./StyledProjectNavTabs";
import Skeleton from "react-loading-skeleton";

interface ProjectNavTabsSkeleton {
  activeTab: string;
  projectName: string;
}

const ProjectNavTabsSkeleton: FC<ProjectNavTabsSkeleton> = ({
  activeTab,
  projectName,
}) => (
  <StyledProjectNavTabs className="navigation">
      <li
        className={`overview ${
          activeTab == "overview" ? "active" : ""
        } deployLink`}
      >
        <ProjectLink projectSlug={projectName}>Overview</ProjectLink>
      </li>
      <li
        className={`variables ${
          activeTab == "variables" ? "active" : ""
        } deployLink`}
      >
        <ProjectChildPageLink
          childPage={"variables"}
          projectSlug={projectName}
        >
          Variables
        </ProjectChildPageLink>
      </li>

    <Skeleton style={{ height: "50px", lineHeight: "0.5" }} />
  </StyledProjectNavTabs>
);

export default ProjectNavTabsSkeleton;
