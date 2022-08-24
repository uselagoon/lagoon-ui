import React, { Suspense } from "react";
import * as R from 'ramda';
import { withRouter } from 'next/router';
// import { useQuery } from "@apollo/client";
import Head from 'next/head';
import { Query } from 'react-apollo';

import MainLayout from 'layouts/MainLayout';
import NavTabs from 'components/NavTabs';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import { withEnvironmentRequired } from 'lib/withDataRequired';

import Breadcrumbs from 'components/Breadcrumbs';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';

import Insights from 'components/Insights';

import { bp, color } from 'lib/variables';

// import MainNavigation from 'layouts/MainNavigation';
// import Navigation from 'components/Navigation';
// import EnvironmentHeader from 'components/EnvironmentHeader';

// import { Grid, Message } from 'semantic-ui-react';

import EnvironmentWithInsightsQuery from 'lib/query/EnvironmentWithInsights';
// import { LoadingRowsContent, LazyLoadingContent } from 'components/Loading';

/**
 * Displays the insights page, given the name of an openshift project.
 */
export const PageInsights = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.openshiftProjectName} | Insights`}</title>
    </Head>
		<Query
			query={EnvironmentWithInsightsQuery}
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
						  <div className="content-wrapper">
								<NavTabs activeTab="insights" environment={environment} />
								<div className="content">
									{environment &&
										<div className="content">
											{!environment.insights &&
													<p>{`No insights found for '${router.query.environmentSlug}'`}</p>
											}
											{environment.insights && <Insights insights={environment.insights} />}
										</div>
									}
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
                padding: 32px calc((100vw / 32) * 1);
                width: 100%;
              }

              .notification {
                background-color: ${color.lightBlue};
                color: ${color.white};
                padding: 10px 20px;
              }
            `}</style>
					</MainLayout>
        )
      })}
    </Query>
  </>
);


export default withRouter(PageInsights);