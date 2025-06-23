import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import getConfig from 'next/config';
import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import AddTask from 'components/AddTask';
import Breadcrumbs from 'components/Breadcrumbs';
import EnvironmentBreadcrumb from 'components/Breadcrumbs/Environment';
import ProjectBreadcrumb from 'components/Breadcrumbs/Project';
import NavTabs from 'components/NavTabs';
import NavTabsSkeleton from 'components/NavTabs/NavTabsSkeleton';
import ResultsLimited from 'components/ResultsLimited';
import Tasks from 'components/Tasks';
import TasksSkeleton from 'components/Tasks/TasksSkeleton';
import MainLayout from 'layouts/MainLayout';
import EnvironmentWithTasksQuery from 'lib/query/EnvironmentWithTasks';
import TasksSubscription from 'lib/subscription/Tasks';

import EnvironmentNotFound from '../components/errors/EnvironmentNotFound';
import QueryError from '../components/errors/QueryError';
import { TasksWrapper } from '../styles/pageStyles';
import { useTourContext } from '../tours/TourContext';

const { publicRuntimeConfig } = getConfig();
const envLimit = parseInt(publicRuntimeConfig.LAGOON_UI_TASKS_LIMIT, 10);
const customMessage = publicRuntimeConfig.AGOON_UI_TASKS_LIMIT_MESSAGE;

const disableSubscriptions = publicRuntimeConfig.DISABLE_SUBSCRIPTIONS?.toLowerCase() === 'true';

/**
 * Displays the tasks page, given the openshift project name.
 */
export const PageTasks = ({ router, renderAddTasks }) => {
  const [resultLimit, setResultLimit] = useState(null);

  const { continueTour } = useTourContext();
  const { data, error, loading, subscribeToMore, refetch } = useQuery(EnvironmentWithTasksQuery, {
    variables: {
      openshiftProjectName: router.query.openshiftProjectName,
      limit: resultLimit,
    },
  });

  const handleRefetch = async () =>
    await refetch({
      openshiftProjectName: router.query.openshiftProjectName,
      limit: resultLimit,
    });

  useEffect(() => {
    let urlResultLimit = envLimit;
    if (typeof window !== 'undefined') {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let limit = params.get('limit');
      if (limit) {
        if (parseInt(limit.trim(), 10)) {
          urlResultLimit = parseInt(limit.trim(), 10);
        }
        if (limit == 'all') {
          urlResultLimit = -1;
        }
      }
    }
    setResultLimit(urlResultLimit === -1 ? null : urlResultLimit);
  }, []);

  useEffect(() => {
    if (!loading && data?.environment?.tasks.length) {
      setTimeout(() => {
        continueTour();
      }, 1000);
    }
  }, [loading]);

  if (loading) {
    const projectSlug = router.asPath.match(/projects\/([^/]+)/)?.[1];
    const openshiftProjectName = router.query.openshiftProjectName;

    return (
      <>
        <Head>
          <title>{`${router.query.openshiftProjectName} | Tasks`}</title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={projectSlug} />
            <EnvironmentBreadcrumb environmentSlug={openshiftProjectName} projectSlug={projectSlug} />
          </Breadcrumbs>
          <TasksWrapper>
            <NavTabsSkeleton activeTab="tasks" projectName={projectSlug} openshiftProjectName={openshiftProjectName} />

            <div className="content">
              <Skeleton height={'60px'} />
              <TasksSkeleton />

              <ResultsLimited
                limit={resultLimit}
                message={(!customMessage && '') || (customMessage && customMessage.replace(/['"]+/g, ''))}
              />
            </div>
          </TasksWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const environment = data?.environment;

  if (!environment) {
    return (
      <EnvironmentNotFound
        variables={{
          openshiftProjectName: router.query.openshiftProjectName,
        }}
      />
    );
  }

  if (!disableSubscriptions) {
    subscribeToMore({
      document: TasksSubscription,
      variables: { environment: environment.id },
      updateQuery: (prevStore, { subscriptionData }) => {
        if (!subscriptionData.data) return prevStore;
        const prevTasks = prevStore.environment.tasks;
        const incomingTask = subscriptionData.data.taskChanged;
        const existingIndex = prevTasks.findIndex(prevTask => prevTask.id === incomingTask.id);
        let newTasks;

        // New task.
        if (existingIndex === -1) {
          newTasks = [incomingTask, ...prevTasks];
        }
        // Updated task
        else {
          newTasks = Object.assign([...prevTasks], {
            [existingIndex]: incomingTask,
          });
        }

        const newStore = {
          ...prevStore,
          environment: {
            ...prevStore.environment,
            tasks: newTasks,
          },
        };

        return newStore;
      },
    });
  }

  return (
    <>
      <Head>
        <title>{`${router.query.openshiftProjectName} | Tasks`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={environment.project.name} />
          <EnvironmentBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
        </Breadcrumbs>
        <TasksWrapper>
          <NavTabs activeTab="tasks" environment={environment} />
          <div className="content">
            {!renderAddTasks && <AddTask pageEnvironment={environment} onNewTask={handleRefetch} />}
            <Tasks
              tasks={environment.tasks}
              environmentId={environment.id}
              environmentSlug={environment.openshiftProjectName}
              projectSlug={environment.project.name}
              projectId={environment.project.id}
            />
            <ResultsLimited
              limit={resultLimit}
              changeLimit={setResultLimit}
              results={environment.tasks.length}
              message={(!customMessage && '') || (customMessage && customMessage.replace(/['"]+/g, ''))}
            />
          </div>
        </TasksWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageTasks);
