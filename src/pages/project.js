import React from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import MainLayout from "layouts/MainLayout";
import ProjectByNameQuery from "lib/query/ProjectByName";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import ProjectDetailsSidebar from "components/ProjectDetailsSidebar";
import Environments from "components/Environments";
import EnvironmentsSkeleton from "components/Environments/EnvironmentsSkeleton";
import { ProjectDetailsWrapper } from "../styles/pageStyles";
import { useQuery } from "@apollo/react-hooks";
import ProjectNotFound from "../components/errors/ProjectNotFound";
import SidebarSkeleton from "components/ProjectDetailsSidebar/SidebarSkeleton";
import QueryError from "../components/errors/QueryError";

/**
 * Displays a project page, given the project name.
 */
export const PageProject = ({ router }) => {
  const { data, error, loading } = useQuery(ProjectByNameQuery, {
    variables: { name: router.query.projectName },
  });

  if (loading) {
    return (
      <>
        <Head>
          <title>{`${router.query.projectName} | Project`}</title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={router.query.projectName} />
          </Breadcrumbs>
          <ProjectDetailsWrapper>
            <div className="project-details-sidebar">
              <SidebarSkeleton />
            </div>
            <div className="environments-wrapper">
              <h3>Environments</h3>
              <EnvironmentsSkeleton />
            </div>
          </ProjectDetailsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const project = data?.project;

  if (!project) {
    return <ProjectNotFound variables={{ name: router.query.projectName }} />;
  }
  // Sort alphabetically by environmentType and then deployType
  const environments = R.sortWith(
    [R.descend(R.prop("environmentType")), R.ascend(R.prop("deployType"))],
    project.environments
  );

  return (
    <>
      <Head>
        <title>{`${router.query.projectName} | Project`}</title>
      </Head>

      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={project.name} />
        </Breadcrumbs>
        <ProjectDetailsWrapper>
          <div className="project-details-sidebar">
            <ProjectDetailsSidebar project={project} />
          </div>
          <div className="environments-wrapper">
            <h3>Environments</h3>
            {!environments.length && <p>No Environments</p>}
            <Environments environments={environments} project={project} />
          </div>
        </ProjectDetailsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageProject);
