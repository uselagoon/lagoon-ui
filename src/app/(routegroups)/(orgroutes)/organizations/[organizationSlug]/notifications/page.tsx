import NotificationsPage from '@/components/pages/organizations/notifications/NotificationsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByNameNotification from '@/lib/query/organizations/organizationByName.notification';
import { QueryRef } from '@apollo/client';

export type SlackNotification = {
  webhook: string;
  name: string;
  channel: string;
};

export type OrgWebhook = {
  webhook: string;
  name: string;
};

export type OrgEmail = {
  name: string;
  emailAddress: string;
};
export type OrgRocketChat = {
  name: string;
  webhook: string;
  channel: string;
};

export type OrgTeams = {
  name: string;
  webhook: string;
  channel: string;
};

type Organization = {
  id: number;
  name: string;
  slacks: SlackNotification[];
  rocketchats: OrgRocketChat[];
  teams: OrgTeams[];
  webhook: OrgWebhook[];
  emails: OrgEmail[];
};

export interface OrganizationNotificationData {
  organization: Organization;
}

type Props = {
  params: Promise<{ organizationSlug: string }>;
};
export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.organizationSlug} | Notifications`,
  };
}

export default async function OrgNotifications(props: { params: Promise<{ organizationSlug: string }> }) {
  const params = await props.params;

  const { organizationSlug } = params;

  return (
    <PreloadQuery
      query={organizationByNameNotification}
      variables={{
        displayName: 'OrganizationNotifications',
        name: organizationSlug,
      }}
    >
      {queryRef => (
        <NotificationsPage
          organizationSlug={organizationSlug}
          queryRef={queryRef as QueryRef<OrganizationNotificationData>}
        />
      )}
    </PreloadQuery>
  );
}
