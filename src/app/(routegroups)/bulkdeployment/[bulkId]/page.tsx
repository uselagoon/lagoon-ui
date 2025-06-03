import BulkDeploymentsPage from '@/components/pages/bulkDeployments/BulkDeploymentsPage';
import { getClient } from '@/lib/apolloClient';
import deploymensByBulkId from '@/lib/query/deploymensByBulkId';

export async function generateMetadata(props: { params: Promise<{ bulkId: string }> }) {
  const params = await props.params;
  return {
    title: `Bulk Deployment - ${params.bulkId}`,
  };
}

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
type Props = {
  params: Promise<{ bulkId: string }>;
};

export default async function BulkDeployments(props: Props) {
  const params = await props.params;
  const client = await getClient();

  const { data } = await client.query<BulkDeploymentsData>({
    query: deploymensByBulkId,
    variables: {
      bulkId: params.bulkId,
    },
  });

  return <BulkDeploymentsPage bulkDeployments={data.deploymentsByBulkId} />;
}
