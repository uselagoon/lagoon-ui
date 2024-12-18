import OrgProjectPage from '@/components/pages/organizations/project/OrgProjectPage';
import { PreloadQuery } from '@/lib/apolloClient';
import projectAndOrganizationByName from '@/lib/query/organizations/projectAndOrganizationByName';
import { QueryRef } from '@apollo/client';

import {
  OrgEmail,
  OrgGroup,
  OrgProject,
  OrgRocketChat,
  OrgTeams,
  OrgWebhook,
  SlackNotification,
} from '../../(organization-overview)/page';

type Props = {
  params: { organizationSlug: string; projectSlug: string };
};

type Organization = {
  id: number;
  name: string;
  description: string;
  friendlyName: string;
  quotaGroup: number;
  projects: OrgProject[];
  groups: OrgGroup[];
  slacks: SlackNotification[];
  rocketchats: OrgRocketChat[];
  teams: OrgTeams[];
  webhook: OrgWebhook[];
  emails: OrgEmail[];
};

export interface OrganizationProjectData {
  organization: Organization;
  project: {
    id: number;
    name: string;
    groups: OrgGroup[];
    notifications: { name: string; type: string }[];
  };
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.projectSlug} | Project`,
  };
}

export default async function Project({
  params: { organizationSlug, projectSlug },
}: {
  params: { organizationSlug: string; projectSlug: string };
}) {
  return (
    <PreloadQuery
      query={projectAndOrganizationByName}
      variables={{
        displayName: 'OrganizationProject',
        name: organizationSlug,
        project: projectSlug,
      }}
    >
      {queryRef => (
        <OrgProjectPage projectSlug={projectSlug} queryRef={queryRef as QueryRef<OrganizationProjectData>} />
      )}
    </PreloadQuery>
  );
}
