import React, { useEffect } from "react";
import Head from "next/head";
import MainLayout from "layouts/MainLayout";
import AllProjectsQuery from "lib/query/AllProjects";
import Projects from "components/Projects";
import ProjectsSkeleton from "components/Projects/ProjectsSkeleton";
import { CommonWrapper } from "../styles/commonPageStyles";
import { useQuery } from "@apollo/react-hooks";
import QueryError from "../components/errors/QueryError";
import { useTourContext } from "../tours/TourContext";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

/**
 * Displays the projects page.
 */
const ProjectsPage = () => {

  const {t} = useTranslation(i18next.language);

  const { startTour } = useTourContext();

  const { data, loading, error } = useQuery(AllProjectsQuery, {
    displayName: "AllProjectsQuery",
  });

  useEffect(() => {
    // tour only starts running if there's at least one project the user can view
    if (!loading && data.allProjects.length) {
      startTour();
    }
  }, [loading]);

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
          <h2>
            {t("projects.test")}
          </h2>
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
