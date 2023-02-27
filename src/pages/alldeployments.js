import React from "react";
import * as R from "ramda";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import deploymentsByFilter from "lib/query/DeploymentsByFilter";
import Projects from "components/Projects";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { withRouter } from "next/router";
import DeploymentsByFilter from "../components/DeploymentsByFilter";
import { CommonWrapperMargin } from "../styles/commonPageStyles";

/**
 * Displays the projects page.
 */
const AllDeployments = () => (
  <>
    <Head>
      <title>All deployments</title>
    </Head>
    <Query query={deploymentsByFilter} displayName="deploymentsByFilter">
      {R.compose(withQueryLoading)(({ data }) => (
        <MainLayout>
          <CommonWrapperMargin>
            <h2>Deployments</h2>
            <div className="content">
              <DeploymentsByFilter
                deployments={data.deploymentsByFilter || []}
              />
            </div>
          </CommonWrapperMargin>
        </MainLayout>
      ))}
    </Query>
  </>
);

export default withRouter(AllDeployments);
