import GroupPage from '@/components/pages/organizations/group/GroupPage';
import { PreloadQuery, getClient } from '@/lib/apolloClient';
import groupByNameAndOrganization from '@/lib/query/organizations/groupByNameAndOrganization';
import organizationByName from '@/lib/query/organizations/organizationByName';
import organizationIdByName from '@/lib/query/organizations/organizationIdByName';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { organizationSlug: string; groupSlug: string };
};

type OrgById = {
  organization: { id: number; name: string; friendlyName: string };
};

export type Organization = {
  id: number;
  name: string;
  friendlyName: string;
  description: string;
  quotaProject: number;
  quotaGroup: number;
  quotaNotification: number;
  quotaEnvironment: number;
  deployTargets: { id: number; name: string }[];
  projects: { id: number; name: string }[];
};

export type Group = {
  id: string;
  name: string;
  type: 'null' | 'project-default-group';
  projects: { id: number; name: string }[];
  members: {
    role: 'GUEST' | 'DEVELOPER' | 'REPORTER' | 'MAINTAINER' | 'OWNER';
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }[];
};

export interface OrganizationGroupData {
  organization: Organization;
  group: Group;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.groupSlug} | Group`,
  };
}

export default async function Group({
  params: { organizationSlug, groupSlug },
}: {
  params: { organizationSlug: string; groupSlug: string };
}) {
  const client = await getClient();

  const { data: organizationData } = await client.query<OrgById>({
    query: organizationIdByName,
    variables: { name: organizationSlug },
  });

  return (
    <PreloadQuery
      query={groupByNameAndOrganization}
      variables={{
        displayName: 'OrganizationGroup',
        name: groupSlug,
        organization: organizationData.organization.id,
      }}
    >
      {queryRef => <GroupPage queryRef={queryRef as QueryRef<OrganizationGroupData>} />}
    </PreloadQuery>
  );
}