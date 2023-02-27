import React from "react";
import * as R from "ramda";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import AllProjectsQuery from "lib/query/AllProjects";
import Projects from "components/Projects";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";

/**
 * Displays the projects page.
 */
const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <Query query={AllProjectsQuery} displayName="AllProjectsQuery">
        {R.compose(
          withQueryLoading,
          withQueryError
        )(({ data }) => (
          <MainLayout>
            <CommonWrapper>
              <h2>Projects</h2>
              <div className="content">
                <Projects projects={data.allProjects || []} />
              </div>
            </CommonWrapper>
          </MainLayout>
        ))}
      </Query>
    </>
  );
};
export default ProjectsPage;
