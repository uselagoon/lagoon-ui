import React from "react";
import * as R from "ramda";
import Head from "next/head";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import Breadcrumbs from "components/Breadcrumbs";
import BulkDeploymentBreadcrumb from "components/Breadcrumbs/BulkDeployment";
import BulkDeploymentById from "lib/query/BulkDeploymentById";
import BulkDeployments from "components/BulkDeployments";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { CommonWrapper } from "../styles/commonPageStyles";

/**
 * Displays the bulk deployments page.
 */
const BulkDeploymentsPage = ({ router }) => (
  <>
    <Head>
      <title>Bulk Deployment - {router.query.bulkId}</title>
    </Head>
    <Query
      query={BulkDeploymentById}
      variables={{ bulkId: router.query.bulkId }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError
      )(({ data }) => (
        <MainLayout>
          <Breadcrumbs>
            <BulkDeploymentBreadcrumb
              bulkIdSlug={
                data.deploymentsByBulkId[0].bulkName || router.query.bulkId
              }
            />
          </Breadcrumbs>
          <CommonWrapper>
            <div className="content">
              <BulkDeployments deployments={data.deploymentsByBulkId || []} />
            </div>
          </CommonWrapper>
        </MainLayout>
      ))}
    </Query>
  </>
);

export default withRouter(BulkDeploymentsPage);
