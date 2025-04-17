import React from 'react';
import { useMutation } from '@apollo/client'
import ReactSelect from 'react-select';

import Button from 'components/Button';
import gql from 'graphql-tag';

import { SelectWrapper } from './Styles';

const taskDrushUserLogin = gql`
  mutation taskDrushUserLogin($environment: Int!) {
    taskDrushUserLogin(environment: $environment) {
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

const DrushUserLogin = ({ pageEnvironment, onCompleted, onError, onNewTask }) => {
    const [drushUserLogin, { loading, data }] = useMutation(taskDrushUserLogin, {
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
            <Button testId="task-btn" action={drushUserLogin} disabled={loading}>
                {loading ? <span className="loader"></span> : 'Run task'}
            </Button>
        </SelectWrapper>
    );
};

export default DrushUserLogin;
