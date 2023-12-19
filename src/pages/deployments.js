import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import getConfig from 'next/config';
import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import DeployLatest from 'components/DeployLatest';
import Deployments from 'components/Deployments';
import DeploymentsSkeleton from 'components/Deployments/DeploymentsSkeleton';
import NavTabs from 'components/NavTabs';
import NavTabsSkeleton from 'components/NavTabs/NavTabsSkeleton';
import ResultsLimited from 'components/ResultsLimited';
import MainLayout from 'layouts/MainLayout';
import EnvironmentWithDeploymentsQuery from 'lib/query/EnvironmentWithDeployments';
import EnvironmentNotFound from '../components/errors/EnvironmentNotFound';
import QueryError from '../components/errors/QueryError';
import { DeploymentsWrapper } from '../styles/pageStyles';
import { useTourContext } from '../tours/TourContext';

const { publicRuntimeConfig } = getConfig();
const envLimit = parseInt(publicRuntimeConfig.LAGOON_UI_DEPLOYMENTS_LIMIT, 10);
const customMessage = publicRuntimeConfig.LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE;

/**
 * Displays the deployments page, given the openshift project name.
 */
export const PageDeployments = ({ router }) => {
  const { continueTour } = useTourContext();

  const [resultLimit, setResultLimit] = useState(null);

  const { data, error, loading, refetch } = useQuery(EnvironmentWithDeploymentsQuery, {
    variables: {
      openshiftProjectName: router.query.openshiftProjectName,
      limit: resultLimit,
    },
  });

  const handleRefetch = async () =>
    await refetch({ openshiftProjectName: router.query.openshiftProjectName, limit: resultLimit });

  useEffect(() => {
    let urlResultLimit = envLimit;
    if (typeof window !== 'undefined') {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let limit = params.get('limit');
      if (limit) {
        if (parseInt(limit.trim(), 10)) {
          urlResultLimit = parseInt(limit.trim(), 10);
        }
      }
    }
    setResultLimit(urlResultLimit === -1 ? null : urlResultLimit);
  }, []);

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
          <title>{`${router.query.openshiftProjectName} | Backups`}</title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={projectSlug} />
            <EnvironmentBreadcrumb environmentSlug={openshiftProjectName} projectSlug={projectSlug} />
          </Breadcrumbs>

          <DeploymentsWrapper>
            <NavTabsSkeleton
              activeTab="deployments"
              projectName={projectSlug}
              openshiftProjectName={openshiftProjectName}
            />
            <div className="content">
              <Skeleton height={70} />

              <DeploymentsSkeleton />
              <ResultsLimited
                limit={resultLimit}
                message={(!customMessage && '') || (customMessage && customMessage.replace(/['"]+/g, ''))}
              />
            </div>
          </DeploymentsWrapper>
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
        <title>{`${router.query.openshiftProjectName} | Deployments`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={environment.project.name} />
          <EnvironmentBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
        </Breadcrumbs>
        <DeploymentsWrapper>
          <NavTabs activeTab="deployments" environment={environment} />
          <div className="content">
            <DeployLatest pageEnvironment={environment} onDeploy={handleRefetch} />
            <Deployments
              deployments={environment.deployments}
              environmentSlug={environment.openshiftProjectName}
              projectSlug={environment.project.name}
            />
            <ResultsLimited
              limit={resultLimit}
              changeLimit={setResultLimit}
              results={environment.deployments.length}
              message={(!customMessage && '') || (customMessage && customMessage.replace(/['"]+/g, ''))}
            />
          </div>
        </DeploymentsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageDeployments);
