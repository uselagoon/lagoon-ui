import TaskPage from '@/components/pages/task/TaskPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWithTask from '@/lib/query/environmentWithTask';
import { QueryRef } from '@apollo/client';

type Props = {
  params: Promise<{ environmentSlug: string; projectSlug: string; taskSlug: string }>;
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

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.taskSlug} | Task`,
  };
}

export default async function Task(
  props: {
    params: Promise<{ environmentSlug: string; projectSlug: string; taskSlug: string }>;
  }
) {
  const params = await props.params;

  const {
    environmentSlug,
    projectSlug,
    taskSlug
  } = params;

  return (
    <PreloadQuery
      query={environmentWithTask}
      variables={{
        displayName: 'Task',
        openshiftProjectName: environmentSlug,
        taskName: taskSlug,
      }}
    >
      {queryRef => <TaskPage taskName={taskSlug} queryRef={queryRef as QueryRef<TaskData>} />}
    </PreloadQuery>
  );
}
