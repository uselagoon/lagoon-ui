import React, { FC, Fragment, startTransition } from 'react';

import { EnvironmentWithTasks } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/tasks/page';
import taskDrushCacheClear from '@/lib/mutation/tasks/taskDrushCacheClear';
import { useMutation } from '@apollo/client';
import { Button, Select, useNotification } from '@uselagoon/ui-library';

import { SelectEnv } from '../styles';

interface Props {
  environment: EnvironmentWithTasks;
  refetch: () => void;
}

const DrushCacheClear: FC<Props> = ({ environment, refetch }) => {
  const [taskDrushCacheClearMutation, { loading, error }] = useMutation(taskDrushCacheClear, {
    onError: err => {
      console.error(err);
      trigger({ content: err.message });
    },
    variables: {
      environment: environment.id,
    },
    refetchQueries: ['getEnvironment'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem running drush cache-clear.',
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const handleTask = async () => {
    await taskDrushCacheClearMutation();
    startTransition(() => {
      refetch();
    });
  };

  return (
    <>
      <SelectEnv>
        <label id="dest-env">Environment:</label>
        <Select
          aria-labelledby="dest-env"
          aria-required
          size="middle"
          value={{
            label: environment.name,
            value: environment.id,
          }}
          options={[
            {
              label: environment.name,
              value: environment.id,
            },
          ]}
          disabled
        />

        <Button
          className="task-btn"
          size="middle"
          test-id="task-btn"
          disabled={loading}
          loading={loading}
          onClick={handleTask}
        >
          Run task
        </Button>
      </SelectEnv>
      <Fragment>{contextHolder}</Fragment>
    </>
  );
};

export default DrushCacheClear;
