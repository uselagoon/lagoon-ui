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
import Environments from 'components/Environments';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import { withProjectRequired } from 'lib/withDataRequired';
import { ProjectDetailsWrapper } from "../styles/pageStyles";


const getProductionEnvironments = (environments) => {
  if (!environments) return null;
    return environments.some(e => e.environmentType === 'production') ? environments.filter(e => e.environmentType === 'production') : false;
}

const getDevelopmentEnvironments = (environments) => {
  if (!environments) return null;
    return environments.some(e => e.environmentType === 'development') ? environments.filter(e => e.environmentType === 'development') : false;
}

/**
 * Displays a project page, given the project name.
 */
export const PageProject = ({ router }) => (
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
            <ProjectDetailsWrapper>
              <div className="project-details-sidebar">
                <ProjectDetailsSidebar project={project} />
              </div>
              <div className="environments-wrapper">
                <h3>Environments</h3>
                {!environments.length && <p>No Environments</p>}
                <Environments environments={environments} project={project} />
              </div>
            </ProjectDetailsWrapper>
          </MainLayout>
        );
      })}
    </Query>
  </>
);

export default withRouter(PageProject);
