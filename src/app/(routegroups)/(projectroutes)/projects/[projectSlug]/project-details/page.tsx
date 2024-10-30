import ProjectDetails from '@/components/projectDetails/projectDetails';
import { getClient } from '@/lib/apolloClient';
import projectDetailsQuery from '@/lib/query/projectDetailsQuery';

export default async function projectDetails({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  const client = await getClient();

  const { data } = await client.query({
    query: projectDetailsQuery,
    variables: {
      name: projectSlug,
    },
  });

  return (
    <div>
      <ProjectDetails project={data.project} />
    </div>
  );
}
