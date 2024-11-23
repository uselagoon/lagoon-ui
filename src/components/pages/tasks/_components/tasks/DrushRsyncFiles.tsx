import React, { FC, Fragment, startTransition, useState } from 'react';

import { EnvironmentWithTasks } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/tasks/(tasks-page)/page';
import taskDrushRsyncFiles from '@/lib/mutation/tasks/taskDrushRsyncFiles';
import { useMutation } from '@apollo/client';
import { Button, Select, useNotification } from '@uselagoon/ui-library';
import { Space } from 'antd';

import { SelectEnv } from '../styles';

interface Props {
  environment: EnvironmentWithTasks;
  refetch: () => void;
  allButCurrentEnvironments: {
    id: number;
    name: string;
  }[];
}

const DrushRsyncFiles: FC<Props> = ({ environment, refetch, allButCurrentEnvironments }) => {
  const [selectedSourceEnv, setSelectedSourceEnv] = useState<number>();

  const [taskDrushRsyncFilesMutation, { loading, error }] = useMutation(taskDrushRsyncFiles, {
    onError: err => {
      console.error(err);
      trigger({ content: err.message });
    },
    refetchQueries: ['getEnvironment'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem running drush rsync.',
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const handleTask = async () => {
    await taskDrushRsyncFilesMutation({
      variables: {
        sourceEnvironment: selectedSourceEnv,
        destinationEnvironment: environment.id,
      },
    });
    startTransition(() => {
      refetch();
    });
  };

  const options = allButCurrentEnvironments.map(env => ({
    label: env.name,
    value: env.id,
  }));

  return (
    <>
      <SelectEnv>
        <div className="warning">
          <Space direction="vertical" size="small">
            <span>Warning!</span>
            <span>
              This task overwrites databases. Be careful to double check the source and destination environment!
            </span>
          </Space>
        </div>

        <label id="source-env">Source:</label>

        <Select
          allowClear
          onClear={() => setSelectedSourceEnv(undefined)}
          placeholder="Select source environment..."
          aria-labelledby="source-env"
          aria-required
          size="middle"
          value={options.find(o => o.value === selectedSourceEnv)}
          onSelect={envId => setSelectedSourceEnv(envId)}
          options={options}
          defaultOpen={false}
        />

        <label id="dest-env">Destination:</label>
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
          loading={loading}
          onClick={handleTask}
          disabled={!selectedSourceEnv || loading}
        >
          Run task
        </Button>
      </SelectEnv>
      <Fragment>{contextHolder}</Fragment>
    </>
  );
};

export default DrushRsyncFiles;
