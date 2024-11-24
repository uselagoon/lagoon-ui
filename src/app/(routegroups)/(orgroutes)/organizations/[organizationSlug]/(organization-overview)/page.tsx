import OrganizationPage from '@/components/pages/organizations/organization/OrganizationPage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByName from '@/lib/query/organizations/organizationByName';
import { QueryRef } from '@apollo/client';

export type DeployTarget = {
  id: number;
  name: string;
  friendlyName: string | null;
  cloudProvider: string;
  cloudRegion: string;
};

export type OrgOwner = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  owner: true | null;
  admin: true | null;
};

export type OrgProject = {
  id: number;
  name: string;
  groupCount: number;
};

export type OrgGroup = {
  id: string;
  name: string;
  type: 'null' | 'project-default-group';
  memberCount: number;
};

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
  description: string;
  friendlyName: string;

  quotaProject: number;
  quotaGroup: number;
  quotaNotification: number;
  quotaEnvironment: number;

  deployTargets: DeployTarget[];
  owners: OrgOwner[];
  projects: OrgProject[];
  environments: { id: number }[];
  groups: OrgGroup[];
  slacks: SlackNotification[];
  rocketchats: OrgRocketChat[];
  teams: OrgTeams[];
  webhook: OrgWebhook[];
  emails: OrgEmail[];
};

export interface OrganizationData {
  organization: Organization;
}

type Props = {
  params: { organizationSlug: string };
};
export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.organizationSlug} | Organization`,
  };
}

export default async function OrgOverview({ params: { organizationSlug } }: { params: { organizationSlug: string } }) {
  return (
    <PreloadQuery
      query={organizationByName}
      variables={{
        displayName: 'Organization',
        name: organizationSlug,
      }}
    >
      {queryRef => <OrganizationPage orgSlug={organizationSlug} queryRef={queryRef as QueryRef<OrganizationData>} />}
    </PreloadQuery>
  );
}
