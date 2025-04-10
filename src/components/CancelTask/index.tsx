import React, { FC } from 'react';
import { Mutation } from 'react-apollo';

import { notification } from 'antd';
import { ApolloError, MutationFunction, MutationResult } from '@apollo/client';
import Button from 'components/Button';
import gql from 'graphql-tag';

const CANCEL_TASK_MUTATION = gql`
  mutation cancelTask($taskName: String!, $taskId: Int!, $environmentId: Int!, $projectId: Int!) {
    cancelTask(
      input: {
        task: { id: $taskId, taskName: $taskName, environment: { id: $environmentId, project: { id: $projectId } } }
      }
    )
  }
`;
interface CancelTaskProps {
  task: {
    id: string;
    taskName: string;
    name?: string;
    adminOnlyView?: boolean;
  };
  environmentId: number;
  projectId: number;
  beforeText: string;
  afterText: string;
}

interface CancelTaskButtonProps {
  action: () => void;
  success: boolean;
  loading: boolean;
  error: ApolloError | undefined;
  beforeText: string;
  afterText: string;
}

export const CancelTaskButton: FC<CancelTaskButtonProps> = ({
  action,
  success,
  loading,
  error,
  beforeText,
  afterText,
}) => {
  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const openNotificationWithIcon = (errorMessage: string) => {
    api['error']({
      message: 'There was a problem cancelling a task.',
      description: errorMessage,
      placement: 'top',
      duration: 0,
      style: { width: '500px' },
    });
  };

  return (
    <>
      {contextHolder}
      <Button testId="cancel-task" action={action} disabled={loading || success} loading={loading}>
        {success ? afterText : beforeText}
      </Button>

      {error && openNotificationWithIcon(error.message)}
    </>
  );
};

const CancelTask: FC<CancelTaskProps> = ({
  task,
  environmentId,
  projectId,
  beforeText = 'Cancel',
  afterText = 'Cancelled',
}) => (
  <Mutation<{
    cancelTask: string;
  }>
    mutation={CANCEL_TASK_MUTATION}
    variables={{
      taskId: task.id,
      taskName: task.taskName,
      environmentId,
      projectId,
    }}
    onError={(e: ApolloError) => console.error(e.message)}
  >
    {(cancelTask: MutationFunction<{ cancelTask: string }>, { loading, error, data }: MutationResult<{ cancelTask: string }>) => (
      <CancelTaskButton
        action={() => {
          void cancelTask();
        }}
        success={(data && data.cancelTask === 'success') || false}
        loading={loading}
        error={error}
        beforeText={beforeText}
        afterText={afterText}
      />
    )}
  </Mutation>
);

export default CancelTask;
