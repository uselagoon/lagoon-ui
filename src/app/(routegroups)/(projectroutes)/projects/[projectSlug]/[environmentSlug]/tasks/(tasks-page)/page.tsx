import TasksPage from '@/components/pages/tasks/TasksPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWithTasks from '@/lib/query/environmentWithTasks';
import { QueryRef } from '@apollo/client';

type Props = {
  params: Promise<{ environmentSlug: string }>;
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

export type AdvancedTaskDefinitionArgument = {
  id: number;
  name: string;
  displayName: string;
  type: 'ENVIRONMENT_SOURCE_NAME' | 'ENVIRONMENT_SOURCE_NAME_EXCLUDE_SELF' | 'STRING' | 'NUMERIC';
  range?: any[] | null;
  defaultValue?: string | number | null;
  optional: boolean;
};

export type AdvancedTask = {
  id: number;
  name: string;
  description: string;
  confirmationText?: string;
  type: 'COMMAND' | 'IMAGE';
  environment: number;
  project: number;
  service: string;
  created: string;
  deleted: string;
  adminOnlyView: boolean;
  deployTokenInjection: boolean;
  projectKeyInjection: boolean;
  advancedTaskDefinitionArguments: AdvancedTaskDefinitionArgument[];
  command: string;
  groupName: string;
};

export type EnvironmentWithTasks = {
  id: number;
  name: string;
  openshiftProjectName: string;
  project: {
    id: number;
    name: string;
    problemsUi: boolean;
    factsUi: boolean;
    environments: {
      id: number;
      name: string;
    }[];
  };
  tasks: Task[];
  advancedTasks?: AdvancedTask[];
};

export interface TasksData {
  environment: EnvironmentWithTasks;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.environmentSlug} | Tasks`,
  };
}

export default async function Tasks(props: { params: Promise<{ environmentSlug: string }> }) {
  const params = await props.params;

  const {
    environmentSlug
  } = params;

  return (
    <PreloadQuery
      query={environmentWithTasks}
      variables={{
        displayName: 'Tasks',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => <TasksPage environmentSlug={environmentSlug} queryRef={queryRef as QueryRef<TasksData>} />}
    </PreloadQuery>
  );
}
