import EnvironmentVariablesPage from '@/components/environmentVariables/EnvironmentVariables';
import Insights from '@/components/insights/Insights';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentByOpenShiftProjectNameWithEnvVars from '@/lib/query/environmentByOpenShiftProjectNameWithEnvVars';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { environmentSlug: string };
};

export type EnvVariable = {
  created: string;
  downloadUrl: string;
  file: string;
  fileId: number | null;
  id: number;
  service: string;
  size: string;
  type: string;
};

type Environment = {
  id: number;
  openshiftProjectName: string;
  project: {
    name: string;
    problemsUi: boolean;
    factsUi: boolean;
  };
  envVariables: EnvVariable[];
};

export interface EnvVariablesData {
  environmentVars: Environment;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.environmentSlug} | Variables`,
  };
}

export default async function EnvironmentVariables({
  params: { environmentSlug },
}: {
  params: { environmentSlug: string };
}) {
  return (
    <PreloadQuery
      query={environmentByOpenShiftProjectNameWithEnvVars}
      variables={{
        displayName: 'Variables',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => (
        <EnvironmentVariablesPage environmentName={environmentSlug} queryRef={queryRef as QueryRef<EnvVariablesData>} />
      )}
    </PreloadQuery>
  );
}
