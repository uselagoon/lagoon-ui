import OrganizationNotFound from '@/components/errors/OrganizationNotFound';
import UsersPage from '@/components/pages/organizations/users/UsersPage';
import { PreloadQuery, getClient } from '@/lib/apolloClient';
import organizationIdByName from '@/lib/query/organizations/organizationIdByName';
import usersByOrganization from '@/lib/query/organizations/usersByOrganization';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { organizationSlug: string };
};

type OrgById = {
  organization: { id: number; name: string; friendlyName: string; groups: { name: string }[] };
};

type User = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  groupRoles: {
    id: string;
    role: string;
  }[];
};

export interface OrganizationUsersData {
  users: User[];
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.organizationSlug} | Organization`,
  };
}

export default async function Users({ params: { organizationSlug } }: { params: { organizationSlug: string } }) {
  const client = await getClient();

  const { data: organizationData } = await client.query<OrgById>({
    query: organizationIdByName,
    variables: { name: organizationSlug },
  });

  if (!organizationData.organization) {
    return <OrganizationNotFound orgName={organizationSlug} />;
  }

  return (
    <PreloadQuery
      query={usersByOrganization}
      variables={{
        displayName: 'OrganizationUsers',
        id: organizationData.organization.id,
      }}
    >
      {queryRef => (
        <UsersPage
          orgId={organizationData.organization.id}
          groups={organizationData.organization.groups}
          queryRef={queryRef as QueryRef<OrganizationUsersData>}
        />
      )}
    </PreloadQuery>
  );
}
