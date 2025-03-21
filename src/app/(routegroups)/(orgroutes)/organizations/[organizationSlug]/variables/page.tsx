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
  params: { organizationSlug: string };
};
export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.organizationSlug} | Variables`,
  };
}

export default async function OrgVariables({ params: { organizationSlug } }: { params: { organizationSlug: string } }) {
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
