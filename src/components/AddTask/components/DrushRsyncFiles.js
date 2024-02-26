import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import withLogic from 'components/AddTask/components/logic';
import Button from 'components/Button';
import gql from 'graphql-tag';

import { SelectWrapper } from './Styles';

const taskDrushRsyncFiles = gql`
  mutation taskDrushRsyncFiles($sourceEnvironment: Int!, $destinationEnvironment: Int!) {
    taskDrushRsyncFiles(sourceEnvironment: $sourceEnvironment, destinationEnvironment: $destinationEnvironment) {
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

const DrushRsyncFiles = ({
  pageEnvironment,
  projectEnvironments,
  selectedSourceEnv,
  setSelectedSourceEnv,
  onCompleted,
  onError,
  options,
  getEnvName,
  onNewTask,
}) => (
  <Mutation mutation={taskDrushRsyncFiles} onCompleted={onCompleted} onError={onError}>
    {(taskDrushRsyncFiles, { loading, called, error, data }) => {
      if (data) {
        onNewTask();
      }
      return (
        <SelectWrapper>
          <div className="warning">
            Warning! <br />
            This task replaces files. Be careful to double check the source and destination environment!
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
            testId='task-btn'
            action={() =>
              taskDrushRsyncFiles({
                variables: {
                  sourceEnvironment: selectedSourceEnv,
                  destinationEnvironment: pageEnvironment.id,
                },
              })
            }
            disabled={!selectedSourceEnv || loading }
          >
            {loading ? <span className="loader"></span> : "Run task"}
          </Button>
        </SelectWrapper>
      );
    }}
  </Mutation>
);

export default withLogic(DrushRsyncFiles);
