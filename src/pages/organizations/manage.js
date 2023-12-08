import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import { UsersWrapper } from 'components/Organizations/Users/Styles';
import UsersSkeleton from 'components/Organizations/Users/UsersSkeleton';
import MainLayout from 'layouts/MainLayout';
import OrganizationByNameQuery from 'lib/query/organizations/OrganizationByName';

import Manage from '../../components/Organizations/Manage';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays the manage page
 */
export const PageManage = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(OrganizationByNameQuery, {
    variables: { name: router.query.organizationSlug },
  });

  const handleRefetch = async () => await refetch({ name: router.query.organizationSlug });

  if (loading) {
    return (
      <>
        <Head>
          <title>
            {router.query.organizationSlug ? `${router.query.organizationSlug} | Organization` : 'Organization'}
          </title>
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              organizationSlug={router.query.organizationSlug}
              organizationId={router.query.organizationId || ''}
            />
          </Breadcrumbs>
          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="manage" />

            <UsersWrapper>
              <UsersSkeleton title={'Administrators'} />
            </UsersWrapper>
          </OrganizationsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const organization = data.organization;

  const owners = organization.owners;

  return (
    <>
      <Head>
        <title>{`${organization.name} | Organization`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <OrganizationBreadcrumb organizationSlug={organization.name} organizationId={organization.id} />
        </Breadcrumbs>
        <OrganizationsWrapper>
          <OrgNavTabs activeTab="manage" organization={organization} />
          <UsersWrapper>
            <Manage
              refetch={handleRefetch}
              users={owners}
              organization={organization}
              organizationId={router.query.organizationSlug}
              organizationName={organization.name}
            />
          </UsersWrapper>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageManage);
