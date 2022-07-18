import React, { Suspense } from "react";
import { withRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import Head from 'next/head';

import MainLayout from 'layouts/MainLayout';
import MainNavigation from 'layouts/MainNavigation';
import Navigation from 'components/Navigation';
import NavTabs from 'components/NavTabs';
import EnvironmentHeader from 'components/EnvironmentHeader';

// import EnvironmentVariables from 'components/EnvironmentVariables';
import { Grid, Message } from 'semantic-ui-react';

import EnvironmentWithEnvVarsQuery from 'lib/query/EnvironmentWithEnvVars';
import { LoadingRowsContent, LazyLoadingContent } from 'components/Loading';

/**
 * Displays the env var page for an environment.
 */
export const PageEnvironmentEnvVars = ({ router }) => {
  const { loading, error, data: { environment } = {} } = useQuery(EnvironmentWithEnvVarsQuery, {
    variables: { openshiftProjectName: router.query.environmentSlug }
  });

  return (
  <>
    <Head>
      <title>{`${router.query.environmentSlug} | EnvironmentVariables`}</title>
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
                  <Message.Header>Error: Unable to load environment variables</Message.Header>
                  <p>{`${error}`}</p>
                </Message>
              }
              {loading && <LoadingRowsContent delay={250} rows="15"/>}
              {!loading && environment &&
              <>
                <EnvironmentHeader environment={environment}/>
                <NavTabs activeTab="env-vars" environment={environment} />
                <div className="content">
                  {!loading && !environment.environmentVariables && !error &&
                    <Message>
                      <Message.Header>No environment variables found</Message.Header>
                      <p>{`No environment variables found for '${router.query.environmentSlug}'`}</p>
                    </Message>
                  }
                  <Suspense fallback={<LazyLoadingContent delay={250} rows="15"/>}>
                    {environment.environmentVariables && <>Test</>
                        // <EnvVars environmentVariables={environment.environmentVariables} />
                    }
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

export default withRouter(PageEnvironmentEnvVars);
