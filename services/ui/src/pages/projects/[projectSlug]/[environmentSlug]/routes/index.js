import React, { Suspense } from "react";
import * as R from 'ramda';
import { withRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import Head from 'next/head';

import MainLayout from 'layouts/MainLayout';
import MainNavigation from 'layouts/MainNavigation';
import Navigation from 'components/Navigation';
import NavTabs from 'components/NavTabs';
import EnvironmentHeader from 'components/EnvironmentHeader';

import Routes from 'components/Routes';
import EnvironmentByOpenshiftProjectNameQuery from 'lib/query/EnvironmentByOpenshiftProjectName';

import { Grid, Message } from 'semantic-ui-react';
import { LoadingRowsContent, LazyLoadingContent } from 'components/Loading';
import { bp, color } from 'lib/variables';

/**
 * Displays the routes page, given the name of an openshift project.
 */
export const PageRoutes = ({ router }) => {
  const { loading, error, data: { environment } = {} } = useQuery(EnvironmentByOpenshiftProjectNameQuery, {
    variables: { openshiftProjectName: router.query.environmentSlug }
  });

  return (
    <>
    <Head>
      <title>{`${router.query.environmentSlug} | Routes`}</title>
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
                <Message.Header>Error: Unable to load routes</Message.Header>
                <p>{`${error}`}</p>
              </Message>
            }
            {!loading && !environment && !error &&
              <Message>
                <Message.Header>No routes found</Message.Header>
                <p>{`No routes found for '${router.query.environmentSlug}'`}</p>
              </Message>
            }
            {loading && <LoadingRowsContent delay={250} rows="15"/>}
            {!loading && environment &&
            <>
              <EnvironmentHeader environment={environment}/>
              <NavTabs activeTab="routes" environment={environment} />
              <div className="content">
                <Suspense fallback={<LazyLoadingContent delay={250} rows="15"/>}>
                  <Routes environment={environment} />
                </Suspense>
              </div>
            </>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <style jsx>{`
        .content-wrapper {
          @media ${bp.tabletUp} {
            display: flex;
            padding: 0;
          }
        }

        .content {
          padding: 2em;
          width: 100%;
        }

        .notification {
          background-color: ${color.lightBlue};
          color: ${color.white};
          padding: 10px 20px;
        }
      `}</style>
    </MainLayout>
  </>
  );
}

export default withRouter(PageRoutes);
