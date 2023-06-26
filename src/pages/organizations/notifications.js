import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import AddEmailNotification from 'components/Organizations/AddNotifications/Email';
import AddMicrosoftTeamsNotification from 'components/Organizations/AddNotifications/MicrosoftTeams';
import AddRocketChatNotification from 'components/Organizations/AddNotifications/RocketChat';
import AddSlackNotification from 'components/Organizations/AddNotifications/Slack';
import AddWebhookNotification from 'components/Organizations/AddNotifications/Webhook';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import OrgNotifications from 'components/Organizations/Notifications';
import NotificationsSkeleton from 'components/Organizations/Notifications/NotificationsSkeleton';
import { NotificationsWrapper } from 'components/Organizations/Notifications/Styles';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import MainLayout from 'layouts/MainLayout';
import OrganizationNotificationsByIDQuery from 'lib/query/organizations/OrganizationNotificationsByID';

import OrganizationNotFound from '../../components/errors/OrganizationNotFound';
import QueryError from '../../components/errors/QueryError';

/**
 * Displays the projects page, given the organization id
 */
export const PageOrgNotifications = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(OrganizationNotificationsByIDQuery, {
    variables: { id: parseInt(router.query.organizationSlug, 10) },
  });

  const handleRefetch = async () => await refetch({ id: parseInt(router.query.organizationSlug, 10) });

  if (loading) {
    return (
      <>
        <Head>
          <title>
            {router.query.organizationName ? `${router.query.organizationName} | Organization` : 'Organization'}
          </title>
        </Head>

        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              organizationSlug={router.query.organizationSlug}
              organizationName={router.query.organizationName || ''}
            />
          </Breadcrumbs>

          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="notifications" />

            <NotificationsWrapper>
              <div className="details">
                <div className="field-wrapper environmentType">
                  <AddSlackNotification organizationId={router.query.organizationSlug} />
                </div>
                <div className="field-wrapper environmentType">
                  <AddRocketChatNotification organizationId={router.query.organizationSlug} />
                </div>
                <div className="field-wrapper environmentType">
                  <AddEmailNotification organizationId={router.query.organizationSlug} />
                </div>
                <div className="field-wrapper environmentType">
                  <AddMicrosoftTeamsNotification organizationId={router.query.organizationSlug} />
                </div>
                <div className="field-wrapper environmentType">
                  <AddWebhookNotification organizationId={router.query.organizationSlug} />
                </div>
              </div>
              <NotificationsSkeleton />
            </NotificationsWrapper>
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
          <OrganizationBreadcrumb organizationSlug={organization.id} organizationName={organization.name} />
        </Breadcrumbs>
        <OrganizationsWrapper>
          <OrgNavTabs activeTab="notifications" organization={organization} />

          <NotificationsWrapper>
            <div className="details">
              <div className="field-wrapper environmentType">
                <AddSlackNotification organizationId={organization.id} refresh={handleRefetch} />
              </div>
              <div className="field-wrapper environmentType">
                <AddRocketChatNotification organizationId={organization.id} refresh={handleRefetch} />
              </div>
              <div className="field-wrapper environmentType">
                <AddEmailNotification organizationId={organization.id} refresh={handleRefetch} />
              </div>
              <div className="field-wrapper environmentType">
                <AddMicrosoftTeamsNotification organizationId={organization.id} refresh={handleRefetch} />
              </div>
              <div className="field-wrapper environmentType">
                <AddWebhookNotification organizationId={organization.id} refresh={handleRefetch} />
              </div>
            </div>

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
          </NotificationsWrapper>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageOrgNotifications);
