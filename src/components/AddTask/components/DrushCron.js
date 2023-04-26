import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import gql from 'graphql-tag';
import { bp, color, fontSize } from 'lib/variables';

import { SelectWrapper } from './Styles';

const taskDrushCron = gql`
  mutation taskDrushCron($environment: Int!) {
    taskDrushCron(environment: $environment) {
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

const DrushCron = ({ pageEnvironment, onCompleted, onError }) => (
  <Mutation
    mutation={taskDrushCron}
    onCompleted={onCompleted}
    onError={onError}
    variables={{
      environment: pageEnvironment.id,
    }}
  >
    {taskDrushCron => {
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
          <Button action={taskDrushCron}>Run task</Button>
        </SelectWrapper>
      );
    }}
  </Mutation>
);

export default DrushCron;
