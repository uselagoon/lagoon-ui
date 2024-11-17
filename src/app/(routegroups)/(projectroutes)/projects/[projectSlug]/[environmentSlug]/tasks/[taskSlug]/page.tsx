import Task from '@/components/task/Task';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWithTask from '@/lib/query/environmentWithTask';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { environmentSlug: string; projectSlug: string; taskSlug: string };
};

export type Task = {
  id: number;
  name: string;
  taskName: string;
  status: 'running' | 'complete' | 'failed' | 'error' | 'queued' | 'new' | 'cancelled';
  created: string;
  started: string | null;
  completed: string | null;
  service: string;
  logs: string | null;
  adminOnlyView: boolean;
  files: {
    id: number;
    filename: string;
    download: string;
    created: string;
  }[];
};

type Environment = {
  id: number;
  name: string;
  openshiftProjectName: string;
  project: {
    id: number;
    name: string;
  };
  tasks: Task[];
};

export interface TaskData {
  environment: Environment;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.taskSlug} | Task`,
  };
}

export default async function TaskPage({
  params: { environmentSlug, projectSlug, taskSlug },
}: {
  params: { environmentSlug: string; projectSlug: string; taskSlug: string };
}) {
  return (
    <PreloadQuery
      query={environmentWithTask}
      variables={{
        displayName: 'Task',
        openshiftProjectName: environmentSlug,
        taskName: taskSlug,
      }}
    >
      {queryRef => <Task queryRef={queryRef as QueryRef<TaskData>} />}
    </PreloadQuery>
  );
}
