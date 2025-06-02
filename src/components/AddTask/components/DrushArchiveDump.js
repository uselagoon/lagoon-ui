import React, { useEffect } from 'react';
import ReactSelect from 'react-select';

import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import gql from 'graphql-tag';

import { SelectWrapper } from './Styles';

const taskDrushArchiveDump = gql`
  mutation taskDrushArchiveDump($environment: Int!) {
    taskDrushArchiveDump(environment: $environment) {
      id
      name
      status
      created
      started
      completed
      remoteId
      command
      service
    }
  }
`;

const DrushArchiveDump = ({ pageEnvironment, onCompleted, onError, onNewTask }) => {
  const [drushArchiveDump, { loading, data }] = useMutation(taskDrushArchiveDump, {
    variables: { environment: pageEnvironment.id },
    onCompleted,
    onError,
  });

  useEffect(() => {
    if (data) {
      onNewTask();
    }
  }, [data, onNewTask]);

  return (
    <SelectWrapper>
      <div className="envSelect">
        <label id="dest-env">Environment:</label>
        <ReactSelect
          aria-labelledby="dest-env"
          name="dest-environment"
          value={{
            label: pageEnvironment.name,
            value: pageEnvironment.id,
          }}
          options={[
            {
              label: pageEnvironment.name,
              value: pageEnvironment.id,
            },
          ]}
          isDisabled
          required
        />
      </div>
      <Button testId="task-btn" action={drushArchiveDump} disabled={loading}>
        {loading ? <span className="loader"></span> : 'Run task'}
      </Button>
    </SelectWrapper>
  );
};

export default DrushArchiveDump;
