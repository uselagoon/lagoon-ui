import { getClient } from '@/lib/apolloClient';
import projectDetailsQuery from '@/lib/query/projectDetailsQuery';

import DetailsPage from './details';

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
      <DetailsPage project={data.project} />
    </div>
  );
}
