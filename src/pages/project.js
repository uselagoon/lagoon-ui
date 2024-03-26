import React, { useEffect } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import Environments from 'components/Environments';
import EnvironmentsSkeleton from 'components/Environments/EnvironmentsSkeleton';
import ProjectDetailsSidebar from 'components/ProjectDetailsSidebar';
import SidebarSkeleton from 'components/ProjectDetailsSidebar/SidebarSkeleton';
import ProjectNavTabs from 'components/ProjectNavTabs';
import ProjectNavTabsSkeleton from 'components/ProjectNavTabs/ProjectNavTabsSkeleton';
import MainLayout from 'layouts/MainLayout';
import ProjectByNameQuery from 'lib/query/ProjectByName';
import * as R from 'ramda';

import NewEnvironment from '../components/NewEnvironment';
import ProjectNotFound from '../components/errors/ProjectNotFound';
import QueryError from '../components/errors/QueryError';
import ThemedSkeletonWrapper from '../styles/ThemedSkeletonWrapper';
import { ProjectDetailsWrapper, ProjectWrapper } from '../styles/pageStyles';
import { useTourContext } from '../tours/TourContext';

/**
 * Displays a project page, given the project name.
 */
export const PageProject = ({ router }) => {
  const { continueTour } = useTourContext();
  const { data, error, loading, refetch } = useQuery(ProjectByNameQuery, {
    variables: { name: router.query.projectName },
  });

  const handleRefetch = async () => await refetch({ name: router.query.projectName });

  useEffect(() => {
    if (!loading) {
      continueTour();
    }
  }, [loading]);
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
              <ProjectNavTabsSkeleton activeTab="overview" projectName={router.query.projectName} />
              <ProjectDetailsWrapper>
                <div className="project-details-sidebar">
                  <SidebarSkeleton />
                </div>
                <div className="environments-wrapper">
                  <div className="environments-all">
                    <EnvironmentsSkeleton />
                  </div>
                </div>
              </ProjectDetailsWrapper>
            </ThemedSkeletonWrapper>
          </ProjectWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const project = data?.project;

  if (!project) {
    return <ProjectNotFound variables={{ name: router.query.projectName }} />;
  }
  // Sort alphabetically by environmentType and then deployType
  const environments = R.sortWith(
    [R.descend(R.prop('environmentType')), R.ascend(R.prop('deployType')), R.ascend(R.prop('name'))],
    project.environments
  );
  const environmentCount = environments.length;

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
          <ProjectNavTabs activeTab="overview" project={project} />
          <ProjectDetailsWrapper>
            <div className="project-details-sidebar">
              <ProjectDetailsSidebar project={project} />
            </div>
            <div className="environments-wrapper">
              <div className="environments-all">
                <Environments
                  environments={environments}
                  project={project}
                  refresh={handleRefetch}
                  environmentCount={environmentCount}
                />
                {environmentCount === 0 && (
                  <NewEnvironment
                    inputProjectName={project.name}
                    productionEnvironment={project.productionEnvironment}
                    refresh={handleRefetch}
                    environmentCount={environmentCount}
                  />
                )}
              </div>
            </div>
          </ProjectDetailsWrapper>
        </ProjectWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageProject);
