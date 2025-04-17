import React from 'react';
import { useMutation } from '@apollo/client'
import ReactSelect from 'react-select';

import withLogic from 'components/AddTask/components/logic';
import Button from 'components/Button';
import gql from 'graphql-tag';

import { SelectWrapper } from './Styles';

const taskDrushSqlSync = gql`
  mutation taskDrushSqlSync($sourceEnvironment: Int!, $destinationEnvironment: Int!) {
    taskDrushSqlSync(sourceEnvironment: $sourceEnvironment, destinationEnvironment: $destinationEnvironment) {
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

const DrushSqlSync = ({
                        pageEnvironment,
                        selectedSourceEnv,
                        setSelectedSourceEnv,
                        onCompleted,
                        onError,
                        options,
                        onNewTask,
                      }) => {
  const [ sqlSync, { loading, called, error, data }] = useMutation(taskDrushSqlSync, {
    variables: {
      sourceEnvironment: selectedSourceEnv,
      destinationEnvironment: pageEnvironment.id,
    },
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
        <div className="warning">
          Warning! <br/>
          This task overwrites databases. Be careful to double check the source and destination environment!
        </div>
        <div className="envSelect">
          <label id="source-env">Source:</label>
          <ReactSelect
              aria-labelledby="source-env"
              placeholder="Select environment..."
              name="source-environment"
              value={options.find(o => o.value === selectedSourceEnv)}
              onChange={selectedOption => setSelectedSourceEnv(selectedOption.value)}
              options={options}
              required
          />
        </div>
        <div className="envSelect">
          <label id="dest-env">Destination:</label>
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
        <Button
            testId="task-btn"
            action={sqlSync}
            disabled={!selectedSourceEnv || loading}
        >
          {loading ? <span className="loader"></span> : 'Run task'}
        </Button>
      </SelectWrapper>
  );
};

export default withLogic(DrushSqlSync);
