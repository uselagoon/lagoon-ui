'use client';

import { useState } from 'react';

import { useEnvContext } from 'next-runtime-env';
import { usePathname } from 'next/navigation';

import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Head3, Select, Table, TaskTreeSelector, Text } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { TasksData } from '../../app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/tasks/page';
import { getDefaultTaskOptions } from './_components/defaultTaskOptions';
import { tasksFilterOptions } from './_components/filterValues';
import { TasksPageWrapper } from './_components/styles';
import DrushArchiveDump from './_components/tasks/DrushArchiveDump';
import DrushCacheClear from './_components/tasks/DrushCacheClear';
import DrushCron from './_components/tasks/DrushCron';
import DrushRsyncFiles from './_components/tasks/DrushRsyncFiles';
import DrushSqlDump from './_components/tasks/DrushSqlDump';
import DrushSqlSync from './_components/tasks/DrushSqlSync';
import DrushUserLogin from './_components/tasks/DrushUserLogin';

type TaskType =
  | 'DrushCacheClear'
  | 'DrushCron'
  | 'DrushSqlSync'
  | 'DrushRsyncFiles'
  | 'DrushSqlDump'
  | 'DrushArchiveDump'
  | 'DrushUserLogin'
  | 'InvokeRegisteredTask';

const { TasksTable } = Table;
export default function Tasks({ queryRef }: { queryRef: QueryRef<TasksData> }) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environment },
  } = useReadQuery(queryRef);
  const pathname = usePathname();

  const [{ tasks_count }, setQuery] = useQueryStates({
    tasks_count: {
      defaultValue: 10,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 10),
    },
  });

  const setTasksCount = (val: string) => {
    setQuery({ tasks_count: Number(val) });
  };

  const [selectedTask, setSelectedTask] = useState<TaskType>();

  const { LAGOON_UI_TASK_BLOCKLIST } = useEnvContext();
  const blockedTasks = JSON.parse(LAGOON_UI_TASK_BLOCKLIST as string) as string[];

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
  const taskoptions = getDefaultTaskOptions(advancedTasks, blockedTasks);

  console.log(blockedTasks);
  console.warn(taskoptions);

  const allButCurrentEnvironments = environment.project.environments.filter(env => env.id !== environment.id);

  const sharedTaskProps = {
    environment,
    allButCurrentEnvironments,
    refetch,
  };

  const tasksMap = {
    DrushCacheClear,
    DrushCron,
    DrushSqlSync,
    DrushRsyncFiles,
    DrushSqlDump,
    DrushArchiveDump,
    DrushUserLogin,
  };

  const NewTask = tasksMap[selectedTask as keyof typeof tasksMap];

  return (
    <TasksPageWrapper>
      <Text>Run a task on this environment</Text>
      <br />
      <div className="selector">
        <TaskTreeSelector
          allowClear
          onChange={setSelectedTask}
          placeholder="Select a task to run"
          treeData={taskoptions}
        />
      </div>

      <div className="selected-task">{selectedTask && NewTask ? <NewTask {...sharedTaskProps} /> : null}</div>

      <Head3>Recent Task Activity</Head3>
      <TasksTable
        basePath={pathname}
        tasks={environment.tasks}
        resultsPerPage={tasks_count}
        resultDropdown={
          <Select
            options={tasksFilterOptions}
            value={tasks_count}
            defaultOpen={false}
            placeholder="Number of facts"
            onSelect={val => {
              setTasksCount(val);
            }}
          />
        }
      />
    </TasksPageWrapper>
  );
}
