import React from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import EnvironmentWithFactsQuery from "lib/query/EnvironmentWithFacts";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import EnvironmentBreadcrumb from "components/Breadcrumbs/Environment";
import NavTabs from "components/NavTabs";
import Facts from "components/Facts";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { withEnvironmentRequired } from "lib/withDataRequired";
import { CommonWrapperWNotification } from "../styles/commonPageStyles";

/**
 * Displays the facts page, given the name of an openshift project.
 */
export const PageFacts = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.openshiftProjectName} | Facts`}</title>
    </Head>
    <Query
      query={EnvironmentWithFactsQuery}
      variables={{ openshiftProjectName: router.query.openshiftProjectName }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError,
        withEnvironmentRequired
      )(({ data: { environment } }) => {
        return (
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
        );
      })}
    </Query>
  </>
);

export default withRouter(PageFacts);
