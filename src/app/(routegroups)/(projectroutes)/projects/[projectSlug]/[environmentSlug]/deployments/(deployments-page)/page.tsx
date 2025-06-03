import DeploymentsPage from '@/components/pages/deployments/DeploymentsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWithDeployments from '@/lib/query/environmentWithDeployments';
import { QueryRef } from '@apollo/client';

type Props = {
  params: Promise<{ environmentSlug: string }>;
};

export type Deployment = {
  id: number;
  name: string;
  status: 'running' | 'complete' | 'failed' | 'error' | 'queued' | 'new' | 'cancelled';
  created: string;
  started: string | null;
  completed: string | null;
  environment?: {
    name: string;
    openshiftProjectName: string;
    openshift: {
      id: number;
      name: string;
    };
    project: {
      id: number;
      name: string;
    };
  };

  bulkId?: string | null;
  priority: number | null;
  sourceType: 'API' | 'WEBHOOK';
  buildStep?: string | null;
};

type Environment = {
  id: number;
  name: string;
  openshiftProjectName: string;
  deployType: string;
  deployBaseRef: string;
  deployHeadRef: string;
  deployTitle: string;
  project: {
    name: string;
    problemsUi: number;
    factsUi: number;
  };
  deployments: Deployment[];
};

export interface DeploymentsData {
  environment: Environment;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.environmentSlug} | Deployments`,
  };
}

export default async function Deployments(props: { params: Promise<{ environmentSlug: string }> }) {
  const params = await props.params;

  const {
    environmentSlug
  } = params;

  return (
    <PreloadQuery
      query={environmentWithDeployments}
      variables={{
        displayName: 'Deployments',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => (
        <DeploymentsPage environmentSlug={environmentSlug} queryRef={queryRef as QueryRef<DeploymentsData>} />
      )}
    </PreloadQuery>
  );
}
