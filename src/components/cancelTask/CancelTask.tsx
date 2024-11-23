import { Fragment } from 'react';

import { Task } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/tasks/(tasks-page)/page';
import cancelTask from '@/lib/mutation/cancelTask';
import { StopOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';

interface CancelButtonProps {
  action: () => Promise<any>;
  success: boolean;
  loading: boolean;
  error?: {
    message: string;
  };
  beforeText?: string;
  afterText?: string;
}

export const CancelTaskButton = ({ action, success, loading, error, beforeText, afterText }: CancelButtonProps) => {
  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem cancelling a task.',
    content: error?.message,
    placement: 'top',
    duration: 0,
  });

  if (error) trigger({ content: error.message });

  return (
    <>
      <Fragment>{contextHolder}</Fragment>

      {!success && (
        <Tooltip title="Cancel Task" placement="right">
          <StopOutlined onClick={action} disabled={loading || success} />
        </Tooltip>
      )}

      {success ? afterText || 'Cancelled' : beforeText || ''}
    </>
  );
};

const CancelTask = ({
  task,
  environmentId,
  projectId,
  beforeText,
  afterText,
}: {
  task: Partial<Task>;
  environmentId: number;
  projectId: number;
  beforeText?: string;
  afterText?: string;
}) => {
  const [cancelTaskMutation, { data, loading, error }] = useMutation(cancelTask, {
    onError: err => {
      console.error(err);
    },
    variables: {
      taskId: task.id,
      taskName: task.taskName,
      environmentId,
      projectId,
    },
    refetchQueries: ['getEnvironment'],
  });

  return (
    <CancelTaskButton
      action={cancelTaskMutation}
      success={data && data.cancelDeployment === 'success'}
      loading={loading}
      error={error}
      beforeText={beforeText}
      afterText={afterText}
    />
  );
};

export default CancelTask;
