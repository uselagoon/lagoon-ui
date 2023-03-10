import React, { useCallback, useContext, useEffect, useState } from "react";
import * as R from "ramda";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import deploymentsByFilter from "lib/query/DeploymentsByFilter";
import Projects from "components/Projects";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import { withRouter } from "next/router";
import DeploymentsByFilter from "../components/DeploymentsByFilter";
import { CommonWrapperMargin } from "../styles/commonPageStyles";
import { TourContext } from "../tours/TourContext";
import { useApolloClient } from "@apollo/react-hooks";

// export const getServerSideProps = async ()=>{

//   const {data} = await client.query({query:deploymentsByFilter})

//   return {
//     props:{
//       data
//     }
//   }
// }

/**
 * Displays the projects page.
 */
const AllDeployments = () => {
  const client = useApolloClient();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    setLoading(true);
    const { data } = await client.query({ query: deploymentsByFilter });
    setData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const { running, stepIndex, setTourState } = useContext(TourContext);
  console.warn(running, stepIndex, setTourState);

  return (
    <>
      <Head>
        <title>All deployments</title>
      </Head>
      {/* <Query query={deploymentsByFilter} displayName="deploymentsByFilter">
      {R.compose(withQueryLoading)(({ data }) => ( */}

      <MainLayout>
        <CommonWrapperMargin>
          <h2>Deployments</h2>
          <div className="content">
            {!loading && (
              <DeploymentsByFilter
                deployments={data.deploymentsByFilter || []}
              />
            )}
          </div>
        </CommonWrapperMargin>
      </MainLayout>

      {/* ))}
    </Query> */}
    </>
  );
};

export default withRouter(AllDeployments);
