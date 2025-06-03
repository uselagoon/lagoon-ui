'use client';

import { TasksPageWrapper } from '@/components/pages/tasks/_components/styles';
import { Head3, Table, TaskTreeSelector, Text } from '@uselagoon/ui-library';

const { TasksTable } = Table;
export default function Loading() {
  return (
    <TasksPageWrapper>
      <Head3>Available Tasks</Head3>
      <Text type="secondary">Run a task on this environment</Text>
      <div className="selector">
        <TaskTreeSelector placeholder="Select a task to run" treeData={[]} />
      </div>
      <Head3>Recent Task Activity</Head3>
      <TasksTable skeleton />
    </TasksPageWrapper>
  );
}
