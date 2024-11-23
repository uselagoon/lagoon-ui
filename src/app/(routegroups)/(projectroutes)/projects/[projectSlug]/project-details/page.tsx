import ProjectDetailsPage from '@/components/pages/projectDetails/projectDetailsPage';
import { getClient } from '@/lib/apolloClient';
import projectDetailsQuery from '@/lib/query/projectDetailsQuery';

type ProjectWithDetails = {
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
  environments: {
    environmentType: 'production' | 'development';
  }[];
};

export type ProjectDetailsData = {
  project: ProjectWithDetails;
};

export default async function projectDetails({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  const client = await getClient();

  const { data } = await client.query<ProjectDetailsData>({
    query: projectDetailsQuery,
    variables: {
      name: projectSlug,
    },
  });

  return (
    <div>
      <ProjectDetailsPage project={data.project} />
    </div>
  );
}
