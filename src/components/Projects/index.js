import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import Box from 'components/Box';
import ProjectLink from 'components/link/Project';

import {
  ProjectsHeader,
  ProjectsPage,
  SearchInput,
  StyledCustomer,
  StyledProject,
  StyledRoute,
} from './StyledProjects';

/**
 * The primary list of projects.
 */
const Projects = ({ projects = [], initialSearch }) => {
  const [searchInput, setSearchInput] = useState(initialSearch);

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (initialSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  const filteredProjects = projects.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.trim().toLowerCase());
    let sortByUrl = '';
    if (key.environments[0] !== void 0) {
      if (key.environments[0].route !== null) {
        sortByUrl = key.environments[0].route.toLowerCase().includes(searchInput.trim().toLowerCase());
      }
    }
    return ['name', 'environments', '__typename'].includes(key) ? false : (true && sortByName) || sortByUrl;
  });

  return (
    <ProjectsPage id="projects">
      <ProjectsHeader>
        <label data-cy="projectsLength">
          {filteredProjects.length <= 1 ? `${filteredProjects.length} Project` : `${filteredProjects.length} Projects`}
        </label>
        <label></label>
        <SearchInput
          data-cy="searchBar"
          ref={searchInputRef}
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Type to search"
          disabled={projects.length === 0}
        />
      </ProjectsHeader>
      {!projects.length && (
        <Box className="box">
          <div className="project" data-cy="noProjects">
            <h4>No projects</h4>
          </div>
        </Box>
      )}
      {searchInput && !filteredProjects.length && (
        <Box className="box">
          <div className="project" data-cy="noMatch">
            <h4>No projects matching "{searchInput}"</h4>
          </div>
        </Box>
      )}
      {filteredProjects.map(project => (
        <ProjectLink projectSlug={project.name} key={project.id}>
          <Box className="box">
            <StyledProject>
              <h4>
                <Highlighter searchWords={[searchInput.trim()]} autoEscape={true} textToHighlight={project.name} />
              </h4>
              <StyledRoute data-cy="projects">
                {project.environments.map((environment, index) => (
                  <Highlighter
                    key={index}
                    searchWords={[searchInput.trim()]}
                    autoEscape={true}
                    textToHighlight={environment.route ? environment.route.replace(/^https?\:\/\//i, '') : ''}
                  />
                ))}
              </StyledRoute>
            </StyledProject>
            <StyledCustomer></StyledCustomer>
          </Box>
        </ProjectLink>
      ))}
    </ProjectsPage>
  );
};

export default Projects;
