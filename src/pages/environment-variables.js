import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import Breadcrumbs from 'components/Breadcrumbs';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import ProjectVariables from 'components/ProjectVariables';
import EnvironmentVariables from 'components/EnvironmentVariables';
import EnvironmentVariablesSkeleton from 'components/EnvironmentVariables/EnvironmentVariablesSkeleton';
import NavTabs from 'components/NavTabs';
import NavTabsSkeleton from 'components/NavTabs/NavTabsSkeleton';
import MainLayout from 'layouts/MainLayout';
import EnvironmentByOpenshiftProjectNameWithEnvVarsQuery from 'lib/query/EnvironmentByOpenshiftProjectNameWithEnvVars';
import ProjectByNameWithEnvVarsQuery from 'lib/query/ProjectByNameWithEnvVars';

import EnvironmentNotFound from '../components/errors/EnvironmentNotFound';
import ProjectNotFound from '../components/errors/ProjectNotFound';
import QueryError from '../components/errors/QueryError';
import ThemedSkeletonWrapper from '../styles/ThemedSkeletonWrapper';
import { VariableWrapper } from '../styles/pageStyles';

/**
 * Displays the variables page, given the name of a project.
 */
export const PageEnvironmentVariables = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(EnvironmentByOpenshiftProjectNameWithEnvVarsQuery, {
    variables: { 
        openshiftProjectName: router.query.openshiftProjectName,
    },
  });
  const {
    data: prjData,
    error: prjError,
    loading: prjLoading,
    refetch: prjRefetch
  } = useQuery(ProjectByNameWithEnvVarsQuery, {
    variables: { name: router.query.projectName },
  });

  const handleRefetch = async () => await refetch({ openshiftProjectName: router.query.openshiftProjectName });
  const prjHandleRefetch = async () => await prjRefetch({ name: router.query.projectName });

  if (loading || prjLoading) {
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

  if (error || prjError) {
    return <QueryError error={error || prjError} />;
  }

  const environment = data?.environment;
  const project = prjData?.project;

  if (!environment) {
    return (
      <EnvironmentNotFound
        variables={{
          openshiftProjectName: router.query.openshiftProjectName,
        }}
      />
    );
  }

  if (!project) {
    return <ProjectNotFound variables={{ name: router.query.projectName }} />;
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
            <div className="notification">A deployment is required to apply any changes to Environment or Project variables.</div>
            <EnvironmentVariables environment={environment} onVariableAdded={handleRefetch} />
            <ProjectVariables project={project} onVariableAdded={prjHandleRefetch} />
          </div>
        </VariableWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageEnvironmentVariables);
