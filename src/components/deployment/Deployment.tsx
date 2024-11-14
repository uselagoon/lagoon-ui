'use client';

import { startTransition, useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { DeploymentData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/deployments/[deploymentSlug]/page';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Table } from '@uselagoon/ui-library';

import LogViewer from '../logViewer/LogViewer';

const { DeploymentTable } = Table;

export default function Deployment({ queryRef }: { queryRef: QueryRef<DeploymentData> }) {
  const pathname = usePathname();

  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environment },
  } = useReadQuery(queryRef);

  const deployment = environment && environment.deployments[0];

  return (
    <>
      <DeploymentTable deployment={deployment as any} cancelDeployment={() => <></>}>
        <LogViewer logs={deployment.buildLog} status={deployment.status} parsed={true} forceLastSectionOpen={true} />
      </DeploymentTable>
    </>
  );
}
