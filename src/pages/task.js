import React from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import EnvironmentWithTaskQuery from "lib/query/EnvironmentWithTask";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import EnvironmentBreadcrumb from "components/Breadcrumbs/Environment";
import TaskBreadcrumb from "components/Breadcrumbs/Task";
import NavTabs from "components/NavTabs";
import Task from "components/Task";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import {
  withEnvironmentRequired,
  withTaskRequired,
} from "lib/withDataRequired";
import { TaskWrapper } from "../styles/pageStyles";

/**
 * Displays a task page, given the openshift project and task ID.
 */
export const PageTask = ({ router }) => (
  <>
    <Head>
      <title>{`${router.query.taskName} | Task`}</title>
    </Head>
    <Query
      query={EnvironmentWithTaskQuery}
      variables={{
        openshiftProjectName: router.query.openshiftProjectName,
        taskName: router.query.taskName,
      }}
    >
      {R.compose(
        withQueryLoading,
        withQueryError,
        withEnvironmentRequired,
        withTaskRequired
      )(({ data: { environment } }) => (
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
      ))}
    </Query>
  </>
);

export default withRouter(PageTask);
