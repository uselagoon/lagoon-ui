import ManagePage from '@/components/pages/organizations/manage/ManagePage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByNameManage from '@/lib/query/organizations/organizationByName.manage';
import { QueryRef } from '@apollo/client';

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
  owners: OrgOwner[];
};

export interface OrganizationManageData {
  organization: Organization;
}

type Props = {
  params: Promise<{ organizationSlug: string }>;
};
export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.organizationSlug} | Manage`,
  };
}

export default async function OrgManage(props: { params: Promise<{ organizationSlug: string }> }) {
  const params = await props.params;

  const { organizationSlug } = params;

  return (
    <PreloadQuery
      query={organizationByNameManage}
      variables={{
        displayName: 'OrganizationManage',
        name: organizationSlug,
      }}
    >
      {queryRef => (
        <ManagePage organizationSlug={organizationSlug} queryRef={queryRef as QueryRef<OrganizationManageData>} />
      )}
    </PreloadQuery>
  );
}
