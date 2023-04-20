import React from 'react';
import { Query } from 'react-apollo';

import Head from 'next/head';
import { withRouter } from 'next/router';

import Breadcrumbs from 'components/Breadcrumbs';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import NavTabs from 'components/NavTabs';
import Problems from 'components/Problems';
import MainLayout from 'layouts/MainLayout';
import EnvironmentWithProblemsQuery from 'lib/query/EnvironmentWithProblems';
import { withEnvironmentRequired } from 'lib/withDataRequired';
import withQueryError from 'lib/withQueryError';
import withQueryLoading from 'lib/withQueryLoading';
import * as R from 'ramda';

import { CommonWrapperWNotification } from '../styles/commonPageStyles';

/**
 * Displays the problems page, given the name of an openshift project.
 */
export const PageProblems = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.openshiftProjectName} | Problems`}</title>
    </Head>
    <Query query={EnvironmentWithProblemsQuery} variables={{ openshiftProjectName: router.query.openshiftProjectName }}>
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
