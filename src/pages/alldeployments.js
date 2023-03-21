import React, { useEffect } from "react";
import Head from "next/head";
import MainLayout from "layouts/MainLayout";
import deploymentsByFilter from "lib/query/DeploymentsByFilter";
import { withRouter } from "next/router";
import DeploymentsByFilter from "../components/DeploymentsByFilter";
import DeploymentsByFilterSkeleton from "components/DeploymentsByFilter/DeploymentsByFilterSkeleton";
import { CommonWrapperMargin } from "../styles/commonPageStyles";
import { useQuery } from "@apollo/react-hooks";
import QueryError from "../components/errors/QueryError";
import { useTourContext } from "../tours/TourContext";

/**
 * Displays the projects page.
 */
const AllDeployments = () => {
  const { setTourState } = useTourContext();

  const { data, error, loading } = useQuery(deploymentsByFilter, {
    displayName: "deploymentsByFilter",
  });

  if (error) {
    return <QueryError error={error} />;
  }
  
  useEffect(()=>{
    // tour only starts running if there's at least one deployment
    if (!loading && data.deploymentsByFilter.length){

      setTourState((prev) => {
        return { ...prev, running: true };
      });
    }
  },[loading])

  return (
    <>
      <Head>
        <title>All deployments</title>
      </Head>

      <MainLayout>
        <CommonWrapperMargin>
          <h2>Deployments</h2>
          <div className="content">
            {loading ? (
              <DeploymentsByFilterSkeleton />
            ) : (
              <DeploymentsByFilter
                deployments={data.deploymentsByFilter || []}
              />
            )}
          </div>
        </CommonWrapperMargin>
      </MainLayout>
    </>
  );
};

export default withRouter(AllDeployments);
