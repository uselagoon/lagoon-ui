import Environment from '@/components/environment/Environment';
import { getClient } from '@/lib/apolloClient';
import environmentByOpenShiftProjectName from '@/lib/query/environmentByOpenShiftProjectName';

type Props = {
  params: { environmentSlug: string };
};
export type EnvironmentData = {
  environment: {
    id: number;
    name: string;
    created: string;
    updated: string;
    deployType: string;
    environmentType: string;
    routes: string;
    openshiftProjectName: string;
    project: {
      name: string;
      gitUrl: string;
      productionRoutes: string | null;
      standbyRoutes: string | null;
      productionEnvironment: string;
      standbyProductionEnvironment: string | null;
      problemsUi: number | null;
      factsUi: number | null;
    };
  };
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

  const { data } = await client.query<EnvironmentData>({
    query: environmentByOpenShiftProjectName,
    variables: {
      openshiftProjectName: environmentSlug,
    },
  });

  return <Environment environment={data.environment} />;
}
