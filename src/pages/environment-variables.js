import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import EnvironmentVariables from 'components/EnvironmentVariables';
import EnvironmentVariablesSkeleton from 'components/EnvironmentVariables/EnvironmentVariablesSkeleton';
import NavTabs from 'components/NavTabs';
import NavTabsSkeleton from 'components/NavTabs/NavTabsSkeleton';
import MainLayout from 'layouts/MainLayout';
import EnvironmentByOpenshiftProjectNameWithEnvVarsQuery from 'lib/query/EnvironmentByOpenshiftProjectNameWithEnvVars';

import EnvironmentNotFound from '../components/errors/EnvironmentNotFound';
import QueryError from '../components/errors/QueryError';
import ThemedSkeletonWrapper from '../styles/ThemedSkeletonWrapper';
import { VariableWrapper } from '../styles/pageStyles';

/**
 * Displays the variables page, given the name of a project.
 */
export const PageEnvironmentVariables = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(EnvironmentByOpenshiftProjectNameWithEnvVarsQuery, {
    variables: { openshiftProjectName: router.query.openshiftProjectName },
  });

  const handleRefetch = async () => await refetch({ openshiftProjectName: router.query.openshiftProjectName });

  if (loading) {
    const projectSlug = router.asPath.match(/projects\/([^/]+)/)?.[1];
    const openshiftProjectName = router.query.openshiftProjectName;
    return (
      <>
        <Head>
          <title>{`${openshiftProjectName} | Environment Variables`}</title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={projectSlug} />
            <EnvironmentBreadcrumb environmentSlug={openshiftProjectName} projectSlug={projectSlug} />
          </Breadcrumbs>
          <VariableWrapper>
            <ThemedSkeletonWrapper>
              <NavTabsSkeleton activeTab="variables" projectName={router.query.projectName} />
              <div className="content">
                <div className="notification">
                  A deployment is required to apply any changes to Environment variables.
                </div>
                <EnvironmentVariablesSkeleton />
              </div>
            </ThemedSkeletonWrapper>
          </VariableWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const environment = data?.environment;

  if (!environment) {
    return (
      <EnvironmentNotFound
        variables={{
          openshiftProjectName: router.query.openshiftProjectName,
        }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>{`${router.query.openshiftProjectName} | Environment Variables`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={environment.project.name} />
          <EnvironmentBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
        </Breadcrumbs>
        <VariableWrapper>
          <NavTabs activeTab="environmentVariables" environment={environment} />
          <div className="content">
            <div className="notification">A deployment is required to apply any changes to Environment variables.</div>
            <EnvironmentVariables environment={environment} onVariableAdded={handleRefetch} />
          </div>
        </VariableWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageEnvironmentVariables);
