import ProjectVariablesPage from '@/components/pages/projectVariables/ProjectVariablesPage';
import { PreloadQuery } from '@/lib/apolloClient';
import projectVariablesQuery from '@/lib/query/projectVariablesQuery';
import { QueryRef } from '@apollo/client';

export async function generateMetadata(props: { params: Promise<{ projectSlug: string }> }) {
  const params = await props.params;
  return {
    title: `${params.projectSlug} | Project`,
  };
}

export type EnvVariable = {
  id: number;
  name: string;
  scope: string;
  value?: string;
};

type Project = {
  id: number;
  name: string;
  productionEnvironment: string;
  standbyProductionEnvironment: string | null;
  productionRoutes: string | null;
  standbyRoutes: string | null;
  envVariables: EnvVariable[];
};
export interface ProjectEnvironmentsData {
  project: Project;
}

export default async function projectVariables(props: { params: Promise<{ projectSlug: string }> }) {
  const params = await props.params;

  const { projectSlug } = params;

  return (
    <PreloadQuery
      query={projectVariablesQuery}
      variables={{
        displayName: 'ProjectVariables',
        name: projectSlug,
      }}
    >
      {queryRef => (
        <ProjectVariablesPage projectName={projectSlug} queryRef={queryRef as QueryRef<ProjectEnvironmentsData>} />
      )}
    </PreloadQuery>
  );
}
