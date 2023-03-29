import React, { useRef, useState } from "react";
import * as R from "ramda";
import { withRouter } from "next/router";
import Head from "next/head";
import { Query } from "react-apollo";
import MainLayout from "layouts/MainLayout";
import EnvironmentWithDeploymentQuery from "lib/query/EnvironmentWithDeployment";
import Breadcrumbs from "components/Breadcrumbs";
import ProjectBreadcrumb from "components/Breadcrumbs/Project";
import EnvironmentBreadcrumb from "components/Breadcrumbs/Environment";
import DeploymentBreadcrumb from "components/Breadcrumbs/Deployment";
import NavTabs from "components/NavTabs";
import Deployment from "components/Deployment";
import withQueryLoading from "lib/withQueryLoading";
import withQueryError from "lib/withQueryError";
import {
  withEnvironmentRequired,
  withDeploymentRequired,
} from "lib/withDataRequired";
import { DeploymentWrapper } from "../styles/pageStyles";

/**
 * Displays a deployment page, given the openshift project and deployment name.
 */
export const PageDeployment = ({ router }) => {
  const logsContent = useRef(null);
  const logsTopRef = useRef(null);
  const logsEndRef = useRef(null);
  const [showBottom, setShowBottom] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [hidden, setHidden] = useState("");

  const scrollToTop = () => {
    logsTopRef.current.scrollIntoView({ behavior: "smooth" });
    setShowTop(!!showTop);
    setShowBottom(!!showBottom);
  };

  const scrollToBottom = () => {
    logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    setShowTop(!!showTop);
    setShowBottom(!!showBottom);
  };

  const onScroll = () => {
    const pageTop = document.documentElement.scrollTop <= 300;
    const pageBottom =
      document.body.scrollHeight - document.documentElement.scrollTop - 100 <=
      document.documentElement.clientHeight;

    if (hidden == "hidden") return;
    if (pageTop) {
      setShowTop(false);
      setShowBottom(true);
    }
    if (pageBottom) {
      setShowTop(true);
      setShowBottom(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`${router.query.deploymentName} | Deployment`}</title>
      </Head>
      <Query
        query={EnvironmentWithDeploymentQuery}
        variables={{
          openshiftProjectName: router.query.openshiftProjectName,
          deploymentName: router.query.deploymentName,
        }}
      >
        {R.compose(
          withQueryLoading,
          withQueryError,
          withEnvironmentRequired,
          withDeploymentRequired
        )(({ data: { environment } }) => {
          const deployment = environment && environment.deployments[0];
          return (
            <MainLayout>
              <div ref={logsTopRef} />
              <Breadcrumbs>
                <ProjectBreadcrumb projectSlug={environment.project.name} />
                <EnvironmentBreadcrumb
                  environmentSlug={environment.openshiftProjectName}
                  projectSlug={environment.project.name}
                />
                <DeploymentBreadcrumb
                  deploymentSlug={deployment.name}
                  environmentSlug={environment.openshiftProjectName}
                  projectSlug={environment.project.name}
                />
              </Breadcrumbs>
              <DeploymentWrapper>
                <NavTabs activeTab="deployments" environment={environment} />
                <div ref={logsContent} className="content">
                  <Deployment deployment={deployment} />
                </div>
              </DeploymentWrapper>
              <div ref={logsEndRef} />
            </MainLayout>
          );
        })}
      </Query>
    </>
  );
};

export default withRouter(PageDeployment);
