import React from 'react';
import ReactSelect from 'react-select';

import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import gql from 'graphql-tag';

import { SelectWrapper } from './Styles';

const taskDrushSqlDump = gql`
  mutation taskDrushSqlDump($environment: Int!) {
    taskDrushSqlDump(environment: $environment) {
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

const DrushSqlDump = ({ pageEnvironment, onCompleted, onError, onNewTask }) => {
  const [drushSqlDump, { loading, data }] = useMutation(taskDrushSqlDump, {
    variables: { environment: pageEnvironment.id },
    onCompleted,
    onError,
  });

  React.useEffect(() => {
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
      <Button testId="task-btn" action={drushSqlDump} disabled={loading}>
        {loading ? <span className="loader"></span> : 'Run task'}
      </Button>
    </SelectWrapper>
  );
};

export default DrushSqlDump;
