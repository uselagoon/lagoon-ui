import React, { useState } from 'react';
import ProjectGroupLink from 'components/link/Organizations/ProjectGroup';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import DeleteConfirm from 'components/DeleteConfirm';
import {StyledOrgProjects} from "./Styles";

const DELETE_PROJECT = gql`
  mutation deleteProject($project: String!) {
    deleteProject(input:{
      project: $project
    })
  }
`;
/**
 * The primary list of projects.
 */
const OrgProjects = ({ projects = [], organizationId, organizationName, refresh }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredProjects = projects.filter(key => {
    const sortByName = key.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    let sortByUrl = '';
    return ['name', 'environments', '__typename'].includes(key)
      ? false
      : (true && sortByName) || sortByUrl;
  });

  return (
    <StyledOrgProjects>
      <div className="header">
        <label>Projects</label>
        <label></label>
        <input
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Type to search"
          disabled={projects.length === 0}
        />
      </div>
      <div className="data-table">
      {!projects.length && (
        <div className="data-none">No projects</div>
      )}
      {(searchInput && !filteredProjects.length) && (
        <div className="data-none">No projects matching "{searchInput}"</div>
      )}
      {filteredProjects.map(project => (
        <div className="data-row" key={project.name} project={project.name}>
            <div className="project">
              <ProjectGroupLink projectGroupSlug={project.name}
              organizationSlug={organizationId}
              organizationName={organizationName}
              key={project.id}>
                {project.name}
              </ProjectGroupLink>
            </div>
            <div className="customer">
              Groups: {project.groups.length}
            </div>
            <div className="remove">
              <Mutation mutation={DELETE_PROJECT}>
              {(deleteProject, { _, __, error, data }) => {
                if (error) {
                  return <div>{error.message}</div>;
                }
                if (data) {
                  refresh();
                }
                return (
                  <DeleteConfirm
                    deleteName={project.name}
                    deleteType="project"
                    onDelete={() => {
                      deleteProject({
                        variables: {
                          project: project.name,
                        }
                      })
                    }
                    }
                  />
                );
              }}
            </Mutation>
            </div>
        </div>
      ))}
      </div>
    </StyledOrgProjects>
  );
};

export default OrgProjects;
