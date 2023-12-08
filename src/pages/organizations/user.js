import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import UserBreadcrumb from 'components/Breadcrumbs/Organizations/User';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import User from 'components/Organizations/User';
import { UserWrapper } from 'components/Organizations/User/Styles';
import UserSkeleton from 'components/Organizations/User/UserSkeleton';
import MainLayout from 'layouts/MainLayout';
import OrganizationByNameQuery from 'lib/query/organizations/OrganizationByName';
import UserByEmailAndOrganization from 'lib/query/organizations/UserByEmailAndOrganization';

import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays a user page
 */
export const PageUser = ({ router }) => {
  const {
    data: organization,
    error: orgError,
    loading: orgLoading,
  } = useQuery(OrganizationByNameQuery, {
    variables: { name: router.query.organizationSlug },
    onCompleted: ({ organization }) => {
      if (organization) {
        getUserByEmailAndOrg({
          variables: { email: router.query.userSlug, organization: organization.id },
        });
      }
    },
  });

  const [getUserByEmailAndOrg, { data: user, error: userError, loading: userLoading, refetch }] =
    useLazyQuery(UserByEmailAndOrganization);

  const handleUserRefetch = async () =>
    await refetch({ name: router.query.userSlug, organization: organization.organization.id });

  if (userLoading || orgLoading || !organization || !user) {
    return (
      <>
        <Head>
          <title>{`${router.query.userSlug} | User`}</title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              organizationSlug={router.query.organizationSlug}
              organizationId={router.query.organizationId || ''}
            />
            <UserBreadcrumb
              userSlug={router.query.userSlug || ''}
              loading
              organizationSlug={router.query.organizationSlug}
              organizationId={router.query.organizationId || ''}
            />
          </Breadcrumbs>

          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="users" />
            <UserWrapper>
              <UserSkeleton />
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

  const orgGroups = organization.organization.groups;
  const userGroupRoles = user?.userByEmailAndOrganization?.groupRoles;

  orgGroups.length &&
    Array.isArray(userGroupRoles) &&
    userGroupRoles.forEach((groupRole, idx, selfArr) => {
      const found = orgGroups.find(group => {
        return group.id == groupRole.id;
      });

      if (found) selfArr[idx].type = found.type;
    });

  return (
    <>
      <Head>
        <title>{`${router.query.userSlug} | User`}</title>
      </Head>

      <MainLayout>
        <Breadcrumbs>
          <OrganizationBreadcrumb
            organizationSlug={router.query.organizationSlug || organization.name}
            organizationId={organization.organization.id}
          />

          <UserBreadcrumb
            userSlug={router.query.userSlug}
            organizationSlug={router.query.organizationSlug || organization.name}
            organizationId={organization.organization.id}
          />
        </Breadcrumbs>
        <OrganizationsWrapper>
          {organization && <OrgNavTabs activeTab="users" organization={organization?.organization} />}
          <UserWrapper>
            <User
              organizationId={organization.organization.id}
              organizationName={organization.organization.name}
              organization={organization.organization || []}
              user={user.userByEmailAndOrganization || []}
              refetch={handleUserRefetch}
            />
          </UserWrapper>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageUser);
