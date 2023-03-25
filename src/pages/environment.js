import React from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import EnvironmentByOpenshiftProjectNameQuery from "lib/query/EnvironmentByOpenshiftProjectName";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import EnvironmentBreadcrumb from "components/Breadcrumbs/Environment";
import NavTabs from "components/NavTabs";
import Environment from "components/Environment";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { withEnvironmentRequired } from "lib/withDataRequired";
import { EnvironmentWrapper } from "../styles/pageStyles";

/**
 * Displays an environment page, given the openshift project name.
 */
export const PageEnvironment = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.openshiftProjectName} | Environment`}</title>
    </Head>
    <Query
      query={EnvironmentByOpenshiftProjectNameQuery}
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
          <EnvironmentWrapper>
            <NavTabs activeTab="overview" environment={environment} />
            <div className="content">
              <Environment environment={environment} />
            </div>
          </EnvironmentWrapper>
        </MainLayout>
      ))}
    </Query>
  </>
);

export default withRouter(PageEnvironment);
