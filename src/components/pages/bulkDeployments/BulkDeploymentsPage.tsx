'use client';

import { BulkDeployment } from '@/app/(routegroups)/bulkdeployment/[bulkId]/page';
import { CopyToClipboard, Table } from '@uselagoon/ui-library';

import CancelDeployment from '../../cancelDeployment/CancelDeployment';
import { HeaderWithCopy } from './styles';

const { BulkDeploymentsTable } = Table;

export default function BulkDeploymentsPage({ bulkDeployments }: { bulkDeployments: BulkDeployment[] }) {
  const bulkName = bulkDeployments[0].bulkName;
  return (
    <>
      <HeaderWithCopy>
        {bulkName} <CopyToClipboard text={bulkName} iconOnly />
      </HeaderWithCopy>
      <BulkDeploymentsTable
        deployments={bulkDeployments}
        cancelDeployment={(deployment: any) => <CancelDeployment deployment={deployment} />}
      />
    </>
  );
}
