import ProjectEnvironments from '@/components/environments/Environments';
import { getClient } from '@/lib/apolloClient';
import projectEnvironmentsQuery from '@/lib/query/projectEnvironmentsQuery';

type Props = {
  params: { projectSlug: string };
};
export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.projectSlug} | Project`,
  };
}

export default async function projectEnvironments({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  const client = await getClient();

  const { data } = await client.query({
    query: projectEnvironmentsQuery,
    variables: {
      name: projectSlug,
    },
  });

  return (
    <ProjectEnvironments
      productionEnvironment={data.project.productionEnvironment}
      environments={data.project.environments}
      projectName={projectSlug}
    />
  );
}
