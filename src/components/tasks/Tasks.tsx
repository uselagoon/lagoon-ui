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
import InvokeRegisteredTask, { AdvancedTaskType } from './_components/tasks/InvokeRegisteredTask';

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

  const defaultTasksMap = {
    DrushCacheClear,
    DrushCron,
    DrushSqlSync,
    DrushRsyncFiles,
    DrushSqlDump,
    DrushArchiveDump,
    DrushUserLogin,
  };

  // returns default task options treeData + advancedTasks(if any)
  const taskoptions = getDefaultTaskOptions(advancedTasks, blockedTasks);
  const advancedTasksWithOptions = taskoptions[1].children;

  // options stores advanced task with options
  const selectedAdvancedTaskWithArgs = advancedTasksWithOptions?.find(advTask => advTask.value === selectedTask);

  const allButCurrentEnvironments = environment.project.environments.filter(env => env.id !== environment.id);

  const sharedTaskProps = {
    environment,
    allButCurrentEnvironments,
    refetch,
  };

  const NewTask = defaultTasksMap[selectedTask as keyof typeof defaultTasksMap];

  let isAdvancedTask = false;

  // nothing found, find out if its an advanced task and use <InvokeRegisteredTask/>
  if (!NewTask && selectedTask?.startsWith('InvokeRegisteredTask') && selectedAdvancedTaskWithArgs) {
    isAdvancedTask = true;
  }

  // returns the computed task to run -> default task or advanced
  const renderTask = () => {
    if (!selectedTask) return;

    if (isAdvancedTask) {
      return (
        <InvokeRegisteredTask
          {...sharedTaskProps}
          advancedTask={selectedAdvancedTaskWithArgs as unknown as AdvancedTaskType}
        />
      );
    }

    return <NewTask {...sharedTaskProps} />;
  };
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

      <div className="selected-task">{renderTask()}</div>

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
