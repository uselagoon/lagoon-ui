import ManagePage from '@/components/pages/organizations/manage/ManagePage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByName from '@/lib/query/organizations/organizationByName';
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
  description: string;
  friendlyName: string;
  owners: OrgOwner[];
};

export interface OrganizationManageData {
  organization: Organization;
}

type Props = {
  params: { organizationSlug: string };
};
export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.organizationSlug} | Manage`,
  };
}

export default async function OrgManage({ params: { organizationSlug } }: { params: { organizationSlug: string } }) {
  return (
    <PreloadQuery
      query={organizationByName}
      variables={{
        displayName: 'OrganizationManage',
        name: organizationSlug,
      }}
    >
      {queryRef => <ManagePage queryRef={queryRef as QueryRef<OrganizationManageData>} />}
    </PreloadQuery>
  );
}
