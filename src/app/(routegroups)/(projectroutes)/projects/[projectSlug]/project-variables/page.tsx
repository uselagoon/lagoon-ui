import ProjectVariablesPage from '@/components/projectVariables/ProjectVariables';
import { getClient } from '@/lib/apolloClient';
import projectVariablesQuery from '@/lib/query/projectVariablesQuery';

export default async function projectVariables({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  const client = await getClient();

  const { data } = await client.query({
    query: projectVariablesQuery,
    variables: {
      name: projectSlug,
    },
  });

  return (
    <div>
      <ProjectVariablesPage variables={data.project.envVariables} />
    </div>
  );
}
