import OrgProjectsPage from '@/components/pages/organizations/projects/ProjectsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import organizationByNameProjects from '@/lib/query/organizations/organizationByName.projects';
import { QueryRef } from '@apollo/client';

import { DeployTarget, OrgProject } from '../../(organization-overview)/page';

type Props = {
  params: Promise<{ organizationSlug: string }>;
};

export type OrganizationProjectsData = {
  organization: {
    id: number;
    name: string;
    friendlyName: string;
    projects: OrgProject[];
    deployTargets: DeployTarget[];
  };
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.organizationSlug} | Organization`,
  };
}

export default async function Projects(props: { params: Promise<{ organizationSlug: string }> }) {
  const params = await props.params;

  const {
    organizationSlug
  } = params;

  return (
    <PreloadQuery
      query={organizationByNameProjects}
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
