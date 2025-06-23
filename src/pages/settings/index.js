import React from 'react';

import Head from 'next/head';

import { useQuery } from '@apollo/client';
import MainLayout from 'layouts/MainLayout';
import Me from 'lib/query/Me';

import EmailPreferences from '../../components/EmailPreferences';
import SshKeys from '../../components/SshKeys';
import AddSshKey from '../../components/SshKeys/AddSshKey';
import QueryError from '../../components/errors/QueryError';
import { CommonWrapper } from '../../styles/commonPageStyles';

/**
 * Displays the user settings page.
 */
const SettingsPage = () => {
  const queryVars = {
    displayName: 'Me',
    fetchPolicy: 'cache-and-network',
  };
  const { data, loading, error, refetch } = useQuery(Me, queryVars);

  const handleRefetch = async () => await refetch(queryVars);

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
          <div className="content">
            <EmailPreferences me={data?.me || {}} loading={loading} handleRefetch={handleRefetch} />
            <SshKeys me={data?.me || {}} loading={loading} handleRefetch={handleRefetch} />
            <AddSshKey me={data?.me || {}} />
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};

export default SettingsPage;
