import DeploymentPage from '@/components/pages/deployment/DeploymentPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWithDeployment from '@/lib/query/environmentWithDeployment';
import { QueryRef } from '@apollo/client';

type Props = {
  params: Promise<{ environmentSlug: string; projectSlug: string; deploymentSlug: string }>;
};

export type Deployment = {
  id: number;
  name: string;
  status: 'running' | 'complete' | 'failed' | 'error' | 'queued' | 'new' | 'cancelled';
  created: string;
  buildStep?: string | null;
  started: string | null;
  completed: string | null;
  buildLog: string;
  bulkId?: string | null;
  priority: number | null;
  trigger?: 'API';
};

type Environment = {
  openshiftProjectName: string;
  project: {
    name: string;
    problemsUi: boolean;
    factsUi: boolean;
  };
  deployments: Deployment[];
};

export interface DeploymentData {
  environment: Environment;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.deploymentSlug} | Deployment`,
  };
}

export default async function Deployment(props: {
  params: Promise<{ environmentSlug: string; projectSlug: string; deploymentSlug: string }>;
}) {
  const params = await props.params;

  const { environmentSlug, projectSlug, deploymentSlug } = params;

  return (
    <PreloadQuery
      query={environmentWithDeployment}
      variables={{
        displayName: 'Deployment',
        openshiftProjectName: environmentSlug,
        deploymentName: deploymentSlug,
      }}
    >
      {queryRef => <DeploymentPage deploymentName={deploymentSlug} queryRef={queryRef as QueryRef<DeploymentData>} />}
    </PreloadQuery>
  );
}
