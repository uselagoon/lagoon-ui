import React, { useEffect } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import Breadcrumbs from 'components/Breadcrumbs';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import Environment from 'components/Environment';
import EnvironmentSkeleton from 'components/Environment/EnvironmentSkeleton';
import NavTabs from 'components/NavTabs';
import NavTabsSkeleton from 'components/NavTabs/NavTabsSkeleton';
import MainLayout from 'layouts/MainLayout';
import EnvironmentByOpenshiftProjectNameQuery from 'lib/query/EnvironmentByOpenshiftProjectName';

import EnvironmentNotFound from '../components/errors/EnvironmentNotFound';
import QueryError from '../components/errors/QueryError';
import { EnvironmentWrapper } from '../styles/pageStyles';
import { useTourContext } from '../tours/TourContext';

/**
 * Displays an environment page, given the openshift project name.
 */
export const PageEnvironment = ({ router }) => {
  const { continueTour } = useTourContext();
  const { data, error, loading } = useQuery(EnvironmentByOpenshiftProjectNameQuery, {
    variables: {
      openshiftProjectName: router.query.openshiftProjectName,
    },
  });

  useEffect(() => {
    if (!loading && data?.environment) {
      continueTour();
    }
  }, [loading]);

  if (loading) {
    const projectSlug = router.asPath.match(/projects\/([^/]+)/)?.[1];
    const openshiftProjectName = router.query.openshiftProjectName;
    return (
      <>
        <Head>
          <title>{`${openshiftProjectName} | Environment`}</title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={projectSlug} />
            <EnvironmentBreadcrumb environmentSlug={openshiftProjectName} projectSlug={projectSlug} />
          </Breadcrumbs>

          <EnvironmentWrapper>
            <NavTabsSkeleton
              activeTab="overview"
              projectName={projectSlug}
              openshiftProjectName={openshiftProjectName}
            />
            <div className="content">
              <EnvironmentSkeleton />
            </div>
          </EnvironmentWrapper>
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
        <title>{`${router.query.openshiftProjectName} | Environment`}</title>
      </Head>

      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={environment.project.name} />
          <EnvironmentBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
        </Breadcrumbs>
        <EnvironmentWrapper>
          <NavTabs activeTab="overview" environment={environment} />
          <div className="content">
            <Environment environment={environment} />
          </div>
        </EnvironmentWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageEnvironment);
