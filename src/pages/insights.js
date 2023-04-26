import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import Insights from 'components/Insights';
import InsightsSkeleton from 'components/Insights/InsightsSkeleton';
import NavTabs from 'components/NavTabs';
import NavTabsSkeleton from 'components/NavTabs/NavTabsSkeleton';
import MainLayout from 'layouts/MainLayout';
import EnvironmentWithInsightsQuery from 'lib/query/EnvironmentWithInsights';

import EnvironmentNotFound from '../components/errors/EnvironmentNotFound';
import QueryError from '../components/errors/QueryError';
import ThemedSkeletonWrapper from '../styles/ThemedSkeletonWrapper';
import { CommonWrapperWNotification } from '../styles/commonPageStyles';

/**
 * Displays the insights page, given the name of an openshift project.
 */
export const PageInsights = ({ router }) => {
  const { data, error, loading } = useQuery(EnvironmentWithInsightsQuery, {
    variables: { openshiftProjectName: router.query.openshiftProjectName },
  });

  if (loading) {
    const projectSlug = router.asPath.match(/projects\/([^/]+)/)?.[1];
    const openshiftProjectName = router.query.openshiftProjectName;
    return (
      <>
        <Head>
          <title>{`${router.query.openshiftProjectName} | Insights`}</title>
        </Head>
        <MainLayout>
          <ThemedSkeletonWrapper>
            <Breadcrumbs>
              <ProjectBreadcrumb projectSlug={projectSlug} />
              <EnvironmentBreadcrumb environmentSlug={openshiftProjectName} projectSlug={projectSlug} />
            </Breadcrumbs>

            <CommonWrapperWNotification>
              <NavTabsSkeleton
                activeTab="insights"
                projectName={projectSlug}
                openshiftProjectName={openshiftProjectName}
              />
              <div className="content">
                <InsightsSkeleton />
              </div>
            </CommonWrapperWNotification>
          </ThemedSkeletonWrapper>
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
        <title>{`${router.query.openshiftProjectName} | Insights`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={environment.project.name} />
          <EnvironmentBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
        </Breadcrumbs>

        <CommonWrapperWNotification>
          <NavTabs activeTab="insights" environment={environment} />
          <div className="content">
            {environment && (
              <div className="content">
                {!environment.insights && <p>{`No insights found for '${router.query.environmentSlug}'`}</p>}
                {environment.insights && <Insights insights={environment.insights} />}
              </div>
            )}
          </div>
        </CommonWrapperWNotification>
      </MainLayout>
    </>
  );
};

export default withRouter(PageInsights);
