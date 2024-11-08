'use client';

import { BulkDeployment } from '@/app/(routegroups)/bulkdeployment/[bulkId]/page';
import { Head2, Table } from '@uselagoon/ui-library';

import CancelDeployment from '../deployments/_components/CancelDeployment';

const { BulkDeploymentsTable } = Table;

export default function BulkDeploymentsPage({ bulkDeployments }: { bulkDeployments: BulkDeployment[] }) {
  return (
    <>
      <Head2>{bulkDeployments[0].bulkName}</Head2>
      <BulkDeploymentsTable
        deployments={bulkDeployments}
        cancelDeployment={(deployment: any) => <CancelDeployment deployment={deployment} />}
      />
    </>
  );
}
