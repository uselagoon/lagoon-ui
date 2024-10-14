import Environment from '@/components/environment/Environment';
import { getClient } from '@/lib/apolloClient';
import environmentByOpenShiftProjectName from '@/lib/query/environmentByOpenShiftProjectName';

type Props = {
  params: { environmentSlug: string };
};
export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.environmentSlug} | Environment`,
  };
}

export default async function EnvironmentPage({
  params: { environmentSlug },
}: {
  params: { environmentSlug: string };
}) {
  const client = await getClient();

  const { data } = await client.query({
    query: environmentByOpenShiftProjectName,
    variables: {
      openshiftProjectName: environmentSlug,
    },
  });

  return <Environment environment={data.environment} />;
}
