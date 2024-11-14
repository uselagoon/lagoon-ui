'use client';

import { startTransition, useState } from 'react';

import Link from 'next/link';

import { DeploymentData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/deployments/[deploymentSlug]/page';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Switch, Table, Text } from '@uselagoon/ui-library';

import CancelDeployment from '../deployments/_components/CancelDeployment';
import LogViewer from '../logViewer/LogViewer';
import BackButton from './_components/BackButton';
import { Switchers } from './_components/styles';

const { DeploymentTable } = Table;

export default function Deployment({ queryRef }: { queryRef: QueryRef<DeploymentData> }) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environment },
  } = useReadQuery(queryRef);

  const deployment = environment && environment.deployments[0];

  console.warn(deployment);

  const [showParsed, setShowParsed] = useState(true);
  const [showSuccessSteps, setShowSuccessSteps] = useState(true);
  const [highlightWarnings, setHighlightWarnings] = useState(true);

  const handleShowParsed = (checked: boolean) => {
    // disable fields that don't make sense for raw logs
    setShowParsed(checked);
    setShowSuccessSteps(checked);
    setHighlightWarnings(checked);
  };
  return (
    <>
      <BackButton />
      <DeploymentTable
        deployment={deployment as any}
        cancelDeployment={() => <CancelDeployment deployment={deployment} />}
      >
        <Switchers>
          <div>
            <Text>Show successful steps</Text>
            <Switch
              disabled={!showParsed}
              checked={showSuccessSteps}
              onChange={checked => setShowSuccessSteps(checked)}
              showLabel={false}
            />
          </div>
          <div>
            <Text>Highlight warnings</Text>
            <Switch
              disabled={!showParsed}
              checked={highlightWarnings}
              onChange={checked => setHighlightWarnings(checked)}
              showLabel={false}
            />
          </div>
          <div>
            <Text>View parsed</Text>
            <Switch checked={showParsed} onChange={checked => handleShowParsed(checked)} showLabel={false} />
          </div>

          {deployment.bulkId ? <Link href={`/bulkdeployment/${deployment.bulkId}`}>View bulk deployment</Link> : null}
        </Switchers>

        <LogViewer
          logs={deployment.buildLog}
          status={deployment.status}
          showParsed={showParsed}
          highlightWarnings={highlightWarnings}
          showSuccessSteps={showSuccessSteps}
          forceLastSectionOpen={true}
        />
      </DeploymentTable>
    </>
  );
}
