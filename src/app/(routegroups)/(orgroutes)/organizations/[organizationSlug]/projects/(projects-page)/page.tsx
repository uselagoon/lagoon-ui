import OrgProjectsPage from '@/components/pages/organizations/projects/ProjectsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByName from '@/lib/query/organizations/organizationByName';
import { QueryRef } from '@apollo/client';

import { DeployTarget, OrgProject } from '../../(organization-overview)/page';

type Props = {
  params: { organizationSlug: string };
};

export type OrganizationProjectsData = {
  organization: {
    id: number;
    name: string;
    description: string;
    friendlyName: string;
    projects: OrgProject[];
    deployTargets: DeployTarget[];
  };
};

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.organizationSlug} | Organization`,
  };
}

export default async function Projects({ params: { organizationSlug } }: { params: { organizationSlug: string } }) {
  return (
    <PreloadQuery
      query={organizationByName}
      variables={{
        displayName: 'OrganizationProjects',
        name: organizationSlug,
      }}
    >
      {queryRef => (
        <OrgProjectsPage
          organizationSlug={organizationSlug}
          queryRef={queryRef as QueryRef<OrganizationProjectsData>}
        />
      )}
    </PreloadQuery>
  );
}
