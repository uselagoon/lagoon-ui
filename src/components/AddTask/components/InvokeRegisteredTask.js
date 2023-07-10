import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import gql from 'graphql-tag';
import * as R from 'ramda';
import withState from 'recompose/withState';

import { CustomTaskConfirm } from './CustomTaskConfirm';
import { StyledRegisteredTasks } from './Styles';

const mutationInvokeRegisteredTask = gql`
  mutation invokeRegisteredTask(
    $environment: Int!
    $taskRegistration: Int!
    $argumentValues: [AdvancedTaskDefinitionArgumentValueInput]
  ) {
    invokeRegisteredTask(
      environment: $environment
      advancedTaskDefinition: $taskRegistration
      argumentValues: $argumentValues
    ) {
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

const InvokeRegisteredTask = ({
  pageEnvironment,
  selectedTask,
  advancedTaskArguments,
  setAdvancedTaskArguments,
  onCompleted,
  onError,
  isConfirmOpen,
  setIsConfirmOpen,
}) => {
  let taskArgumentsExist = false;
  let argumentVariablesHaveValues = true;

  if (selectedTask.arguments) {
    taskArgumentsExist = true;
    argumentVariablesHaveValues = selectedTask.arguments.reduce((p, c) => {
      let hasArg = advancedTaskArguments[c['name']];
      if (!advancedTaskArguments[c['optional']]) {
        hasArg = !advancedTaskArguments[c['optional']];
      }
      return hasArg && p;
    }, true);
  }

  const openOnlyIfThereAreArguments = () => {
    if (argumentVariablesHaveValues) {
      setIsConfirmOpen(true);
    }
  };

  return (
    <Mutation
      mutation={mutationInvokeRegisteredTask}
      onCompleted={onCompleted}
      onError={onError}
      variables={{
        environment: pageEnvironment.id,
        taskRegistration: selectedTask.id,
        argumentValues: (() => {
          let taskArgs = [];
          R.forEachObjIndexed((value, key) => {
            taskArgs.push({ advancedTaskDefinitionArgumentName: key, value: value });
          }, advancedTaskArguments);
          return taskArgs;
        })(),
      }}
    >
      {mutationInvokeRegisteredTask => {
        return (
          <StyledRegisteredTasks>
            <div className="taskArguments">
              {selectedTask.arguments &&
                selectedTask.arguments.map((d, index) => {
                  switch (d.type) {
                    case 'ENVIRONMENT_SOURCE_NAME':
                    case 'ENVIRONMENT_SOURCE_NAME_EXCLUDE_SELF':
                      return (
                        <div key={`env-text-${index}`} className="envSelect">
                          <label id="source-env">{d.displayName || d.name} :</label>
                          <ReactSelect
                            aria-labelledby="{d.name}"
                            name="{d.name}"
                            placeholder="Select environment..."
                            value={{
                              label: R.prop(d.name, advancedTaskArguments),
                              value: R.prop(d.name, advancedTaskArguments),
                            }}
                            onChange={selectedOption => {
                              setAdvancedTaskArguments({
                                ...advancedTaskArguments,
                                [d.name]: selectedOption.value,
                              });
                            }}
                            options={d.range.map(opt => ({ label: opt, value: opt }))}
                          />
                        </div>
                      );
                      break;

                    default:
                      return (
                        <div key={`env-text-${index}`} className="envText">
                          <label id="source-env">{d.displayName || d.name} :</label>
                          <input
                            type="text"
                            name="{d.name}"
                            value={d.defaultValue}
                            onChange={event => {
                              setAdvancedTaskArguments({
                                ...advancedTaskArguments,
                                [d.name]: event.target.value,
                              });
                            }}
                          />
                        </div>
                      );
                      break;
                  }
                  return null;
                })}
            </div>
            {(selectedTask.confirmationText && (
              <CustomTaskConfirm
                disabled={!argumentVariablesHaveValues}
                taskText={selectedTask.confirmationText}
                onProceed={mutationInvokeRegisteredTask}
                open={isConfirmOpen}
                openModal={() => {
                  setIsConfirmOpen(true);
                }}
                closeModal={() => {
                  setIsConfirmOpen(false);
                }}
              />
            )) || (
              <Button
                disabled={taskArgumentsExist && !argumentVariablesHaveValues}
                action={mutationInvokeRegisteredTask}
              >
                Run task
              </Button>
            )}
          </StyledRegisteredTasks>
        );
      }}
    </Mutation>
  );
};

//here we attempt to deal with dynamic options
const withAdtaskArgs = withState('advancedTaskArguments', 'setAdvancedTaskArguments', {});
const withIsConfirmOpen = withState('isConfirmOpen', 'setIsConfirmOpen', false);

export default withIsConfirmOpen(withAdtaskArgs(InvokeRegisteredTask));
