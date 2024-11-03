import ProjectEnvironments from '@/components/environments/Environments';
import { PreloadQuery } from '@/lib/apolloClient';
import projectEnvironmentsQuery from '@/lib/query/projectEnvironmentsQuery';
import { QueryRef } from '@apollo/client';

import { Problem } from '../[environmentSlug]/problems/page';

type ProjectEnvironment = {
  id: number;
  name: string;
  deployType: string;
  environmentType: string;
  routes: null | string;
  openshiftProjectName: string;
  openshift: { friendlyName: null | string; cloudRegion: null | string };
  problems: Problem[];
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
  params: { projectSlug: string };
};
export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.projectSlug} | Project`,
  };
}

export default async function projectEnvironments({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  return (
    <PreloadQuery
      query={projectEnvironmentsQuery}
      variables={{
        displayName: 'Environments',
        name: projectSlug,
      }}
    >
      {queryRef => <ProjectEnvironments projectName={projectSlug} queryRef={queryRef as QueryRef<ProjectData>} />}
    </PreloadQuery>
  );
}
