import ProjectEnvironmentsPage from '@/components/pages/environments/ProjectEnvironmentsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import projectEnvironmentsQuery from '@/lib/query/projectEnvironmentsQuery';
import { QueryRef } from '@apollo/client';

import { Deployment } from '../[environmentSlug]/deployments/(deployments-page)/page';
import { Problem } from '../[environmentSlug]/problems/page';

export type ProjectEnvironment = {
  id: number;
  name: string;
  deployType: string;
  environmentType: string;
  deployBaseRef: string;
  deployHeadRef: string;
  deployTitle: string;
  updated: string | null;
  routes: null | string;
  openshiftProjectName: string;
  openshift: { friendlyName: null | string; cloudRegion: null | string };
  project: {
    name: string;
    problemsUi: number;
    factsUi: number;
  };
  problems: Problem[];
  deployments: Deployment[];
};

type Project = {
  id: number;
  name: string;
  productionEnvironment: string;
  standbyProductionEnvironment: null | string;
  productionRoutes: null | string;
  standbyRoutes: null | string;
  environments: ProjectEnvironment[];
};

export interface ProjectData {
  project: Project;
}

type Props = {
  params: Promise<{ projectSlug: string }>;
};
export async function generateMetadata(props: Props) {
  const params = await props.params;

  return {
    title: `${params.projectSlug} | Project`,
  };
}

export default async function projectEnvironments(props: { params: Promise<{ projectSlug: string }> }) {
  const params = await props.params;

  const { projectSlug } = params;
  return (
    <PreloadQuery
      query={projectEnvironmentsQuery}
      variables={{
        displayName: 'Environments',
        name: projectSlug,
      }}
    >
      {queryRef => <ProjectEnvironmentsPage projectName={projectSlug} queryRef={queryRef as QueryRef<ProjectData>} />}
    </PreloadQuery>
  );
}
