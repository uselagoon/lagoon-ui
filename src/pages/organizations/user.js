import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';

import User from 'components/Organizations/User';
import UserSkeleton from 'components/Organizations/User/UserSkeleton';
import {UserWrapper} from 'components/Organizations/User/Styles';

import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import MainLayout from 'layouts/MainLayout';

import UserByEmail from 'lib/query/organizations/UserByEmail';
import OrganizationByIDQuery from 'lib/query/organizations/OrganizationByID';

import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays a user page
 */
export const PageUser = ({ router }) => {
  const { data: user, error: userError, loading: userLoading, refetch } = useQuery(UserByEmail, {
    variables: { email: router.query.userSlug},
  });

  const { data: organization, error: orgError, loading: orgLoading } = useQuery(OrganizationByIDQuery, {
    variables: { id: parseInt(router.query.organizationSlug, 10) },
  });

  const handleUserRefetch = async () =>
    await refetch({ name: router.query.userSlug, organization: parseInt(router.query.organizationSlug, 10) });

  if (userLoading || orgLoading) {
    return (
      <>
        <Head>
          <title>{`${router.query.groupName} | Group`}</title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              organizationSlug={router.query.organizationSlug}
              organizationName={router.query.organizationName || ''}
            />
          </Breadcrumbs>

          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="user" />
            <UserWrapper>
              <UserSkeleton/>
            </UserWrapper>
          </OrganizationsWrapper>
        </MainLayout>
      </>
    );
  }

  if (userError) {
    return <QueryError error={userError} />;
  }

  if (orgError) {
    return <QueryError error={orgError} />;
  }

  if (!organization) {
    return <OrganizationNotFound variables={{ name: router.query.organizationSlug }} />;
  }

  return (
    <>
      <Head>
        <title>{`${router && router.query.userSlug} | User`}</title>
      </Head>

      <MainLayout>
        <Breadcrumbs>
          <OrganizationBreadcrumb
            organizationSlug={router.query.organizationSlug}
            organizationName={organization.name}
          />
        </Breadcrumbs>

        <OrganizationsWrapper>
          {organization && (
            <OrgNavTabs activeTab="user" organization={organization?.organization} />
          )}
          <UserWrapper>
            <User
              organizationId={router.query.organizationSlug}
              organizationName={organization.name}
              organization={organization || []}
              user={user?.user || []}
              refetch={handleUserRefetch}
            />
          </UserWrapper>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageUser);
