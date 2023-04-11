import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "@apollo/react-hooks";
import MainLayout from "layouts/MainLayout";
import ProjectByNameQuery from "lib/query/ProjectByName";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import ProjectNavTabs from "components/ProjectNavTabs";
import DeployTargets from "components/DeployTargets";
import DeployTargetSkeleton from "components/DeployTargets/DeployTargetsSkeleton";
import ProjectNotFound from "../components/errors/ProjectNotFound";
import QueryError from "../components/errors/QueryError";
import { ProjectWrapper } from "../styles/pageStyles";
import ProjectNavTabsSkeleton from "components/ProjectNavTabs/ProjectNavTabsSkeleton";

/**
 * Displays a list of all Deploy Targets for a project.
 */
export const PageDeployTargets = ({ router }) => {
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
          <ProjectWrapper>
            <ProjectNavTabsSkeleton
                activeTab="overview"
                projectName={router.query.projectName}
              />
            <DeployTargetSkeleton />
          </ProjectWrapper>
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

  return (
  <>
    <Head>
      <title>{`${router.query.projectName} | Project`}</title>
    </Head>
    <MainLayout>
      <Breadcrumbs>
        <ProjectBreadcrumb projectSlug={project.name} />
      </Breadcrumbs>
      <ProjectWrapper>
        <ProjectNavTabs activeTab="deployTargets" project={project} />
        <DeployTargets project={project} />
      </ProjectWrapper>
    </MainLayout>
  </>
  );
};

export default withRouter(PageDeployTargets);
