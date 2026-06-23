import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Me from 'lib/query/Me';
import Head from 'next/head';
import MainLayout from 'layouts/MainLayout';
import { CommonWrapper } from '../styles/commonPageStyles';

import Account from '../components/Account';

const AccountPage = () => {
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
        <title>Your Account</title> 
      </Head>
      <MainLayout>
        <CommonWrapper>
          <div className="content">
            <Account me={data?.me || {}} loading={loading} handleRefetch={handleRefetch} />
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};

export default AccountPage;
