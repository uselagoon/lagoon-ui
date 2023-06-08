import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import Facts from 'components/Facts';
import FactsSkeleton from 'components/Facts/FactsSkeleton';
import NavTabs from 'components/NavTabs';
import NavTabsSkeleton from 'components/NavTabs/NavTabsSkeleton';
import MainLayout from 'layouts/MainLayout';
import EnvironmentWithFactsQuery from 'lib/query/EnvironmentWithFacts';

import EnvironmentNotFound from '../components/errors/EnvironmentNotFound';
import QueryError from '../components/errors/QueryError';
import { CommonWrapperWNotification } from '../styles/commonPageStyles';

/**
 * Displays the facts page, given the name of an openshift project.
 */
export const PageFacts = ({ router }) => {
  const { data, error, loading } = useQuery(EnvironmentWithFactsQuery, {
    variables: { openshiftProjectName: router.query.openshiftProjectName },
  });

  if (loading) {
    const projectSlug = router.asPath.match(/projects\/([^/]+)/)?.[1];
    const openshiftProjectName = router.query.openshiftProjectName;
    return (
      <>
        <Head>
          <title>{`${router.query.openshiftProjectName} | Facts`}</title>
        </Head>
        <MainLayout>
            <Breadcrumbs>
              <ProjectBreadcrumb projectSlug={projectSlug} />
              <EnvironmentBreadcrumb environmentSlug={openshiftProjectName} projectSlug={projectSlug} />
            </Breadcrumbs>

            <CommonWrapperWNotification>
              <NavTabsSkeleton
                activeTab="facts"
                projectName={projectSlug}
                openshiftProjectName={openshiftProjectName}
              />
              <div className="content">
                <FactsSkeleton />
              </div>
            </CommonWrapperWNotification>
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
        <title>{`${router.query.openshiftProjectName} | Facts`}</title>
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
          <NavTabs activeTab="facts" environment={environment} />
          <div className="content">
            <Facts facts={environment.facts} />
          </div>
        </CommonWrapperWNotification>
      </MainLayout>
    </>
  );
};

export default withRouter(PageFacts);
