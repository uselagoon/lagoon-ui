import EnvironmentPage from '@/components/pages/environment/EnvironmentPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentByOpenShiftProjectName from '@/lib/query/environmentByOpenShiftProjectName';
import { QueryRef } from '@apollo/client';

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

export default async function Environment({ params: { environmentSlug } }: { params: { environmentSlug: string } }) {
  return (
    <PreloadQuery
      query={environmentByOpenShiftProjectName}
      variables={{
        displayName: 'Environment',
        openshiftProjectName: environmentSlug,
      }}
    >
      {queryRef => <EnvironmentPage queryRef={queryRef as QueryRef<EnvironmentData>} />}
    </PreloadQuery>
  );
}
