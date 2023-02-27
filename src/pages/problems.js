import React from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import EnvironmentWithProblemsQuery from "lib/query/EnvironmentWithProblems";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import EnvironmentBreadcrumb from "components/Breadcrumbs/Environment";
import NavTabs from "components/NavTabs";
import Problems from "components/Problems";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { withEnvironmentRequired } from "lib/withDataRequired";
import { CommonWrapperWNotification } from "../styles/commonPageStyles";

/**
 * Displays the problems page, given the name of an openshift project.
 */
export const PageProblems = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.openshiftProjectName} | Problems`}</title>
    </Head>
    <Query
      query={EnvironmentWithProblemsQuery}
      variables={{ openshiftProjectName: router.query.openshiftProjectName }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError,
        withEnvironmentRequired
      )(({ data: { environment } }) => {
        const problems =
          environment.problems &&
          environment.problems.map((problem) => {
            return {
              ...problem,
              environment: {
                id: environment.id,
                openshiftProjectName: environment.openshiftProjectName,
                project: environment.project,
              },
            };
          });

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
              <NavTabs activeTab="problems" environment={environment} />
              <div className="content">
                <Problems problems={problems} />
              </div>
            </CommonWrapperWNotification>
          </MainLayout>
        );
      })}
    </Query>
  </>
);

export default withRouter(PageProblems);
