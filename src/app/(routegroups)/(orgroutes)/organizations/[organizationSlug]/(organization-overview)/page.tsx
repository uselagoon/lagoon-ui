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
  groupCount?: number;
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
  __typename: string;
};

export type OrgWebhook = {
  webhook: string;
  name: string;
  __typename: string;
};

export type OrgEmail = {
  name: string;
  emailAddress: string;
  __typename: string;
};
export type OrgRocketChat = {
  name: string;
  webhook: string;
  channel: string;
  __typename: string;
};

export type OrgTeams = {
  name: string;
  webhook: string;
  channel: string;
  __typename: string;
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
  params: Promise<{ organizationSlug: string }>;
};
export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.organizationSlug} | Organization`,
  };
}

export default async function OrgOverview(props: { params: Promise<{ organizationSlug: string }> }) {
  const params = await props.params;

  const { organizationSlug } = params;

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
