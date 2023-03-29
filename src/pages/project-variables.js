import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { Query } from 'react-apollo';
import MainLayout from 'layouts/MainLayout';
import ProjectByNameQuery from 'lib/query/ProjectByName';
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import ProjectDetailsSidebar from 'components/ProjectDetailsSidebar';
import LeftNavTabs from 'components/LeftNavTabs';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import { withProjectRequired } from 'lib/withDataRequired';
import { ProjectDetailsWrapper, ProjectWrapper } from "../styles/pageStyles";

/**
 * Displays a project page, given the project name.
 */
export const PageProjectVariables = ({ router }) => (
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
            <LeftNavTabs activeTab="variables" project={router.query.projectName} />
            <ProjectDetailsWrapper>
              <div className="environments-wrapper">
                  <h3>Soon..</h3>
              </div>
            </ProjectDetailsWrapper>
            </ProjectWrapper>
          </MainLayout>
        );
      })}
    </Query>
  </>
);

export default withRouter(PageProjectVariables);
