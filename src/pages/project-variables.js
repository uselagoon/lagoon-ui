import React from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import ProjectNavTabs from "components/ProjectNavTabs";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { withProjectRequired } from "lib/withDataRequired";
import { VariableWrapper, ProjectWrapper } from "../styles/pageStyles";
import ProjectVariables from "components/ProjectVariables";
import ProjectByNameWithEnvVarsQuery from "lib/query/ProjectByNameWithEnvVars";

/**
 * Displays a list of all variables for a project.
 */
export const PageProjectVariables = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.projectName} | Project`}</title>
    </Head>
    <Query
      query={ProjectByNameWithEnvVarsQuery}
      variables={{ name: router.query.projectName }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError,
        withProjectRequired
      )(({ data: { project } }) => {
        return (
          <MainLayout>
            <Breadcrumbs>
              <ProjectBreadcrumb projectSlug={project.name} />
            </Breadcrumbs>
            <ProjectWrapper>
              <ProjectNavTabs activeTab="variables" project={project} />
              <VariableWrapper>
                <div className="content">
                  <div className="notification">
                    A deployment is required to apply any changes to Project
                    variables.
                  </div>
                  <ProjectVariables project={project} />
                </div>
              </VariableWrapper>
            </ProjectWrapper>
          </MainLayout>
        );
      })}
    </Query>
  </>
);

export default withRouter(PageProjectVariables);
