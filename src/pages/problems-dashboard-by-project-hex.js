import React, { useState } from 'react';

import Head from 'next/head';

import { useQuery } from '@apollo/react-hooks';
import SelectFilter from 'components/Filters';
import getSeverityEnumQuery, { getSourceOptions } from 'components/Filters/helpers';
import Honeycomb from 'components/Honeycomb';
import MainLayout from 'layouts/MainLayout';
import AllProjectsProblemsQuery from 'lib/query/AllProjectsProblems';
import { LoadingPageNoHeader } from 'pages/_loading';
import * as R from 'ramda';

import { ProblemsByDashBoard } from '../styles/pageStyles';

/**
 *  Displays problems page by project.
 *
 */
const ProblemsDashboardByProjectPageHexDisplay = () => {
  const [showCleanProjects, setShowCleanProjects] = useState(true);
  const [source, setSource] = useState([]);
  const [severity, setSeverity] = useState(['CRITICAL']);
  const [envType, setEnvType] = useState('PRODUCTION');

  const { data: severities, loading: severityLoading } = useQuery(getSeverityEnumQuery);
  const { data: sources, loading: sourceLoading } = useQuery(getSourceOptions);

  const { data: projectsProblems, loading: projectsProblemsLoading } = useQuery(AllProjectsProblemsQuery, {
    variables: {
      severity: severity,
      source: source,
      envType: envType,
    },
  });

  const handleEnvTypeChange = (envType) => setEnvType(envType.value);
  const handleShowAllProjectsCheck = () => setShowCleanProjects(!showCleanProjects);

  const handleSourceChange = (source) => {
    let values = (source && source.map((s) => s.value)) || [];
    setSource(values);
  };

  const handleSeverityChange = (severity) => {
    let values = (severity && severity.map((s) => s.value)) || [];
    setSeverity(values);
  };

  const sourceOptions = (sources) => {
    return sources && sources.map((s) => ({ value: s, label: s }));
  };

  const severityOptions = (enums) => {
    return enums && enums.map((s) => ({ value: s.name, label: s.name }));
  };

  return (
    <ProblemsByDashBoard>
      <Head>
        <title>Problems Dashboard By Project</title>
      </Head>
      <MainLayout>
        <div className="filters-wrapper">
          <div className="filters">
            <SelectFilter
              title="Severity"
              loading={severityLoading}
              options={severities && severityOptions(severities.__type.enumValues)}
              defaultValue={{ value: 'CRITICAL', label: 'CRITICAL' }}
              onFilterChange={handleSeverityChange}
              isMulti
            />
            <SelectFilter
              title="Source"
              loading={sourceLoading}
              options={sources && sourceOptions(sources.sources)}
              onFilterChange={handleSourceChange}
              isMulti
            />
            <SelectFilter
              title="Type"
              defaultValue={{ value: 'PRODUCTION', label: 'Production' }}
              options={[
                { value: 'PRODUCTION', label: 'Production' },
                { value: 'DEVELOPMENT', label: 'Development' },
              ]}
              onFilterChange={handleEnvTypeChange}
            />
          </div>
          <div className="extra-filters">
            <label>Show Projects with no problems: </label>
            <input
              name="env-type"
              onClick={handleShowAllProjectsCheck}
              defaultChecked={showCleanProjects}
              type="checkbox"
            />
          </div>
        </div>
        <div className="content-wrapper">
          <div className="overview">
            {projectsProblemsLoading && <LoadingPageNoHeader />}
            {!projectsProblemsLoading && (
              <Honeycomb
                data={!R.isNil(projectsProblems) && projectsProblems}
                filter={{ showCleanProjects: showCleanProjects }}
              />
            )}
          </div>
        </div>
      </MainLayout>
    </ProblemsByDashBoard>
  );
};

export default ProblemsDashboardByProjectPageHexDisplay;
