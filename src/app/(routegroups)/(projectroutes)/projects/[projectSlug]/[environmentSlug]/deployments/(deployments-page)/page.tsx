import DeploymentsPage from '@/components/pages/deployments/DeploymentsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWithDeployments from '@/lib/query/environmentWithDeployments';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { environmentSlug: string };
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
    problemsUi: boolean;
    factsUi: boolean;
  };
  deployments: Deployment[];
};

export interface DeploymentsData {
  environment: Environment;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.environmentSlug} | Deployments`,
  };
}

export default async function Deployments({ params: { environmentSlug } }: { params: { environmentSlug: string } }) {
  return (
    <PreloadQuery
      query={environmentWithDeployments}
      variables={{
        displayName: 'Deployments',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => <DeploymentsPage queryRef={queryRef as QueryRef<DeploymentsData>} />}
    </PreloadQuery>
  );
}
