import UserPage from '@/components/pages/organizations/user/UserPage';
import { PreloadQuery, getClient } from '@/lib/apolloClient';
import organizationIdByName from '@/lib/query/organizations/organizationIdByName';
import userByEmailAndOrganization from '@/lib/query/organizations/userByEmailAndOrganization';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { organizationSlug: string; userSlug: string };
};

type OrgById = {
  organization: { id: number; name: string; friendlyName: string };
};

type UserGroups = {
  email: string;
  groupRoles: {
    id: string;
    name: string;
    role: 'GUEST' | 'DEVELOPER' | 'REPORTER' | 'MAINTAINER' | 'OWNER';
    groupType: 'project-default-group' | 'null';
  }[];
};

export interface OrganizationUserData {
  userByEmailAndOrganization: UserGroups;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.organizationSlug} | Organization`,
  };
}

export default async function User({
  params: { organizationSlug, userSlug },
}: {
  params: { organizationSlug: string; userSlug: string };
}) {
  const client = await getClient();

  const { data: organizationData } = await client.query<OrgById>({
    query: organizationIdByName,
    variables: { name: organizationSlug },
  });

  return (
    <PreloadQuery
      query={userByEmailAndOrganization}
      variables={{
        displayName: 'OrganizationUser',
        organization: organizationData.organization.id,
        email: decodeURIComponent(userSlug),
      }}
    >
      {queryRef => (
        <UserPage orgName={organizationData.organization.name} queryRef={queryRef as QueryRef<OrganizationUserData>} />
      )}
    </PreloadQuery>
  );
}
