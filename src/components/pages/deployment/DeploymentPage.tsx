'use client';

import { startTransition, useEffect, useState } from 'react';

import Link from 'next/link';

import { DeploymentData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/deployments/[deploymentSlug]/page';
import BackButton from '@/components/backButton/BackButton';
import CancelDeployment from '@/components/cancelDeployment/CancelDeployment';
import DeploymentNotFound from '@/components/errors/DeploymentNotFound';
import LogViewer from '@/components/logViewer/LogViewer';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Switch, Table, Text } from '@uselagoon/ui-library';

import { Switchers } from './_components/styles';

const { DeploymentTable } = Table;

export default function DeploymentPage({
  queryRef,
  deploymentName,
}: {
  queryRef: QueryRef<DeploymentData>;
  deploymentName: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environment },
  } = useReadQuery(queryRef);

  if (!environment?.deployments.length) {
    return <DeploymentNotFound deploymentName={deploymentName} />;
  }

  const deployment = environment && environment.deployments[0];

  const [showParsed, setShowParsed] = useState(true);
  const [showSuccessSteps, setShowSuccessSteps] = useState(true);
  const [highlightWarnings, setHighlightWarnings] = useState(true);

  const handleShowParsed = (checked: boolean) => {
    // disable fields that don't make sense for raw logs
    setShowParsed(checked);
    setShowSuccessSteps(checked);
    setHighlightWarnings(checked);
  };

  // polling every 20s if status needs to be checked
  useEffect(() => {
    const shouldPoll = ['new', 'pending', 'queued', 'running'].includes(deployment.status);

    if (shouldPoll) {
      const intId = setInterval(() => {
        startTransition(async () => {
          await refetch();
        });
      }, 20000);

      return () => clearInterval(intId);
    }
  }, [deployment, refetch]);

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
            <Switch
              data-cy="logviewer-toggle"
              checked={showParsed}
              onChange={checked => handleShowParsed(checked)}
              showLabel={false}
            />
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
          logsTarget="deployment"
        />
      </DeploymentTable>
    </>
  );
}
