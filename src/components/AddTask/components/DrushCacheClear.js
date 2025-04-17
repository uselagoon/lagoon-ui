import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import { SelectWrapper } from './Styles';

const taskDrushCacheClear = gql`
  mutation taskDrushCacheClear($environment: Int!) {
    taskDrushCacheClear(environment: $environment) {
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

const DrushCacheClear = ({ pageEnvironment, onCompleted, onError, onNewTask }) => {
    const [drushCacheClear, { loading, data }] = useMutation(taskDrushCacheClear, {
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
            <Button testId="task-btn" disabled={loading} action={drushCacheClear}>
                {loading ? <span className="loader"></span> : 'Run task'}
            </Button>
        </SelectWrapper>
    );
};

export default DrushCacheClear;