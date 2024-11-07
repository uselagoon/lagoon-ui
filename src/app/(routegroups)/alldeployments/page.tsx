import AllDeploymentsPage from '@/components/allDeployments/AllDeployments';
import { getClient } from '@/lib/apolloClient';
import deploymentsByFilter from '@/lib/query/deploymentsByFilter';

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
	priority: number | null;
	buildStep?: string | null;
};

export type AllDeploymentsData = {
    deploymentsByFilter: Deployment[]
}

export default async function AllDeployments() {
  const client = await getClient();

  const { data } = await client.query<AllDeploymentsData>({ query: deploymentsByFilter });

  return <AllDeploymentsPage deployments={data.deploymentsByFilter} />;
}
