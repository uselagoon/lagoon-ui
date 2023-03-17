import React from "react";
import Head from "next/head";
import MainLayout from "layouts/MainLayout";
import AllProjectsQuery from "lib/query/AllProjects";
import Projects from "components/Projects";
import ProjectsSkeleton from "components/Projects/ProjectsSkeleton";
import { CommonWrapper } from "../styles/commonPageStyles";
import { useQuery } from "@apollo/react-hooks";
import QueryError from "../components/errors/QueryError";

/**
 * Displays the projects page.
 */
const ProjectsPage = () => {

  
  const { data, loading, error } = useQuery(AllProjectsQuery, {
    displayName: "AllProjectsQuery",
  });

  if (error) {
    return <QueryError error={error} />;
  }



  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <MainLayout>
        <CommonWrapper>
          <h2>Projects</h2>
          <div className="content">
            {loading ? (
              <ProjectsSkeleton />
            ) : (
              <Projects projects={data.allProjects || []} />
            )}
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};
export default ProjectsPage;
