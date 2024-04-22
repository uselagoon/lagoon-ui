import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Box from 'components/Box';
import ProjectLink from 'components/link/Project';
import { debounce } from 'lib/util';

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
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (initialSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const timerLengthPercentage = useMemo(
    () => Math.min(1000, Math.max(40, Math.floor(projects.length * 0.0725))),
    [projects.length]
  );

  const debouncedSearch = useCallback(
    debounce(searchVal => {
      setSearchInput(searchVal);
    }, timerLengthPercentage),
    []
  );

  const handleSearch = searchVal => {
    setIsFiltering(true);
    debouncedSearch(searchVal);
  };

  useEffect(() => {
    const filterProjects = async () => {
      return new Promise(resolve => {
        const filtered = projects.filter(key => {
          const sortByName = key.name.toLowerCase().includes(searchInput.trim().toLowerCase());
          let sortByUrl = '';
          if (key.environments[0] !== void 0) {
            if (key.environments[0].route !== null) {
              sortByUrl = key.environments[0].route.toLowerCase().includes(searchInput.trim().toLowerCase());
            }
          }
          return ['name', 'environments', '__typename'].includes(key) ? false : (true && sortByName) || sortByUrl;
        });

        resolve(filtered);
      });
    };

    filterProjects()
      .then(filtered => setFilteredProjects(filtered))
      .finally(() => setIsFiltering(false));
  }, [searchInput, projects]);

  const MemoizedHighlighter = React.memo(Highlighter);

  const mappedProjects = useMemo(() => {
    return filteredProjects.map(project => (
      <ProjectLink projectSlug={project.name} key={project.id}>
        <Box className="box">
          <StyledProject>
            <h4>
              <MemoizedHighlighter
                searchWords={[searchInput.trim()]}
                autoEscape={true}
                textToHighlight={project.name}
              />
            </h4>
            <StyledRoute data-cy="projects">
              {project.environments.map((environment, index) => (
                <MemoizedHighlighter
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
    ));
  }, [filteredProjects]);

  return (
    <ProjectsPage id="projects">
      <ProjectsHeader>
        <label className="projectCount" data-cy="projectsLength">
          {`${filteredProjects.length} Projects`}
          {isFiltering && <Spin indicator={<LoadingOutlined />} />}
        </label>
        <label></label>
        <SearchInput
          data-cy="searchBar"
          defaultValue={searchInput}
          ref={searchInputRef}
          aria-labelledby="search"
          className="searchInput"
          type="text"
          onChange={e => handleSearch(e.target.value)}
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
      {mappedProjects}
    </ProjectsPage>
  );
};

export default Projects;
