import Tasks from '@/components/tasks/Tasks';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWithTasks from '@/lib/query/environmentWithTasks';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { environmentSlug: string };
};

export type Task = {
  adminOnlyView: boolean;
  created: string;
  started: string | null;
  completed: string | null;
  id: number;
  name: string;
  service: string;
  status: string;
  taskName: string;
};

type Environment = {
  id: number;
  openshiftProjectName: string;
  project: {
    name: string;
    problemsUi: boolean;
    factsUi: boolean;
  };
  tasks: Task[];
};

export interface TasksData {
  environment: Environment;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.environmentSlug} | Tasks`,
  };
}

export default async function TasksPage({ params: { environmentSlug } }: { params: { environmentSlug: string } }) {
  return (
    <PreloadQuery
      query={environmentWithTasks}
      variables={{
        displayName: 'Tasks',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => <Tasks queryRef={queryRef as QueryRef<TasksData>} />}
    </PreloadQuery>
  );
}
