import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import withLogic from 'components/AddTask/components/logic';
import Button from 'components/Button';
import gql from 'graphql-tag';
import useTranslation from 'lib/useTranslation';

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
}) => {
  const t = useTranslation();

  return (
    <Mutation mutation={taskDrushRsyncFiles} onCompleted={onCompleted} onError={onError}>
      {(taskDrushRsyncFiles, { loading, called, error, data }) => {
        return (
          <SelectWrapper>
            <div className="warning" style={{ whiteSpace: 'pre-line' }}>
              {t('tasks.addTask.warning')}
            </div>
            <div className="envSelect">
              <label id="source-env">{t('tasks.addTask.source')}:</label>
              <ReactSelect
                aria-labelledby="source-env"
                placeholder={t('placeholders.selectEnvironment')}
                name="source-environment"
                value={options.find(o => o.value === selectedSourceEnv)}
                onChange={selectedOption => setSelectedSourceEnv(selectedOption.value)}
                options={options}
                required
              />
            </div>
            <div className="envSelect">
              <label id="dest-env">{t('tasks.addTask.destination')}:</label>
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
              action={() =>
                taskDrushRsyncFiles({
                  variables: {
                    sourceEnvironment: selectedSourceEnv,
                    destinationEnvironment: pageEnvironment.id,
                  },
                })
              }
              disabled={!selectedSourceEnv}
            >
              {t('tasks.addTask.run')}
            </Button>
          </SelectWrapper>
        );
      }}
    </Mutation>
  );
};

export default withLogic(DrushRsyncFiles);
