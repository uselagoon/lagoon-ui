import React from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import MainLayout from "layouts/MainLayout";
import Breadcrumbs from "components/Breadcrumbs";
import BulkDeploymentBreadcrumb from "components/Breadcrumbs/BulkDeployment";
import BulkDeploymentById from "lib/query/BulkDeploymentById";
import BulkDeployments from "components/BulkDeployments";
import BulkDeploymentsSkeleton from "components/BulkDeployments/BulkDeploymentsSkeleton";
import { CommonWrapper } from "../styles/commonPageStyles";
import QueryError from "../components/errors/QueryError";
import { useQuery } from "@apollo/react-hooks";
import Skeleton from "react-loading-skeleton";
import ThemedSkeletonWrapper from "../styles/ThemedSkeletonWrapper";

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
              
      <ThemedSkeletonWrapper>
        <Breadcrumbs>
          <BulkDeploymentBreadcrumb
            title={
              loading ? (
                <Skeleton />
              ) : (
                data.deploymentsByBulkId[0].bulkName || router.query.bulkId
              )
            }
            bulkIdSlug={
              loading
                ? ""
                : data.deploymentsByBulkId[0].bulkId || router.query.bulkId
            }
          />
        </Breadcrumbs>
        <CommonWrapper>
          <div className="content">
            {loading ? (
              <BulkDeploymentsSkeleton />
            ) : (
              <BulkDeployments deployments={data.deploymentsByBulkId || []} />
            )}
          </div>
        </CommonWrapper>
              
        </ThemedSkeletonWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(BulkDeploymentsPage);
