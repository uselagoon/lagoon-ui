import React, { useEffect } from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import getConfig from "next/config";
import MainLayout from "layouts/MainLayout";
import EnvironmentWithDeploymentsQuery from "lib/query/EnvironmentWithDeployments";
import DeploymentsSubscription from "lib/subscription/Deployments";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import EnvironmentBreadcrumb from "components/Breadcrumbs/Environment";
import NavTabs from "components/NavTabs";
import NavTabsSkeleton from "components/NavTabs/NavTabsSkeleton";
import DeployLatest from "components/DeployLatest";
import ResultsLimited from "components/ResultsLimited";
import { DeploymentsWrapper } from "../styles/pageStyles";
import Deployments from "components/Deployments";
import DeploymentsSkeleton from "components/Deployments/DeploymentsSkeleton";
import { useQuery } from "@apollo/react-hooks";
import QueryError from "../components/errors/QueryError";
import EnvironmentNotFound from "../components/errors/EnvironmentNotFound";
import Skeleton from "react-loading-skeleton";
import { useTourContext } from "../tours/TourContext";

const { publicRuntimeConfig } = getConfig();
const envLimit = parseInt(publicRuntimeConfig.LAGOON_UI_DEPLOYMENTS_LIMIT, 10);
const customMessage = publicRuntimeConfig.LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE;

let urlResultLimit = envLimit;
if (typeof window !== "undefined") {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let limit = params.get("limit");
  if (limit) {
    if (parseInt(limit.trim(), 10)) {
      urlResultLimit = parseInt(limit.trim(), 10);
    }
  }
}
const resultLimit = urlResultLimit === -1 ? null : urlResultLimit;

/**
 * Displays the deployments page, given the openshift project name.
 */
export const PageDeployments = ({ router }) => {
  const { continueTour } = useTourContext();
  const { data, error, loading, subscribeToMore } = useQuery(
    EnvironmentWithDeploymentsQuery,
    {
      variables: {
        openshiftProjectName: router.query.openshiftProjectName,
        limit: resultLimit,
      },
    }
  );


  useEffect(() => {
    if (!loading && data?.environment) {
      continueTour();
    }
  }, [loading]);

  if (loading) {
    const projectSlug = router.asPath.match(/projects\/([^/]+)/)?.[1];
    const openshiftProjectName = router.query.openshiftProjectName;

    return (
      <>
        <Head>
          <title>{`${router.query.openshiftProjectName} | Backups`}</title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <ProjectBreadcrumb projectSlug={projectSlug} />
            <EnvironmentBreadcrumb
              environmentSlug={openshiftProjectName}
              projectSlug={projectSlug}
            />
          </Breadcrumbs>

          <DeploymentsWrapper>
            <NavTabsSkeleton
              activeTab="deployments"
              projectName={projectSlug}
              openshiftProjectName={openshiftProjectName}
            />
            <div className="content">
              <Skeleton height={70} />

              <DeploymentsSkeleton />
              <ResultsLimited
                limit={resultLimit}
                message={
                  (!customMessage && "") ||
                  (customMessage && customMessage.replace(/['"]+/g, ""))
                }
              />
            </div>
          </DeploymentsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const environment = data?.environment;

  if (!environment) {
    return (
      <EnvironmentNotFound
        variables={{
          openshiftProjectName: router.query.openshiftProjectName,
        }}
      />
    );
  }

  subscribeToMore({
    document: DeploymentsSubscription,
    variables: { environment: environment.id },
    updateQuery: (prevStore, { subscriptionData }) => {
      if (!subscriptionData.data) return prevStore;
      const prevDeployments = prevStore.environment.deployments;
      const incomingDeployment = subscriptionData.data.deploymentChanged;
      const existingIndex = prevDeployments.findIndex(
        (prevDeployment) => prevDeployment.id === incomingDeployment.id
      );
      let newDeployments;

      // New deployment.
      if (existingIndex === -1) {
        newDeployments = [incomingDeployment, ...prevDeployments];
      }
      // Updated deployment
      else {
        newDeployments = Object.assign([...prevDeployments], {
          [existingIndex]: incomingDeployment,
        });
      }

      const newStore = {
        ...prevStore,
        environment: {
          ...prevStore.environment,
          deployments: newDeployments,
        },
      };

      return newStore;
    },
  });

  return (
    <>
      <Head>
        <title>{`${router.query.openshiftProjectName} | Deployments`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <ProjectBreadcrumb projectSlug={environment.project.name} />
          <EnvironmentBreadcrumb
            environmentSlug={environment.openshiftProjectName}
            projectSlug={environment.project.name}
          />
        </Breadcrumbs>
        <DeploymentsWrapper>
          <NavTabs activeTab="deployments" environment={environment} />
          <div className="content">
            <DeployLatest pageEnvironment={environment} />
            <Deployments
              deployments={environment.deployments}
              environmentSlug={environment.openshiftProjectName}
              projectSlug={environment.project.name}
            />
            <ResultsLimited
              limit={resultLimit}
              results={environment.deployments.length}
              message={
                (!customMessage && "") ||
                (customMessage && customMessage.replace(/['"]+/g, ""))
              }
            />
          </div>
        </DeploymentsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageDeployments);
