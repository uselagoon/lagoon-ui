import React, { useState, useEffect, Suspense } from "react";
import { withRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import Head from 'next/head';

import MainLayout from 'layouts/MainLayout';
import MainNavigation from 'layouts/MainNavigation';
import Navigation from 'components/Navigation';
import NavTabs from 'components/NavTabs';
import EnvironmentHeader from 'components/EnvironmentHeader';
import DeployLatest from 'components/DeployLatest';

import { bp } from 'lib/variables';
import { Grid, Message } from 'semantic-ui-react';

const Deployments = React.lazy(() => import('components/Deployments'));

import EnvironmentWithDeploymentsQuery from 'lib/query/EnvironmentWithDeployments';
import DeploymentsSubscription from 'lib/subscription/Deployments';
import { LoadingEnvironmentRows, LazyLoadingContent } from 'components/Loading';

/**
 * Displays the deployments page, given the openshift project name.
 */
export const PageDeployments = ({ router }) => {
  const [environment, setEnvironment] = useState();
  const [resultsLimit, setResultsLimit] = useState({ value: 0, label: "All"});

  const { loading, error, data, subscribeToMore, fetchMore } = useQuery(EnvironmentWithDeploymentsQuery, {
    variables: { 
      openshiftProjectName: router.query.environmentSlug,
      limit: resultsLimit && resultsLimit.label === 'All' ? 0 : resultsLimit.value
    },
    fetchPolicy: 'network-only'
  });

  const resultsLimitOptions = (limits) => {
    return limits && limits.map(l => ({ value: parseInt(l), label: l}));
  };

  const handleResultsLimitChange = (limit) => {
    setResultsLimit(limit);
  };

  useEffect(() => {
    if (!error && !loading && data) {
      setEnvironment(data.environment);
    }

    if (environment) {
      let unsub = subscribeToMore({
          document: DeploymentsSubscription,
          variables: { environment: environment.id },
          updateQuery: (prevStore, { subscriptionData }) => {
            if (!subscriptionData.data) return prevStore;
            const prevDeployments = prevStore.environment.deployments;
            const incomingDeployment = subscriptionData.data.deploymentChanged;
            const existingIndex = prevDeployments.findIndex(
              prevDeployment => prevDeployment.id === incomingDeployment.id
            );
            let newDeployments;

            // New deployment.
            if (existingIndex === -1) {
              newDeployments = [incomingDeployment, ...prevDeployments];
            }
            // Updated deployment
            else {
              newDeployments = Object.assign([...prevDeployments], {
                [existingIndex]: incomingDeployment
              });
            }

            const newStore = {
              ...prevStore,
              environment: {
                ...prevStore.environment,
                deployments: newDeployments
              }
            };

            return newStore;
          },
          onError: err => console.log(err)
      });

      return () => unsub();
    }
  }, [data, loading, error, subscribeToMore]);

  return (
    <>
      <Head>
        <title>{`${router.query.environmentSlug} | Deployments`}</title>
      </Head>
      <MainLayout>
        <Grid centered padded>
          <Grid.Row>
            <Grid.Column width={2}>
              <MainNavigation>
                <Navigation />
              </MainNavigation>
            </Grid.Column>
            <Grid.Column width={14} style={{ padding: "1em 4em" }}>
              {error &&
                <Message negative>
                  <Message.Header>Error: Unable to load deployments</Message.Header>
                  <p>{`${error}`}</p>
                </Message>
              }
              {!loading && !environment && !error &&
                <Message>
                  <Message.Header>No deployments found</Message.Header>
                  <p>{`No deployments found for '${router.query.environmentSlug}'`}</p>
                </Message>
              }
              {loading && <LoadingEnvironmentRows delay={250} rows="15" type={"list"}/>}
              {!loading && environment &&
              <>
                <EnvironmentHeader environment={environment}/>
                <NavTabs activeTab="deployments" environment={environment} />
                <div className="content">
                  <DeployLatest pageEnvironment={environment} fetchMore={() => fetchMore({
                    variables: {
                      environment,
                      after: environment,
                    }
                  })} />
                  <Suspense fallback={<LazyLoadingContent delay={250} rows="15"/>}>
                    <Deployments
                      deployments={environment.deployments}
                      projectSlug={environment.project.name}
                      environmentSlug={environment.openshiftProjectName}
                      resultsLimit={resultsLimit}
                      resultsLimitOptions={resultsLimitOptions}
                      handleResultsLimitChange={handleResultsLimitChange}
                    />
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

export default withRouter(PageDeployments);
