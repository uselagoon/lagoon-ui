import React from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import EnvironmentByOpenshiftProjectNameWithEnvVarsQuery from "lib/query/EnvironmentByOpenshiftProjectNameWithEnvVars";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import EnvironmentBreadcrumb from "components/Breadcrumbs/Environment";
import NavTabs from "components/NavTabs";
import EnvironmentVariables from "components/EnvironmentVariables";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { withEnvironmentRequired } from "lib/withDataRequired";
import { VariableWrapper } from "../styles/pageStyles";

/**
 * Displays the variables page, given the name of a project.
 */
export const PageEnvironmentVariables = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.openshiftProjectName} | Environment Variables`}</title>
    </Head>
    <Query
      query={EnvironmentByOpenshiftProjectNameWithEnvVarsQuery}
      variables={{
        openshiftProjectName: router.query.openshiftProjectName,
      }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError,
        withEnvironmentRequired
      )(({ data: { environment } }) => (
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={environment.project.name} />
            <EnvironmentBreadcrumb
              environmentSlug={environment.openshiftProjectName}
              projectSlug={environment.project.name}
            />
          </Breadcrumbs>
          <VariableWrapper>
            <NavTabs
              activeTab="environmentVariables"
              environment={environment}
            />
            <div className="content">
              <div className="notification">
                A deployment is required to apply any changes to Environment
                variables.
              </div>
              <EnvironmentVariables environment={environment} />
            </div>
          </VariableWrapper>
        </MainLayout>
      ))}
    </Query>
  </>
);

export default withRouter(PageEnvironmentVariables);
