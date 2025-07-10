import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import ProjectNavTabs from 'components/ProjectNavTabs';
import ProjectNavTabsSkeleton from 'components/ProjectNavTabs/ProjectNavTabsSkeleton';
import ProjectVariables from 'components/ProjectVariables';
import ProjectVariablesSkeleton from 'components/ProjectVariables/ProjectVariablesSkeleton';
import MainLayout from 'layouts/MainLayout';
import ProjectByNameWithEnvVarsQuery from 'lib/query/ProjectByNameWithEnvVars';

import ProjectNotFound from '../components/errors/ProjectNotFound';
import QueryError from '../components/errors/QueryError';
import ThemedSkeletonWrapper from '../styles/ThemedSkeletonWrapper';
import { ProjectWrapper, VariableWrapper } from '../styles/pageStyles';

/**
 * Displays a list of all variables for a project.
 */
export const PageProjectVariables = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(ProjectByNameWithEnvVarsQuery, {
    variables: { name: router.query.projectName },
  });

  const handleRefetch = async () => await refetch({ name: router.query.projectName });

  if (error) {
    return <QueryError error={error} />;
  }

  const project = data?.project;

  if (loading) {
    return (
      <>
        <Head>
          <title>{`${router.query.projectName} | Project`}</title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={router.query.projectName} />
          </Breadcrumbs>
          <ProjectWrapper>
            <ThemedSkeletonWrapper>
              <ProjectNavTabsSkeleton activeTab="variables" projectName={router.query.projectName} />
              <VariableWrapper>
                <div className="content">
                  <div className="notification">
                    A deployment is required to apply any changes to Project variables.
                  </div>
                  <ProjectVariablesSkeleton />
                </div>
              </VariableWrapper>
            </ThemedSkeletonWrapper>
          </ProjectWrapper>
        </MainLayout>
      </>
    );
  }

  if (!project) {
    return <ProjectNotFound variables={{ name: router.query.projectName }} />;
  }

  return (
    <>
      <Head>
        <title>{`${router.query.projectName} | Project`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={project.name} />
        </Breadcrumbs>
        <ProjectWrapper>
          <ProjectNavTabs activeTab="variables" project={project} />
          <VariableWrapper>
            <div className="content">
              <div className="notification">A deployment is required to apply any changes to Project variables.</div>
              <ProjectVariables project={project} onVariableAdded={handleRefetch} />
            </div>
          </VariableWrapper>
        </ProjectWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageProjectVariables);
