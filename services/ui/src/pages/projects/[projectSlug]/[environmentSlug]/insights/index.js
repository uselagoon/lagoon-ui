import React, { Suspense } from "react";
import { withRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import Head from 'next/head';

import MainLayout from 'layouts/MainLayout';
import MainNavigation from 'layouts/MainNavigation';
import Navigation from 'components/Navigation';
import NavTabs from 'components/NavTabs';
import EnvironmentHeader from 'components/EnvironmentHeader';

import Insights from 'components/Insights';
import { Grid, Message } from 'semantic-ui-react';

import EnvironmentWithInsightsQuery from 'lib/query/EnvironmentWithInsights';
import { LoadingRowsContent, LazyLoadingContent } from 'components/Loading';

/**
 * Displays the insights page, given the name of an openshift project.
 */
export const PageInsights = ({ router }) => {
  const { loading, error, data: { environment } = {} } = useQuery(EnvironmentWithInsightsQuery, {
    variables: { openshiftProjectName: router.query.environmentSlug }
  });

  console.log("environment: ", environment);

  return (
  <>
    <Head>
      <title>{`${router.query.environmentSlug} | Insights`}</title>
    </Head>
      <MainLayout>
        <Grid centered padded>
          <Grid.Row>
            <Grid.Column width={2}>
              <MainNavigation>
                <Navigation />
              </MainNavigation>
            </Grid.Column>
             <Grid.Column width={14} style={{ padding: "0 4em" }}>
              {error &&
                <Message negative>
                  <Message.Header>Error: Unable to load insights</Message.Header>
                  <p>{`${error}`}</p>
                </Message>
              }
              {loading && <LoadingRowsContent delay={250} rows="15"/>}
              {!loading && environment &&
              <>
                <EnvironmentHeader environment={environment}/>
                <NavTabs activeTab="insights" environment={environment} />
                <div className="content">
                  {!loading && !environment.insights && !error &&
                    <Message>
                      <Message.Header>No insights found</Message.Header>
                      <p>{`No insights found for '${router.query.environmentSlug}'`}</p>
                    </Message>
                  }
                  <Suspense fallback={<LazyLoadingContent delay={250} rows="15"/>}>
                    {environment.insights && <Insights insights={environment.insights} />}
                  </Suspense>
                </div>
              </>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </MainLayout>
    </>
  );
};

export default withRouter(PageInsights);
