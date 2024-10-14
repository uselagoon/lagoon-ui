import { default as OrganizationsPage } from '@/components/organizations/Organizations';
import { getClient } from '@/lib/apolloClient';
import allOrganizationsQuery from '@/lib/query/allOrganizationsQuery';

export default async function Organizations() {
  const client = await getClient();

  const { data } = await client.query({ query: allOrganizationsQuery });

  return <OrganizationsPage organizations={data.allOrganizations} />;
}
