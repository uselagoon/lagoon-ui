import React from 'react';
import * as R from 'ramda';
import Head from 'next/head';
import { Query } from 'react-apollo';
import MainLayout from 'layouts/MainLayout';
import deploymentsByFilter from 'lib/query/DeploymentsByFilter';
import Projects from 'components/Projects';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import { bp } from 'lib/variables';
import { withRouter } from 'next/router';
import DeploymentsByFilter from '../components/DeploymentsByFilter';

/**
 * Displays the projects page.
 */
const AllBuilds = () => (
  <>
    <Head>
      <title>All Builds</title>
    </Head>
    <Query query={deploymentsByFilter} displayName="deploymentsByFilter">
      {R.compose(
        withQueryLoading
      )(({ data }) => (
        <MainLayout>
          <div className="content-wrapper">
            <h2>Builds</h2>
            <div className="content">
              <DeploymentsByFilter deployments={data.deploymentsByFilter || []}/>
            </div>
          </div>
          <style jsx>{`
            .content-wrapper {
              h2 {
                margin: 38px calc((100vw / 16) * 1) 0;
                @media ${bp.wideUp} {
                  margin: 62px calc((100vw / 16) * 1) 0;
                }
                @media ${bp.extraWideUp} {
                  margin: 62px calc((100vw / 16) * 2) 0;
                }
              }
              .content {
                margin: 38px calc((100vw / 16) * 1);
                @media ${bp.wideUp} {
                  margin: 38px calc((100vw / 16) * 1);
                }
                @media ${bp.extraWideUp} {
                  margin: 38px calc((100vw / 16) * 2);
                }
              }
            }
          `}</style>
        </MainLayout>
      ))}
    </Query>
  </>
);

export default withRouter(AllBuilds);
