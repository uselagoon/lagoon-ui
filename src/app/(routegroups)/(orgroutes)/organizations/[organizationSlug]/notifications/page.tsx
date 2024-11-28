import NotificationsPage from '@/components/pages/organizations/notifications/NotificationsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByName from '@/lib/query/organizations/organizationByName';
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

export type OrgOwner = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  owner: true | null;
  admin: true | null;
  groupRoles: null | { id: string }[];
};

type Organization = {
  id: number;
  name: string;
  description: string;
  friendlyName: string;
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
  params: { organizationSlug: string };
};
export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.organizationSlug} | Notifications`,
  };
}

export default async function OrgNotifications({
  params: { organizationSlug },
}: {
  params: { organizationSlug: string };
}) {
  return (
    <PreloadQuery
      query={organizationByName}
      variables={{
        displayName: 'OrganizationNotifications',
        name: organizationSlug,
      }}
    >
      {queryRef => <NotificationsPage queryRef={queryRef as QueryRef<OrganizationNotificationData>} />}
    </PreloadQuery>
  );
}
