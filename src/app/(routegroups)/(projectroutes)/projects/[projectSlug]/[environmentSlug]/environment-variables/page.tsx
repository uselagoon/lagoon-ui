import EnvironmentVariablesPage from '@/components/pages/environmentVariables/EnvironmentVariablesPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentByOpenShiftProjectNameWithEnvVars from '@/lib/query/environmentByOpenShiftProjectNameWithEnvVars';
import { QueryRef } from '@apollo/client';

type Props = {
  params: Promise<{ environmentSlug: string }>;
};

export type EnvVariable = {
  id: number;
  name: string;
  scope: string;
  value?: string;
};

type Environment = {
  id: number;
  name: string;
  openshiftProjectName: string;
  project: {
    name: string;
    problemsUi: boolean;
    factsUi: boolean;
    envVariables: EnvVariable[];
  };
  envVariables: EnvVariable[];
};

export interface EnvVariablesData {
  environmentVars: Environment;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.environmentSlug} | Environment Variables`,
  };
}

export default async function EnvironmentVariables(props: {
  params: Promise<{ environmentSlug: string; projectSlug: string }>;
}) {
  const params = await props.params;

  const { environmentSlug, projectSlug } = params;

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
        <EnvironmentVariablesPage
          projectName={projectSlug}
          environmentName={environmentSlug}
          queryRef={queryRef as QueryRef<EnvVariablesData>}
        />
      )}
    </PreloadQuery>
  );
}
