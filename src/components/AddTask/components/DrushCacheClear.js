import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import gql from 'graphql-tag';
import useTranslation from 'lib/useTranslation';

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

const DrushCacheClear = ({ pageEnvironment, onCompleted, onError }) => {
  const t = useTranslation();
  return (
    <Mutation
      mutation={taskDrushCacheClear}
      onCompleted={onCompleted}
      onError={onError}
      variables={{
        environment: pageEnvironment.id,
      }}
    >
      {taskDrushCacheClear => {
        return (
          <SelectWrapper>
            <div className="envSelect">
              <label id="dest-env">{t('tasks.addTask.environment')}:</label>
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
            <Button action={taskDrushCacheClear}>{t('tasks.addTask.run')}</Button>
          </SelectWrapper>
        );
      }}
    </Mutation>
  );
};

export default DrushCacheClear;
