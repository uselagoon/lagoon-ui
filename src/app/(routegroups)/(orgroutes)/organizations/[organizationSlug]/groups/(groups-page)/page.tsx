import GroupsPage from '@/components/pages/organizations/groups/GroupsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByName from '@/lib/query/organizations/organizationByName';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { organizationSlug: string };
};

export type OrgGroup = {
  id: string;
  memberCount: number;
  name: string;
  type: 'null' | 'project-default-group';
};

type Organization = {
  id: number;
  name: string;

  quotaEnvironment: number;
  quotaGroup: number;
  quotaNotification: number;
  quotaProject: number;
  groups: OrgGroup[];
};

export interface OrganizationGroupsData {
  organization: Organization;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.organizationSlug} | Organization`,
  };
}

export default async function Groups({ params: { organizationSlug } }: { params: { organizationSlug: string } }) {
  return (
    <PreloadQuery
      query={organizationByName}
      variables={{
        displayName: 'Organization',
        name: organizationSlug,
        limit: null,
      }}
    >
      {queryRef => (
        <GroupsPage organizationSlug={organizationSlug} queryRef={queryRef as QueryRef<OrganizationGroupsData>} />
      )}
    </PreloadQuery>
  );
}
