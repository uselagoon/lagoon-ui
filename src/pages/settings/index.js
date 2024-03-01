import React from 'react';

import Head from 'next/head';

import { useQuery } from '@apollo/react-hooks';
import MainLayout from 'layouts/MainLayout';
import Me from 'lib/query/Me';

import SshKeys from '../../components/SshKeys';
import AddSshKey from '../../components/SshKeys/AddSshKey';
import QueryError from '../../components/errors/QueryError';
import { CommonWrapper } from '../../styles/commonPageStyles';

/**
 * Displays the user settings page.
 */
const SettingsPage = () => {
  const { data, loading, error } = useQuery(Me, {
    displayName: 'Me',
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <QueryError error={error} />;
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <MainLayout>
        <CommonWrapper>
          <h2>SSH keys</h2>
          <div className="content">
            <SshKeys me={data?.me || {}} loading={loading} />
            <AddSshKey me={data?.me || {}} />
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};

export default SettingsPage;
