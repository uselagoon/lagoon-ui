import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { useQuery } from "@apollo/client";


import Me from 'lib/query/Me';


import dynamic from 'next/dynamic';

import { Grid, Sidebar, Header, Divider } from 'semantic-ui-react';
import MainNavigation from 'layouts/MainNavigation';
import MainLayout from 'layouts/MainLayout';
import Navigation from 'components/Navigation';

import { LoadingSpinner } from 'components/Loading';


import Groups from 'components/Groups';

/**
 * Displays the groups page.
 */
const GroupsPage = () => {
 
  const { data, loading, error } = useQuery(Me, {
      displayName: "Me",
      fetchPolicy: "cache-and-network"
  });

  return (
   <>
    <Head>
      <title>Groups | Lagoon</title>
    </Head>
    <MainLayout>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={2}>
            <MainNavigation>
              <Navigation />
            </MainNavigation>
          </Grid.Column>
          <Grid.Column width={14} style={{ padding: '0 4em' }}>
            <Sidebar.Pusher>
              {!loading &&
                <div className="groups-wrapper">
                  <h2>Groups</h2>
                  <Groups me={data.me || {}} />
                </div>
              }
            </Sidebar.Pusher>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <style jsx>{`
        .category-filter {
          padding: 0 0 1em;
        }
      `}</style>
    </MainLayout>
  </>
  )};

export default GroupsPage;
