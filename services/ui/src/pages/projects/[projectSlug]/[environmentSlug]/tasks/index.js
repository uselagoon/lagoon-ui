import React, { useState, useEffect, Suspense } from "react";
import { withRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import Head from 'next/head';
import getConfig from 'next/config';

import MainLayout from 'layouts/MainLayout';
import MainNavigation from 'layouts/MainNavigation';
import Navigation from 'components/Navigation';
import NavTabs from 'components/NavTabs';
import EnvironmentHeader from 'components/EnvironmentHeader';
import { DEFAULT_TASKS_LIMIT } from 'lib/util';

import AddTask from 'components/AddTask';
const Tasks = React.lazy(() => import('components/Tasks'));

import { Grid, Message } from 'semantic-ui-react';

import EnvironmentWithTasksQuery from 'lib/query/EnvironmentWithTasks';
import TasksSubscription from 'lib/subscription/Tasks';
import { LoadingEnvironmentRows, LazyLoadingContent } from 'components/Loading';


const { publicRuntimeConfig } = getConfig();
const envLimit = publicRuntimeConfig.LAGOON_UI_TASKS_LIMIT || DEFAULT_TASKS_LIMIT;
const customMessage = publicRuntimeConfig.LAGOON_UI_TASKS_LIMIT_MESSAGE;
const tasksLimit = envLimit === -1 ? null : envLimit;

/**
 * Displays the tasks page, given the openshift project name.
 */
export const PageTasks = ({ router }) => {
  const [environment, setEnvironment] = useState(); 
  const [resultsLimit, setResultsLimit] = useState({ value: parseInt(envLimit, 10), label: envLimit });
  const [visibleMessage, setVisibleMessage] = useState(true);

  const { loading, error, data, subscribeToMore, fetchMore } = useQuery(EnvironmentWithTasksQuery, {
    variables: { 
      openshiftProjectName: router.query.environmentSlug,
      ...(resultsLimit && resultsLimit.label !== 'All' && { limit: resultsLimit.value })
    },
    fetchPolicy: 'network-only'
  });

  const resultsLimitOptions = (limits) => {
    return limits && limits.map(l => ({ value: isNaN(l) ? 0 : parseInt(l), label: l }));
  };

  const handleResultsLimitChange = (limit) => {
    setResultsLimit(limit);
  };

  const handleDismiss = () => {
    setVisibleMessage(false);
  }

  useEffect(() => {
    if (!error && !loading && data) {
      setEnvironment(data.environment);
    }

    if (environment) {
      let unsubscribe = subscribeToMore({
        document: TasksSubscription,
        variables: { environment: environment && environment.id },
        updateQuery: (prevStore, { subscriptionData }) => {
          if (!subscriptionData.data) return prevStore;

          const prevTasks = prevStore.environment.tasks;
          const incomingTask = subscriptionData.data.taskChanged;
          const existingIndex = prevTasks.findIndex(
            prevTask => prevTask.id === incomingTask.id
          );
          let newTasks;

          // New task.
          if (existingIndex === -1) {
            newTasks = [incomingTask, ...prevTasks];
          }
          // Updated task
          else {
            newTasks = Object.assign([...prevTasks], {
              [existingIndex]: incomingTask
            });
          }

          const newStore = {
            ...prevStore,
            environment: {
              ...prevStore.environment,
              tasks: newTasks
            }
          };

          return newStore;
        }
      });

      return () => environment && unsubscribe();
    }
  }, [data, loading, error, subscribeToMore]);
          
  return (
  <>
    <Head>
      <title>{`${router.query.environmentSlug} | Tasks`}</title>
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
                <Message.Header>Error: Unable to load tasks</Message.Header>
                <p>{`${error}`}</p>
              </Message>
            }
            {!loading && !environment && !error &&
              <Message>
                <Message.Header>No tasks found</Message.Header>
                <p>{`No tasks found for '${router.query.environmentSlug}'`}</p>
              </Message>
            }
            {loading && <LoadingEnvironmentRows delay={250} rows="15" type={"list"}/>}
            {!loading && environment &&
            <>
              <EnvironmentHeader environment={environment}/>
              <NavTabs activeTab="tasks" environment={environment} />
                <div className="content">
                  {visibleMessage && environment && environment.tasks && environment.tasks.length <= envLimit && 
                    <Message info onDismiss={() => handleDismiss()}>
                      <Message.Header>Results have been limited</Message.Header>
                      <p>{`Number of results displayed is limited to ${tasksLimit}`}</p>
                      <p>{customMessage && `${customMessage}`}</p>
                    </Message>
                  }
                  <AddTask pageEnvironment={environment} fetchMore={() => fetchMore({
                    variables: {
                      environment,
                      after: environment,
                    }
                  })} />
                  <Suspense fallback={<LazyLoadingContent delay={250} rows="15"/>}>
                    <Tasks 
                      tasks={environment.tasks}
                      environmentSlug={environment.openshiftProjectName}
                      projectSlug={environment.project.name}
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

export default withRouter(PageTasks);
