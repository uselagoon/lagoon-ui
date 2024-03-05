import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

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

const DrushSqlDump = ({ pageEnvironment, onCompleted, onError, onNewTask }) => (
  <Mutation
    mutation={taskDrushSqlDump}
    onCompleted={onCompleted}
    onError={onError}
    variables={{
      environment: pageEnvironment.id,
    }}
  >
    {(taskDrushSqlDump, { loading, data }) => {
      if (data) {
        onNewTask();
      }
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
          <Button action={taskDrushSqlDump} disabled={loading}>
            {loading ? <span className="loader"></span> : 'Run task'}
          </Button>
        </SelectWrapper>
      );
    }}
  </Mutation>
);

export default DrushSqlDump;
