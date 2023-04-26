import React from 'react';
import Skeleton from 'react-loading-skeleton';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import BulkDeploymentBreadcrumb from 'components/Breadcrumbs/BulkDeployment';
import BulkDeployments from 'components/BulkDeployments';
import BulkDeploymentsSkeleton from 'components/BulkDeployments/BulkDeploymentsSkeleton';
import MainLayout from 'layouts/MainLayout';
import BulkDeploymentById from 'lib/query/BulkDeploymentById';

import QueryError from '../components/errors/QueryError';
import { CommonWrapper } from '../styles/commonPageStyles';

/**
 * Displays the bulk deployments page.
 */
const BulkDeploymentsPage = ({ router }) => {
  const { data, loading, error } = useQuery(BulkDeploymentById, {
    variables: { bulkId: router.query.bulkId },
  });

  if (error) {
    return <QueryError error={error} />;
  }

  return (
    <>
      <Head>
        <title>Bulk Deployment - {router.query.bulkId}</title>
      </Head>

      <MainLayout>
        <Breadcrumbs>
          <BulkDeploymentBreadcrumb
            title={loading ? <Skeleton /> : data.deploymentsByBulkId[0].bulkName || router.query.bulkId}
            bulkIdSlug={loading ? '' : data.deploymentsByBulkId[0].bulkId || router.query.bulkId}
          />
        </Breadcrumbs>
        <CommonWrapper>
          <div className="content">
            {loading ? <BulkDeploymentsSkeleton /> : <BulkDeployments deployments={data.deploymentsByBulkId || []} />}
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(BulkDeploymentsPage);
