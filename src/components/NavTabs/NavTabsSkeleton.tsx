import React, { FC } from "react";
import EnvironmentLink from "components/link/Environment";
import BackupsLink from "components/link/Backups";
import DeploymentsLink from "components/link/Deployments";
import TasksLink from "components/link/Tasks";
import { StyledNavigation } from "./StylednavTabs";
import Skeleton from "react-loading-skeleton";

interface NavSkeletonProps {
  activeTab: string;
  projectName: string;
  openshiftProjectName: string;
}

const NavTabsSkeleton: FC<NavSkeletonProps> = ({
  activeTab,
  projectName,
  openshiftProjectName,
}) => (
  <StyledNavigation className="navigation">
    <li
      className={`overview ${
        activeTab == "overview" ? "active" : ""
      } deployLink`}
    >
      <EnvironmentLink
        environmentSlug={openshiftProjectName}
        projectSlug={projectName}
        className="deployLink"
      >
        Overview
      </EnvironmentLink>
    </li>
    <li
      className={`deployments ${
        activeTab == "deployments" ? "active" : ""
      } deployLink`}
    >
      <DeploymentsLink
        environmentSlug={openshiftProjectName}
        projectSlug={projectName}
        className="deployLink"
      >
        Deployments
      </DeploymentsLink>
    </li>
    <li
      className={`backups ${activeTab == "backups" ? "active" : ""} deployLink`}
    >
      <BackupsLink
        environmentSlug={openshiftProjectName}
        projectSlug={projectName}
        className="deployLink"
      >
        Backups
      </BackupsLink>
    </li>
    <li
      className={`tasks ${
        activeTab == "tasks" ? "active" : ""
      } ${"deployLink"}`}
    >
      <TasksLink
        environmentSlug={openshiftProjectName}
        projectSlug={projectName}
        className="deployLink"
      >
        Tasks
      </TasksLink>
    </li>
    <Skeleton style={{ height: "50px", lineHeight: "0.5" }} />
    <Skeleton style={{ height: "50px", lineHeight: "0.5" }} />
  </StyledNavigation>
);

export default NavTabsSkeleton;
