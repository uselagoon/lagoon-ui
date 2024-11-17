'use client';

import { startTransition, useEffect, useState } from 'react';

import { TaskData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/tasks/[taskSlug]/page';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Switch, Table, Text } from '@uselagoon/ui-library';

import BackButton from '../backButton/BackButton';
import CancelTask from '../cancelTask/CancelTask';
import { Switchers } from '../deployment/_components/styles';
import LogViewer from '../logViewer/LogViewer';

const { TaskTable } = Table;

export default function Task({ queryRef }: { queryRef: QueryRef<TaskData> }) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environment },
  } = useReadQuery(queryRef);

  const currentTask = environment && environment.tasks[0];

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
    const shouldPoll = ['new', 'pending', 'queued', 'running'].includes(currentTask.status);

    if (shouldPoll) {
      const intId = setInterval(() => {
        startTransition(async () => {
          await refetch();
        });
      }, 20000);

      return () => clearInterval(intId);
    }
  }, [currentTask, refetch]);

  return (
    <>
      <BackButton />

      <TaskTable
        task={currentTask}
        cancelTask={() => (
          <CancelTask task={currentTask} projectId={environment.project.id} environmentId={environment.id} />
        )}
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
        </Switchers>

        <LogViewer
          logs={currentTask.logs || null}
          status={currentTask.status}
          showParsed={showParsed}
          highlightWarnings={highlightWarnings}
          showSuccessSteps={showSuccessSteps}
          forceLastSectionOpen={true}
        />
      </TaskTable>
    </>
  );
}
