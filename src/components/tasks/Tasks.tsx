'use client';

import { usePathname } from 'next/navigation';

import { CarryOutOutlined } from '@ant-design/icons';
import { QueryRef, useReadQuery } from '@apollo/client';
import { Head3, Table, TaskTreeSelector, Text } from '@uselagoon/ui-library';

import { TasksData } from '../../app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/tasks/page';
import { getDefaultTaskOptions } from './_components/defaultTaskOptions';
import { TasksPageWrapper } from './_components/styles';

const { TasksTable } = Table;
export default function Tasks({ queryRef }: { queryRef: QueryRef<TasksData> }) {
  const {
    data: { environment },
  } = useReadQuery(queryRef);
  const pathname = usePathname();

  const advancedTasks = environment?.advancedTasks?.map(task => {
    const commandstring = task.command ? `[${task.command}]` : '';
    const label = task.description ? `${task.description} ${commandstring}` : '';
    return {
      id: task.id,
      label,
      value: 'InvokeRegisteredTask',
      arguments: task.advancedTaskDefinitionArguments,
      confirmationText: task.confirmationText,
    };
  });

  // returns default task options treeData + advancedTasks(if any)
  const taskoptions = getDefaultTaskOptions(advancedTasks);

  console.log(environment);
  console.warn(taskoptions);

  return (
    <TasksPageWrapper>
      <Text>Run a task on this environment</Text>
      <br />
      <div className="selector">
        <TaskTreeSelector
          onChange={e => {
            console.warn(e);
          }}
          placeholder="Select a task to run"
          treeData={taskoptions}
        />
      </div>
      <Head3>Recent Task Activity</Head3>
      <TasksTable basePath={pathname} tasks={environment.tasks} />
    </TasksPageWrapper>
  );
}
