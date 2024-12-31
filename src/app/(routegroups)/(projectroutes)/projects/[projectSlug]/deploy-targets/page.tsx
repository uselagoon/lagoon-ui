import ProjectNotFound from '@/components/errors/ProjectNotFound';
import ProjectDeployTargetsPage from '@/components/pages/projectDeployTargets/projectDeployTargetsPage';
import { getClient } from '@/lib/apolloClient';
import projectByNameQuery from '@/lib/query/projectByNameQuery';

export async function generateMetadata({ params }: { params: { projectSlug: string } }) {
  return {
    title: `${params.projectSlug} | Project`,
  };
}

type ProjectWithDeployTargets = {
  id: number;
  name: string;
  branches: string;
  pullrequests: boolean;
  created: string;
  gitUrl: string;
  productionEnvironment: string;
  standbyProductionEnvironment: null | string;
  productionRoutes: null | string;
  standbyRoutes: null | string;
  developmentEnvironmentsLimit: number;
  deployTargetConfigs: {
    id: number;
    branches: string;
    pullrequests: string;
    deployTarget: {
      id: number;
      name: string;
      friendlyName: string;
    };
  }[];
  environments: {
    environmentType: 'production' | 'development';
  }[];
};

export type ProjectDeployTargetsData = {
  project: ProjectWithDeployTargets;
};

export default async function projectDeployTargets({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  const client = await getClient();

  const { data } = await client.query<ProjectDeployTargetsData>({
    query: projectByNameQuery,
    variables: {
      name: projectSlug,
    },
  });

  if (!data.project) {
    return <ProjectNotFound projectName={projectSlug} />;
  }

  return (
    <div>
      <ProjectDeployTargetsPage project={data.project} />
    </div>
  );
}
