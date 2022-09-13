import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { Query } from 'react-apollo';
import MainLayout from 'layouts/MainLayout';

import gql from 'graphql-tag';
// import EnvironmentByOpenshiftProjectNameQuery from 'lib/query/EnvironmentByOpenshiftProjectName';

import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import LeftNavTabs from 'components/LeftNavTabs';
import Metadata from 'components/Metadata';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import { withEnvironmentRequired } from 'lib/withDataRequired';
import { bp } from 'lib/variables';


const metadataQuery = gql`
  query getProject($name: String!) {
    metadata: projectByName(name: $name) {
      id
      metadata
      projectName: name
    }
  }
`;

/**
 * Displays a metadata page, given the openshift project name.
 */
export const PageMetadata = ({ router }) => {
  const project = router.query ? router.query.projectName || router.query.openshiftProjectName : ""
  return (
  <>
    <Head>
      <title>{`${project} | Metadata`}</title>
    </Head>
    <Query
      query={metadataQuery}
      variables={{ name: project }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError
      )(({ data: { metadata } }) => (
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={project} />
          </Breadcrumbs>
          <div className="content-wrapper">
            <LeftNavTabs activeTab="metadata" project={project} />
            <div className="content">
              <Metadata metadata={metadata} />
            </div>
          </div>
          <style jsx>{`
            .content-wrapper {
              @media ${bp.tabletUp} {
                display: flex;
                padding: 0;
              }
            }

            .content {
              padding: 32px calc((100vw / 16) * 1);
              width: 100%;
            }
          `}</style>
        </MainLayout>
      ))}
    </Query>
  </>
)};

export default withRouter(PageMetadata);
