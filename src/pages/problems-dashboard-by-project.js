import React, { useState } from 'react';
import { Query } from 'react-apollo';

import Head from 'next/head';

import { useQuery } from '@apollo/react-hooks';
import Accordion from 'components/Accordion';
import SelectFilter from 'components/Filters';
import getSeverityEnumQuery, { getProjectOptions, getSourceOptions } from 'components/Filters/helpers';
import ProblemsByProject from 'components/ProblemsByProject';
import MainLayout from 'layouts/MainLayout';
import AllProblemsByProjectQuery from 'lib/query/AllProblemsByProject';
import useTranslation from 'lib/useTranslation';
import withQueryErrorNoHeader from 'lib/withQueryErrorNoHeader';
import withQueryLoadingNoHeader from 'lib/withQueryLoadingNoHeader';
import * as R from 'ramda';

import { StyledProblemsDashBoardByProject } from '../styles/pageStyles';

/**
 * Displays the problems overview page by project.
 */
const ProblemsDashboardProductPage = () => {
  const t = useTranslation();
  const [projectSelect, setProjectSelect] = useState([]);
  const [source, setSource] = useState([]);
  const [severity, setSeverity] = useState(['CRITICAL']);
  const [envType, setEnvType] = useState('PRODUCTION');

  const { data: projects, loading: projectsLoading } = useQuery(getProjectOptions);
  const { data: severities, loading: severityLoading } = useQuery(getSeverityEnumQuery);
  const { data: sources, loading: sourceLoading } = useQuery(getSourceOptions);

  const handleProjectChange = project => {
    let values = (project && project.map(p => p.value)) || [];
    setProjectSelect(values);
  };

  const handleEnvTypeChange = envType => {
    setEnvType(envType.value);
  };

  const handleSourceChange = source => {
    let values = (source && source.map(s => s.value)) || [];
    setSource(values);
  };

  const handleSeverityChange = severity => {
    let values = (severity && severity.map(s => s.value)) || [];
    setSeverity(values);
  };

  const projectOptions = projects => {
    return projects && projects.map(p => ({ value: p.name, label: p.name }));
  };

  const sourceOptions = sources => {
    return sources && sources.map(s => ({ value: s, label: s }));
  };

  const severityOptions = enums => {
    return enums && enums.map(s => ({ value: s.name, label: s.name }));
  };

  return (
    <StyledProblemsDashBoardByProject>
      <Head>
        <title>Problems Dashboard By Project</title>
      </Head>
      <MainLayout>
        <div className="filters-wrapper">
          <div className="filters">
            <SelectFilter
              title={t('problemsByProject.filters.project')}
              loading={projectsLoading}
              options={projects && projectOptions(projects.allProjects)}
              onFilterChange={handleProjectChange}
              isMulti
            />
            <SelectFilter
              title={t('problemsByProject.filters.severity')}
              loading={severityLoading}
              options={severities && severityOptions(severities.__type.enumValues)}
              defaultValue={{ value: 'CRITICAL', label: 'CRITICAL' }}
              onFilterChange={handleSeverityChange}
              isMulti
            />
          </div>
          <div className="filters">
            <SelectFilter
              title={t('problemsByProject.filters.source')}
              loading={sourceLoading}
              options={sources && sourceOptions(sources.sources)}
              onFilterChange={handleSourceChange}
              isMulti
            />
            <SelectFilter
              title={t('problemsByProject.filters.envType')}
              defaultValue={{ value: 'PRODUCTION', label: 'Production' }}
              options={[
                { value: 'PRODUCTION', label: 'Production' },
                { value: 'DEVELOPMENT', label: 'Development' },
              ]}
              onFilterChange={handleEnvTypeChange}
            />
          </div>
        </div>
        <div className="content-wrapper">
          {projects && (
            <div className="results">
              <div className="content">
                <label>
                  {t('general.projects')}: {projects.allProjects.length}
                </label>
              </div>
            </div>
          )}
          <div className="projects">
            {projects &&
              projects.allProjects.map((project, idx) => {
                const filterProjectSelect =
                  projectSelect
                    .filter(s => {
                      return s.includes(project.name);
                    })
                    .toString() || '';

                return (
                  <Query
                    key={`project-${idx}`}
                    query={AllProblemsByProjectQuery}
                    variables={{
                      name: projectSelect.length ? filterProjectSelect : project.name,
                      source: source,
                      severity: severity,
                      envType: envType,
                    }}
                    displayName="AllProblemsByProjectQuery"
                  >
                    {R.compose(
                      withQueryLoadingNoHeader,
                      withQueryErrorNoHeader
                    )(({ data: { project } }) => {
                      const { environments, id, name } = project || [];
                      const filterProblems =
                        environments &&
                        environments
                          .filter(e => e instanceof Object)
                          .map(e => {
                            return e.problems;
                          });

                      const problemsPerProject = Array.prototype.concat.apply([], filterProblems);
                      const critical = problemsPerProject.filter(p => p.severity === 'CRITICAL').length;
                      const high = problemsPerProject.filter(p => p.severity === 'HIGH').length;
                      const medium = problemsPerProject.filter(p => p.severity === 'MEDIUM').length;
                      const low = problemsPerProject.filter(p => p.severity === 'LOW').length;

                      const columns = {
                        name,
                        problemCount: problemsPerProject.length,
                      };

                      return (
                        <>
                          {environments && (
                            <div key={name + id} className="content">
                              <div className="project-overview">
                                <Accordion
                                  columns={columns}
                                  defaultValue={false}
                                  className="data-row row-heading"
                                  minified={true}
                                >
                                  {!environments.length && <div className="data-none">No Environments</div>}
                                  <div className="overview">
                                    <ul className="overview-list">
                                      <li className="result">
                                        <label>Results: </label>
                                        {Object.keys(problemsPerProject).length} Problems
                                      </li>
                                      <li className="result">
                                        <label>Critical: </label>
                                        {critical}
                                      </li>
                                      <li className="result">
                                        <label>High: </label>
                                        {high}
                                      </li>
                                      <li className="result">
                                        <label>Medium: </label>
                                        {medium}
                                      </li>
                                      <li className="result">
                                        <label>Low: </label>
                                        {low}
                                      </li>
                                    </ul>
                                  </div>
                                  {environments.map((environment, idx) => (
                                    <div key={`environment-${idx}`} className="environment-wrapper">
                                      <label className="environment">
                                        <h5>Environment: {environment.name}</h5>
                                      </label>
                                      <ProblemsByProject
                                        key={environment.id}
                                        problems={environment.problems || []}
                                        minified={true}
                                      />
                                    </div>
                                  ))}
                                </Accordion>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </Query>
                );
              })}
          </div>
        </div>
      </MainLayout>
    </StyledProblemsDashBoardByProject>
  );
};

export default ProblemsDashboardProductPage;
