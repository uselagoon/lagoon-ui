import OrganizationsPage from '@/components/pages/organizations/OrganizationsPage';
import { getClient } from '@/lib/apolloClient';
import allOrganizationsQuery from '@/lib/query/organizations/allOrganizationsQuery';

export type OrgType = {
  id: number;
  name: string;
  description: string | null;
  friendlyName: string | null;
  quotaProject: number;
  quotaGroup: number;
  groups: { id: string }[];
  projects: { id: number }[];
  deployTargets: { id: number; name: string }[];
};
export type OrgsData = {
  allOrganizations: OrgType[];
};

export default async function Organizations() {
  const client = await getClient();

  const { data } = await client.query<OrgsData>({ query: allOrganizationsQuery });

  return <OrganizationsPage organizations={data.allOrganizations} />;
}