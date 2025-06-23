import React, { useEffect } from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import DeploymentsByFilterSkeleton from 'components/DeploymentsByFilter/DeploymentsByFilterSkeleton';
import MainLayout from 'layouts/MainLayout';
import deploymentsByFilter from 'lib/query/DeploymentsByFilter';

import DeploymentsByFilter from '../components/DeploymentsByFilter';
import QueryError from '../components/errors/QueryError';
import { CommonWrapperMargin } from '../styles/commonPageStyles';
import { useTourContext } from '../tours/TourContext';

/**
 * Displays the projects page.
 */
const AllDeployments = () => {
  const { continueTour } = useTourContext();

  const { data, error, loading } = useQuery(deploymentsByFilter, {
    displayName: 'deploymentsByFilter',
  });

  useEffect(() => {
    // tour only continues on this page if there's at least one deployment
    if (!loading && data.deploymentsByFilter.length) {
      continueTour();
    }
  }, [loading]);

  if (error) {
    return <QueryError error={error} />;
  }
  return (
    <>
      <Head>
        <title>All deployments</title>
      </Head>

      <MainLayout>
        <CommonWrapperMargin>
          <h2>Deployments</h2>
          <div className="content">
            {loading ? (
              <DeploymentsByFilterSkeleton />
            ) : (
              <DeploymentsByFilter deployments={data.deploymentsByFilter || []} />
            )}
          </div>
        </CommonWrapperMargin>
      </MainLayout>
    </>
  );
};

export default withRouter(AllDeployments);
