import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import MainLayout from "layouts/MainLayout";
import EnvironmentWithTaskQuery from "lib/query/EnvironmentWithTask";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import EnvironmentBreadcrumb from "components/Breadcrumbs/Environment";
import TaskBreadcrumb from "components/Breadcrumbs/Task";
import NavTabs from "components/NavTabs";
import NavTabsSkeleton from "components/NavTabs/NavTabsSkeleton";
import Task from "components/Task";
import TaskSkeleton from "components/Task/TaskSkeleton";
import { TaskWrapper } from "../styles/pageStyles";
import { useQuery } from "@apollo/react-hooks";
import QueryError from "../components/errors/QueryError";
import TaskNotFound from "../components/errors/TaskNotFound";
import EnvironmentNotFound from "../components/errors/EnvironmentNotFound";

/**
 * Displays a task page, given the openshift project and task ID.
 */
export const PageTask = ({ router }) => {
  const { data, error, loading } = useQuery(EnvironmentWithTaskQuery, {
    variables: {
      openshiftProjectName: router.query.openshiftProjectName,
      taskName: router.query.taskName,
    },
  });

  if (loading) {
    const projectSlug = router.asPath.match(/projects\/([^/]+)/)?.[1];
    const openshiftProjectName = router.query.openshiftProjectName;
    return (
      <>
        <Head>
          <title>{`${router.query.taskName} | Task`}</title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={projectSlug} />
            <EnvironmentBreadcrumb
              environmentSlug={openshiftProjectName}
              projectSlug={projectSlug}
            />
          </Breadcrumbs>

          <TaskWrapper>
            <NavTabsSkeleton
              activeTab="tasks"
              projectName={projectSlug}
              openshiftProjectName={openshiftProjectName}
            />
            <div className="content">
            <TaskSkeleton />
            </div>
          </TaskWrapper>
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

  if (!environment?.tasks.length) {
    return (
      <TaskNotFound
        variables={{
          deployName: router.query.deploymentName,
        }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>{`${router.query.taskName} | Task`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={environment.project.name} />
          <EnvironmentBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
          <TaskBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
            taskSlug={environment.tasks[0].taskName}
            taskName={environment.tasks[0].name}
          />
        </Breadcrumbs>
        <TaskWrapper>
          <NavTabs activeTab="tasks" environment={environment} />
          <div className="content">
            <Task task={environment.tasks[0]} />
          </div>
        </TaskWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageTask);
