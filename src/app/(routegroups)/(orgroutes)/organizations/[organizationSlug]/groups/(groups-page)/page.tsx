import GroupsPage from '@/components/pages/organizations/groups/GroupsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByNameGroups from '@/lib/query/organizations/organizationByName.groups';
import { QueryRef } from '@apollo/client';

type Props = {
  params: Promise<{ organizationSlug: string }>;
};

export type OrgGroup = {
  id: string;
  memberCount?: number;
  name: string;
  type: 'null' | 'project-default-group';
};

type Organization = {
  id: number;
  name: string;
  groups: OrgGroup[];
  friendlyName?: string;
};

export interface OrganizationGroupsData {
  organization: Organization;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.organizationSlug} | Organization`,
  };
}

export default async function Groups(props: { params: Promise<{ organizationSlug: string }> }) {
  const params = await props.params;

  const { organizationSlug } = params;

  return (
    <PreloadQuery
      query={organizationByNameGroups}
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
