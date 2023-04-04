import React from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import ProjectByNameQuery from "lib/query/ProjectByName";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import ProjectNavTabs from "components/ProjectNavTabs";
import DeployTargets from "components/DeployTargets";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { withProjectRequired } from "lib/withDataRequired";
import { ProjectWrapper } from "../styles/pageStyles";

/**
 * Displays a list of all Deploy Targets for a project.
 */
export const PageDeployTargets = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.projectName} | Project`}</title>
    </Head>
    <Query
      query={ProjectByNameQuery}
      variables={{ name: router.query.projectName }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError,
        withProjectRequired
      )(({ data: { project } }) => {
        // Sort alphabetically by environmentType and then deployType
        const environments = R.sortWith(
          [
            R.descend(R.prop("environmentType")),
            R.ascend(R.prop("deployType")),
          ],
          project.environments
        );

        return (
          <MainLayout>
            <Breadcrumbs>
              <ProjectBreadcrumb projectSlug={project.name} />
            </Breadcrumbs>
            <ProjectWrapper>
              <ProjectNavTabs activeTab="deploy-targets" project={project} />
              <DeployTargets project={project} />
            </ProjectWrapper>
          </MainLayout>
        );
      })}
    </Query>
  </>
);

export default withRouter(PageDeployTargets);
