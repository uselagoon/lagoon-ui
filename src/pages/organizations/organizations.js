import React from 'react';

import Head from 'next/head';

import { useQuery } from '@apollo/react-hooks';
import Organizations from 'components/Organizations/Organizations';
import OrganizationsSkeleton from 'components/Organizations/Organizations/OrganizationsSkeleton';
import MainLayout from 'layouts/MainLayout';
import AllOrganizationsQuery from 'lib/query/organizations/AllOrganizationsQuery';

import QueryError from '../../components/errors/QueryError';
import { CommonWrapper } from '../../styles/commonPageStyles';

/**
 * Displays the organizations page.
 */
const OrganizationsPage = () => {
  const { data, error, loading } = useQuery(AllOrganizationsQuery, {
    displayName: 'AllOrganizationsQuery',
  });

  if (error) {
    return <QueryError error={error} />;
  }
  return (
    <>
      <Head>
        <title>Organizations</title>
      </Head>
      <MainLayout>
        <CommonWrapper>
          <h2>Organizations</h2>
          <div className="content">
            {loading ? <OrganizationsSkeleton /> : <Organizations organizations={data.allOrganizations || []} />}
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};

export default OrganizationsPage;
