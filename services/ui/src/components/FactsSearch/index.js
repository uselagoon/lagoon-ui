import React, { useState, useEffect, memo, Suspense } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Pagination, Icon } from 'semantic-ui-react';
import dynamic from 'next/dynamic';

import { LazyLoadingContent } from 'components/Loading';

import Error from 'components/Error';
import { MultiSelectFilter, MultiCreatableSelectFilter } from 'components/Filters';
import FactSearchTabs from 'components/FactSearchTabs';
import ResultsSummary from 'components/ResultsSummary';

import AllProjectsFromFacts from 'lib/query/AllProjectsFromFacts';
import useEnvironmentsData from './fetchEnvironments';

// Filters
// @TODO: Fetch what is available for user from facts
const statuses = [
  { value: '200', label: '200' },
  { value: '403', label: '403' },
  { value: '200', label: '404' },
  { value: '200', label: '500' },
  { value: '200', label: '503' },
  { value: '200', label: '504' }
];

const statusesGroup = [
  {
    label: "Suggestions",
    options: statuses
  }
]

const frameworks = [
  { value: 'Drupal', label: 'Drupal' },
  { value: 'Laravel', label: 'Laravel' },
  { value: 'Node', label: 'NodeJS' },
  { value: 'Wordpress', label: 'Wordpress' },
  { value: 'Symfony', label: 'Symfony' }
];

const frameworksGroup = [
  {
    label: "Suggestions",
    options: frameworks
  }
];

const languages = [
  { value: 'PHP_VERSION', label: 'PHP' },
  { value: 'Node', label: 'NodeJS' },
  { value: 'Python', label: 'Python' },
  { value: 'Go', label: 'Go' }
];

const languagesGroup = [
  {
    label: "Suggestions",
    options: languages
  }
];

export const DEFAULT_PROJECTS_LIMIT = 25;
export const DEFAULT_ENVIRONMENTS_LIMIT = 25;

