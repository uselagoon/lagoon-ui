import React, { useEffect, useRef } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import DeploymentBreadcrumb from 'components/Breadcrumbs/Deployment';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import Deployment from 'components/Deployment';
import DeploymentSkeleton from 'components/Deployment/DeploymentSkeleton';
import NavTabs from 'components/NavTabs';
import NavTabsSkeleton from 'components/NavTabs/NavTabsSkeleton';
import DeploymentNotFound from 'components/errors/DeploymentNotFound';
import EnvironmentNotFound from 'components/errors/EnvironmentNotFound';
import MainLayout from 'layouts/MainLayout';
import EnvironmentWithDeploymentQuery from 'lib/query/EnvironmentWithDeployment';

import QueryError from '../components/errors/QueryError';
import { DeploymentWrapper } from '../styles/pageStyles';
import { useTourContext } from '../tours/TourContext';

/**
 * Displays a deployment page, given the openshift project and deployment name.
 */
export const PageDeployment = ({ router }) => {
  const logsContent = useRef(null);
  const logsTopRef = useRef(null);
  const logsEndRef = useRef(null);

  const { continueTour } = useTourContext();
  const { data, error, loading } = useQuery(EnvironmentWithDeploymentQuery, {
    variables: {
      openshiftProjectName: router.query.openshiftProjectName,
      deploymentName: router.query.deploymentName,
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
    const deploymentName = router.query.deploymentName;
    return (
      <>
        <Head>
          <title>{`${router.query.deploymentName} | Deployment`}</title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={projectSlug} />
            <EnvironmentBreadcrumb environmentSlug={openshiftProjectName} projectSlug={projectSlug} />
            <DeploymentBreadcrumb
              deploymentSlug={deploymentName}
              environmentSlug={openshiftProjectName}
              projectSlug={projectSlug}
            />
          </Breadcrumbs>
          <DeploymentWrapper>
            <NavTabsSkeleton
              activeTab="deployments"
              projectName={projectSlug}
              openshiftProjectName={openshiftProjectName}
            />

            <div className="content">
              <DeploymentSkeleton />
            </div>
          </DeploymentWrapper>
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

  if (!environment?.deployments.length) {
    return (
      <DeploymentNotFound
        variables={{
          deployName: router.query.deploymentName,
        }}
      />
    );
  }

  const deployment = environment && environment.deployments[0];

  return (
    <>
      <Head>
        <title>{`${router.query.deploymentName} | Deployment`}</title>
      </Head>

      <MainLayout>
        <div ref={logsTopRef} />
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={environment.project.name} />
          <EnvironmentBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
          <DeploymentBreadcrumb
            deploymentSlug={deployment.name}
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
        </Breadcrumbs>

        <DeploymentWrapper>
          <NavTabs activeTab="deployments" environment={environment} />
          <div ref={logsContent} className="content">
            <Deployment deployment={deployment} />
          </div>
        </DeploymentWrapper>
        <div ref={logsEndRef} />
      </MainLayout>
    </>
  );
};

export default withRouter(PageDeployment);
