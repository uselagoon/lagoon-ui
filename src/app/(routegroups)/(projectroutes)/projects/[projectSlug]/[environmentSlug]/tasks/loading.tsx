'use client';

import { TasksPageWrapper } from '@/components/tasks/_components/styles';
import { Head3, Table, TaskTreeSelector, Text } from '@uselagoon/ui-library';

const { TasksTable } = Table;
export default function Loading() {
  return (
    <TasksPageWrapper>
      <Text>Run a task on this environment</Text>
      <br />
      <div className="selector">
        <TaskTreeSelector placeholder="Select a task to run" treeData={[]} />
      </div>
      <Head3>Recent Task Activity</Head3>
      <TasksTable skeleton />
    </TasksPageWrapper>
  );
}