const FactsSearch = ({ categoriesSelected }) => {
  const [projectQuery, setProjectQuery] = useState(AllProjectsFromFacts);
  const [projects, setProjects] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [projectSelected, setProjectSelected] = useState('');
  const [take, setTake] = useState(DEFAULT_PROJECTS_LIMIT);
  const [activeTab, setActiveTab] = useState('All projects');
  const [sort, setSort] = useState('');
  const [skipProject, setProjectSkip] = useState(0);
  const [skipEnvironment, setEnvironmentSkip] = useState(0);
  const [activeProjectPage, setProjectActivePage] = useState(1);
  const [activeEnvironmentPage, setEnvironmentActivePage] = useState(1);

  const [searchEnterValue, setSearchEnterValue] = useState('');
  const [statusesSelected, setStatusesSelected] = useState([]);
  const [frameworksSelected, setFrameworksSelected] = useState([]);
  const [languagesSelected, setLanguagesSelected] = useState([]);
  const [searchInputFilter, setSearchInputFilter] = useState([]);
  const [factFilters, setFactFilters] = useState([]);
  const [connectiveSelected, setConnective] = useState(searchEnterValue ? 'OR' : 'AND');


  const FactSearchResults = dynamic(() => import('components/FactSearchResults'));
  const { environments, environmentsCount, environmentsLoading } = useEnvironmentsData(activeTab, factFilters, connectiveSelected, take, skipEnvironment);

  // Fetch results
  const { data, loading, error } = useQuery(projectQuery, {
    variables: {
      input: {
        filters: factFilters || [],
        filterConnective: connectiveSelected,
        take: take,
        skip: activeTab === "All projects" ? skipProject : skipEnvironment
      }
    },
    // query will always make an initial network request, but will read from the cache after that.
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  // Active tab
  const handleActiveTab = (name) => {
    setActiveTab(name);
  }

  // Pagniation
  const onProjectPaginationChange = (event, data) => {
    setProjectSkip(take * (data.activePage - 1));
    setProjectActivePage(Math.ceil(data.activePage));
  }

  const onEnvironmentPaginationChange = (event, data) => {
    setEnvironmentSkip(take * (data.activePage - 1));
    setEnvironmentActivePage(Math.ceil(data.activePage));
  }

  // Project selection
  const handleProjectSelectChange = async (project, sort) => {
    setSort(sort);
    setProjectSelected(project);
  };

  const handleStatusChange = (status) => {
    let nextFactFilter = status && status.map(s => {
      return ({
        lhsTarget: "FACT",
        name: "site-code-status",
        contains: s.value
      });
    });
    setStatusesSelected(nextFactFilter || []);
    setProjectSelected(null);
  };

  // const handleEnvTypesChange = (status) => {
  //   let nextFactFilter = status && status.map(s => {
  //     return ({
  //       lhsTarget: "FACT",
  //       name: "site-code-status",
  //       contains: s.value
  //     });
  //   });
  //   setStatusesSelected(nextFactFilter || []);
  //   setProjectSelected(null);
  // };

  const handleFrameworkChange = (frameworks) => {
    let nextFactFilter = frameworks && frameworks.map(f => {
      const isSemVerValue = (/^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/.test(f.value));
      const isSingleNumber = (/^\d+$/.test(f.value));
      const startsWithNumber = (/^\d/.test(f.value));
      const previousFrameworksSelected = frameworksSelected.length > 0 ? frameworksSelected.slice(0,1).shift().name : "";

      if (isSingleNumber) {
        f.value = `${f.value}.%.%`
      }

      return ({
        lhsTarget: "FACT",
        name:  isSemVerValue || isSingleNumber || startsWithNumber  ? previousFrameworksSelected : f.value,
        contains: isSemVerValue || isSingleNumber || startsWithNumber ? f.value : ""
      });
    });
    setFrameworksSelected(nextFactFilter || []);
    setProjectSelected(null);
  };

  const handleLanguageChange = (languages) => {
    let nextFactFilter = languages && languages.map(f => {
      const isSemVerValue = (/^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/.test(f.value));
      const isSingleNumber = (/^\d+$/.test(f.value));
      const startsWithNumber = (/^\d/.test(f.value));
      const previousLanguagesSelected = languagesSelected.length > 0 ? languagesSelected.slice(0,1).shift().name : "";

      if (isSingleNumber) {
        f.value = `${f.value}.%.%`
      }

      return ({
        lhsTarget: "FACT",
        name: isSemVerValue || isSingleNumber || startsWithNumber ? previousLanguagesSelected : f.value,
        contains: isSemVerValue || isSingleNumber || startsWithNumber ? f.value : ""
      });
    });
    setLanguagesSelected(nextFactFilter || []);
    setProjectSelected(null);
  };

  const connectiveOptions = (connective) => {
    return connective && connective.map(c => ({ value: c, label: c }));
  }
  const handleConnectiveChange = (connective) => {
    setConnective(connective.value);
  }

  // Search
  const handleSearch = (searchInput) => {
    let nextFactFilter;

    if (!searchInput) {
      nextFactFilter = [];
    }
    else {
      nextFactFilter = [{
        lhsTarget: "PROJECT",
        name: "name",
        contains: searchInput ? searchInput : "",
      }];

      setConnective('OR');
    }

    setSearchEnterValue(searchInput);
    setSearchInputFilter(nextFactFilter || []);
    setProjectSelected(null);
  }

  useEffect(() => {
    if (!error && !loading && data && data.projectsByFactSearch) {
      setProjects(data.projectsByFactSearch.projects);
      setProjectsCount(data.projectsByFactSearch.count);
    }

    if (categoriesSelected.length || statusesSelected.length || frameworksSelected.length || languagesSelected.length || searchInputFilter.length) {
      setFactFilters(() => [...categoriesSelected, ...statusesSelected, ...frameworksSelected, ...languagesSelected, ...searchInputFilter]);
    }
    else {
      setFactFilters([]);
    }
  }, [data, statusesSelected, frameworksSelected, languagesSelected, searchInputFilter, error, loading]);

  return (
  <Grid.Row>
    <FactSearchTabs activeTab={activeTab} onActiveTabChange={handleActiveTab} />
    {activeTab === 'All projects' && projects &&
      <ResultsSummary results={projects} count={projectsCount} page={activeProjectPage} numResultsPerPage={DEFAULT_PROJECTS_LIMIT} />
    }
    {activeTab === 'Environments' && environments &&
      <ResultsSummary results={environments} count={environmentsCount} page={activeEnvironmentPage} numResultsPerPage={DEFAULT_ENVIRONMENTS_LIMIT} />
    }
    {error &&
      <Grid.Row>
        <Grid.Column>
          <Error {...error}/>
        </Grid.Column>
      </Grid.Row>
    }
    <div className="filters-wrapper">
      <Suspense fallback={<LazyLoadingContent delay={250} rows={DEFAULT_PROJECTS_LIMIT}/>}>
        <div className="select-filters">
          <Grid columns={4} stackable>
            <Grid.Column>
              <MultiCreatableSelectFilter
                title="Frameworks"
                options={frameworksGroup}
                isMulti={true}
                onFilterChange={handleFrameworkChange}
                placeholder={"Framework, e.g. \"Drupal, 10, 9.0.1\""}
              />
            </Grid.Column>
            <Grid.Column>
              <MultiCreatableSelectFilter
                title="Languages"
                options={languagesGroup}
                isMulti={true}
                onFilterChange={handleLanguageChange}
                placeholder={"Programming language, e.g. \"php, 8, 7.4\""}
              />
            </Grid.Column>
            <Grid.Column>
              <MultiCreatableSelectFilter
                title="Production Status"
                loading={!statuses}
                options={statusesGroup}
                isMulti={true}
                onFilterChange={handleStatusChange}
                placeholder={"HTTP status codes, e.g. \"200\""}
              />
            </Grid.Column>
            {/* <Grid.Column>
              <MultiCreatableSelectFilter
                title="Environment Types"
                options={envTypesGroup}
                isMulti={true}
                onFilterChange={handleEnvTypesChange}
                placeholder={"Environment types, e.g. \"PRODUCTION, DEVELOPMENT\""}
              />
            </Grid.Column> */}
            <Grid.Column>
              <MultiSelectFilter
                title="Connective"
                defaultValue={{value: connectiveSelected, label: searchEnterValue ? 'OR' : connectiveSelected}}
                options={connectiveOptions(["AND", "OR"])}
                isDisabled={searchEnterValue && true}
                onFilterChange={handleConnectiveChange}
              />
            </Grid.Column>
          </Grid>
        </div>
      </Suspense>
      </div>
      {activeTab === 'All projects' &&
        <>
          <FactSearchResults results={projects} activeTab={activeTab} handleInputSearch={handleSearch} searchEnter={searchEnterValue} onProjectSelectChange={handleProjectSelectChange} loading={loading} sort={sort}/>
          {projectsCount > 0 &&
            <Grid>
              <Grid.Row stretched>
                <Grid.Column>
                  <Pagination
                    aria-label="Project results pagination navigation"
                    boundaryRange={1}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    nextItem={projects.length < DEFAULT_PROJECTS_LIMIT ? null : {'name': 'nextItem', 'aria-label': 'Next item', content: <Icon name='angle right' />, icon: true } }
                    prevItem={activeProjectPage === 1 ? null : {'aria-label': 'Next item', content: <Icon name='angle left' />, icon: true } }
                    onPageChange={onProjectPaginationChange}
                    siblingRange={1}
                    totalPages={Math.ceil(projectsCount / DEFAULT_PROJECTS_LIMIT)}
                    />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            }
        </>
      }
      {activeTab === 'Environments' &&
        <>
          <FactSearchResults results={environments} activeTab={activeTab} onProjectSelectChange={handleProjectSelectChange} loading={environmentsLoading} sort={sort}/>
          {environmentsCount > 0 &&
            <Grid>
              <Grid.Row stretched>
                <Grid.Column>
                  <Pagination
                    aria-label="Environment results pagination navigation"
                    boundaryRange={1}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    nextItem={environments.length < DEFAULT_ENVIRONMENTS_LIMIT ? null : {'name': 'nextItem', 'aria-label': 'Next item', content: <Icon name='angle right' />, icon: true } }
                    prevItem={activeEnvironmentPage === 1 ? null : {'aria-label': 'Next item', content: <Icon name='angle left' />, icon: true } }
                    onPageChange={onEnvironmentPaginationChange}
                    siblingRange={1}
                    totalPages={Math.ceil(environmentsCount / DEFAULT_ENVIRONMENTS_LIMIT)}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          }
        </>
      }
    <style jsx>{`
    `}</style>
  </Grid.Row>
  )
};

export default memo(FactsSearch);
