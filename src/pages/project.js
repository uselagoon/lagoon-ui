import React, { useEffect } from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import MainLayout from "layouts/MainLayout";
import ProjectByNameQuery from "lib/query/ProjectByName";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import ProjectDetailsSidebar from "components/ProjectDetailsSidebar";
import Environments from "components/Environments";
import ProjectNavTabs from "components/ProjectNavTabs";
import { ProjectDetailsWrapper, ProjectWrapper } from "../styles/pageStyles";
import EnvironmentsSkeleton from "components/Environments/EnvironmentsSkeleton";
import ProjectNavTabsSkeleton from "components/ProjectNavTabs/ProjectNavTabsSkeleton";
import { useQuery } from "@apollo/react-hooks";
import ProjectNotFound from "../components/errors/ProjectNotFound";
import SidebarSkeleton from "components/ProjectDetailsSidebar/SidebarSkeleton";
import QueryError from "../components/errors/QueryError";
import { useTourContext } from "../tours/TourContext";

/**
 * Displays a project page, given the project name.
 */
export const PageProject = ({ router }) => {
  const {continueTour} = useTourContext();
  const { data, error, loading } = useQuery(ProjectByNameQuery, {
    variables: { name: router.query.projectName },
  });

  useEffect(() => {
    if (!loading) {
      continueTour();
    }
  }, [loading]);
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
          <ProjectDetailsWrapper>
            <div className="project-details-header">
              <SidebarSkeleton />
            </div>
            <div className="environments-wrapper">
              <div className="environments-all">
                <EnvironmentsSkeleton />
              </div>
            </div>
          </ProjectDetailsWrapper>
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
            <ProjectWrapper>
              <ProjectNavTabs activeTab="overview" project={project} />
              <ProjectDetailsWrapper>
                <div className="project-details-header">
                  <ProjectDetailsSidebar project={project} />
                </div>
                <div className="environments-wrapper">
                  <div className="environments-all">
                    <Environments
                      environments={environments}
                      project={project}
                    />
                  </div>
                </div>
              </ProjectDetailsWrapper>
            </ProjectWrapper>
          </MainLayout>
    </>
  );
};

export default withRouter(PageProject);
