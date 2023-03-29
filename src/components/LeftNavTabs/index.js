import React from 'react';
import ProjectChildPageLink from 'components/link/ProjectChildPageLink';
import ProjectLink from 'components/link/Project';
import {StyledLeftNavTabs} from "./StyledLeftNavTabs";


const LeftNavTabs = ({ activeTab, project }) => {
  return (
  <StyledLeftNavTabs className="navigation">
    <li
      className={`overview ${
        activeTab == 'overview' ? 'active' : ''
      } deployLink`}
    >
      <ProjectLink
        projectSlug={project}
      >
        Overview
      </ProjectLink>
    </li>
    <li
      className={`environments ${
        activeTab == 'environments' ? 'active' : ''
      } deployLink`}
    >
      <ProjectChildPageLink
        childPage={'environments'}
        projectSlug={project}
        className="deployLink"
      >
        Environments
      </ProjectChildPageLink>
    </li>
    <li
      className={`variables ${
        activeTab == 'variables' ? 'active' : ''
      } deployLink`}
    >
      <ProjectChildPageLink
        childPage={'variables'}
        projectSlug={project}
        className="deployLink"
      >
        Variables
      </ProjectChildPageLink>
    </li>
  </StyledLeftNavTabs>
)};

export default LeftNavTabs;
