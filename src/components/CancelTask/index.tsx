import React, { FC } from 'react';
import { Mutation } from 'react-apollo';

import { ApolloError } from 'apollo-client';
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
}) => (
  <>
    <Button action={action} disabled={loading || success} loading={loading}>
      {success ? afterText : beforeText}
    </Button>

    {error && (
      <div className="cancelTask_result">
        <p>There was a problem cancelling a task.</p>
        <p>{error.message}</p>
      </div>
    )}
  </>
);

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
    {(cancelTask, { loading, error, data }) => (
      <CancelTaskButton
        action={cancelTask}
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
