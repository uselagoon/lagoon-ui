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

export type AdvancedTaskDefinitionArgument = {
  id: number;
  name: string;
  displayName: string;
  type: 'ENVIRONMENT_SOURCE_NAME' | 'ENVIRONMENT_SOURCE_NAME_EXCLUDE_SELF' | 'STRING' | 'NUMERIC';
  range?: string | null;
  defaultValue?: string | null;
  optional: boolean;
};

export type AdvancedTask = {
  id: number;
  name: string;
  description: string;
  confirmationText: string;
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
