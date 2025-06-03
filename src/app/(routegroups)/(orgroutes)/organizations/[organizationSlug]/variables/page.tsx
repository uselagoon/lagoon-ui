import OrgVariablesPage from '@/components/pages/organizations/variables/VariablesPage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByNameWithEnvVars from '@/lib/query/organizations/organizationByNameWithEnvVars';
import { QueryRef } from '@apollo/client';

export type OrgEnvVariable = {
  id: number;
  name: string;
  scope: string;
  value?: string;
};

type Organization = {
  id: number;
  name: string;
  envVariables: OrgEnvVariable[];
};

export interface OrganizationVariablesData {
  organization: Organization;
}

type Props = {
  params: Promise<{ organizationSlug: string }>;
};
export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.organizationSlug} | Variables`,
  };
}

export default async function OrgVariables(props: { params: Promise<{ organizationSlug: string }> }) {
  const params = await props.params;

  const { organizationSlug } = params;

  return (
    <PreloadQuery
      query={organizationByNameWithEnvVars}
      variables={{
        displayName: 'OrganizationVariables',
        name: organizationSlug,
      }}
    >
      {queryRef => (
        <OrgVariablesPage
          organizationSlug={organizationSlug}
          queryRef={queryRef as QueryRef<OrganizationVariablesData>}
        />
      )}
    </PreloadQuery>
  );
}
