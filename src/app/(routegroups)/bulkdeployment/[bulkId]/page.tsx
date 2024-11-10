import BulkDeploymentsPage from '@/components/bulkDeployments/BulkDeployments';
import { getClient } from '@/lib/apolloClient';
import deploymensByBulkId from '@/lib/query/deploymensByBulkId';

export type BulkDeployment = {
  id: number;
  name: string;
  status: string;
  created: string;
  buildStep: string | null;
  started: string | null;
  completed: string | null;
  bulkId: string;
  bulkName: string;
  priority: number | null;
  environment: {
    name: string;
    openshiftProjectName: string;
    project: {
      name: string;
    };
  };
};

export type BulkDeploymentsData = {
  deploymentsByBulkId: BulkDeployment[];
};

export default async function BulkDeployments() {
  const client = await getClient();

  const { data } = await client.query<BulkDeploymentsData>({ query: deploymensByBulkId });

  return <BulkDeploymentsPage bulkDeployments={data.deploymentsByBulkId} />;
}
