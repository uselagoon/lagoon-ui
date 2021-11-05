import React from 'react';
import { useQuery } from "@apollo/client";
import Head from 'next/head';
import MainLayout from 'layouts/MainLayout';
import Me from 'lib/query/Me';

import { LoadingSpinner } from 'components/Loading';
import { bp } from 'lib/variables';
import { Message } from 'semantic-ui-react';

import EnvironmentVariables from 'components/EnvironmentVariables';

/**
 * Displays environment variables page.
 */
const EnvironmentVariablesPage = () => {

  const { data, loading, error } = useQuery(Me, {
      displayName: "Me",
      fetchPolicy: "cache-and-network"
  });

  return (
  <>
    <Head>
      <title>Environment Variables</title>
    </Head>
    <MainLayout>
      {!loading && error &&
        <Message negative>
          <Message.Header>Error: Unable to load environment variables</Message.Header>
          <p>{`${error}`}</p>
        </Message>
      }
      {loading && <LoadingSpinner />}
      {!loading && data &&
        <div className="content-wrapper">
          <h2>Environment Variables</h2>
          <div className="content">
            <EnvironmentVariables me={data.me || {}} />
          </div>
        </div>
      }
      <style jsx>{`
        .content-wrapper {
          h2 {
            margin: 38px calc((100vw / 16) * 1) 0;
            @media ${bp.wideUp} {
              margin: 62px calc((100vw / 16) * 2) 0;
            }
            @media ${bp.extraWideUp} {
              margin: 62px calc((100vw / 16) * 3) 0;
            }
          }
          .content {
            margin: 38px calc((100vw / 16) * 1);
            @media ${bp.wideUp} {
              margin: 38px calc((100vw / 16) * 2);
            }
            @media ${bp.extraWideUp} {
              margin: 38px calc((100vw / 16) * 3);
            }
          }
        }
      `}</style>
    </MainLayout>
  </>
)};

export default EnvironmentVariablesPage;
