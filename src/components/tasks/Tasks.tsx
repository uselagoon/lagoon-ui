'use client';

import { usePathname } from 'next/navigation';

import { CarryOutOutlined } from '@ant-design/icons';
import { QueryRef, useReadQuery } from '@apollo/client';
import { Collapse, Head2, Head3, Table, TaskTreeSelector, Text } from '@uselagoon/ui-library';

import { TasksData } from '../../app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/tasks/page';
import { TasksPageWrapper } from './_components/styles';

const { TasksTable } = Table;
export default function Tasks({ queryRef }: { queryRef: QueryRef<TasksData> }) {
  const {
    data: { environment },
  } = useReadQuery(queryRef);
  const pathname = usePathname();

  return (
    <TasksPageWrapper>
      <Text>Run a task on this environment</Text> <br />
      <div className="selector">
        <TaskTreeSelector
          placeholder="Select an action"
          treeData={[
            {
              children: [
                {
                  icon: <CarryOutOutlined />,
                  title: 'Clear Drupal caches [drush cache-clear]',
                  value: '1',
                },
                {
                  icon: <CarryOutOutlined />,
                  title: 'Run Drupal cron [drush cron]]',
                  value: '2',
                },
                {
                  icon: <CarryOutOutlined />,
                  title: 'Copy database between environments [drush sql-sync]',
                  value: '3',
                },
                {
                  icon: <CarryOutOutlined />,
                  title: 'Copy files between backup [drush sql-dump]',
                  value: '4',
                },
                {
                  icon: <CarryOutOutlined />,
                  title: 'Generate database backup',
                  value: '5',
                },
                {
                  icon: <CarryOutOutlined />,
                  title: 'Generate database and files backup (Drush 8 only) [drush archive-dump]',
                  value: '6',
                },
                {
                  icon: <CarryOutOutlined />,
                  title: 'Generate login link [drush uli]',
                  value: '7',
                },
              ],
              selectable: false,
              title: 'Run a task',
              value: 'first',
            },
            {
              children: [
                {
                  icon: <CarryOutOutlined />,
                  title: 'Trigger environment backup',
                  value: 'triggerBackup',
                },
              ],
              selectable: false,
              title: 'Backup',
              value: 'backup',
            },
            {
              children: [
                {
                  icon: <CarryOutOutlined />,
                  title: 'Trigger a deployment',
                  value: 'triggerDeploy',
                },
              ],
              selectable: false,
              title: 'Deploy',
              value: 'deploy',
            },
          ]}
        />
      </div>
      <Head3>Recent Task Activity</Head3>
      <TasksTable basePath={pathname} tasks={environment.tasks} />
    </TasksPageWrapper>
  );
}
