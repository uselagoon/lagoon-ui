import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import OrgNotifications from 'components/Organizations/Notifications';
import NotificationsSkeleton from 'components/Organizations/Notifications/NotificationsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import MainLayout from 'layouts/MainLayout';
import OrganizationNotificationsByNameQuery from 'lib/query/organizations/OrganizationByName';
import OrganizationNotificationsByIDQuery from 'lib/query/organizations/OrganizationNotificationsByID';

import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays the projects page, given the organization id
 */
export const PageOrgNotifications = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(OrganizationNotificationsByNameQuery, {
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
            <OrgNavTabsSkeleton activeTab="notifications" />
            <NotificationsSkeleton />
          </OrganizationsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return <QueryError error={error} />;
  }

  const organization = data.organization;

  if (!organization) {
    return <OrganizationNotFound variables={{ name: router.query.organizationSlug }} />;
  }

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
          <OrgNavTabs activeTab="notifications" organization={organization} />

          <OrgNotifications
            slacks={organization.slacks}
            emails={organization.emails}
            rocketchats={organization.rocketchats}
            teams={organization.teams}
            webhooks={organization.webhook}
            organizationId={organization.id}
            organizationName={organization.name}
            refresh={handleRefetch}
          />
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageOrgNotifications);
