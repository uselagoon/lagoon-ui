import React, { useCallback, useContext, useEffect, useState } from "react";
import * as R from "ramda";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import AllProjectsQuery from "lib/query/AllProjects";
import Projects from "components/Projects";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { CommonWrapper } from "../styles/commonPageStyles";
import { TourContext } from "../tours/TourContext";
import ProjectTour from "../tours/ProjectTour"
import { useApolloClient } from "@apollo/react-hooks";

/**
 * Displays the projects page.
 */
const ProjectsPage = () => {

  const client = useApolloClient();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    setLoading(true);
    const { data } = await client.query({ query: AllProjectsQuery });
    setData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const {running, stepIndex, setTourState} = useContext(TourContext);
  console.warn(running, stepIndex, setTourState);
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      {/* <Query query={AllProjectsQuery} displayName="AllProjectsQuery">
        {R.compose(
          withQueryLoading,
          withQueryError
        )(({ data }) => ( */}
          <MainLayout>
            <CommonWrapper>
              <ProjectTour />
              <h2>Projects</h2>
              <div className="content">
               {!loading && <Projects projects={data.allProjects || []} />}
              </div>
            </CommonWrapper>
          </MainLayout>
        {/* ))}
      </Query> */}
    </>
  );
};
export default ProjectsPage;
