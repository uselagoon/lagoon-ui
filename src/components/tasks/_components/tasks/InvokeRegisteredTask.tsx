import React, { FC, Fragment, startTransition, useEffect, useState } from 'react';

import {
  AdvancedTaskDefinitionArgument,
  EnvironmentWithTasks,
} from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/tasks/page';
import invokeRegisteredTask from '@/lib/mutation/tasks/invokeRegisteredTask';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Input, Select, useNotification } from '@uselagoon/ui-library';

import { SelectEnv } from '../styles';

export type AdvancedTaskType = {
  id: number;
  label: string;
  value: string;
  arguments: AdvancedTaskDefinitionArgument[];
  confirmationText?: string;
};

interface Props {
  environment: EnvironmentWithTasks;
  advancedTask: AdvancedTaskType;
  refetch: () => void;
}

const InvokeRegisteredTask: FC<Props> = ({ environment, advancedTask, refetch }) => {
  const [advancedTaskArguments, setAdvancedTaskArguments] = useState<Record<string, any>>({});

  const [invokeRegisteredTaskMutation, { loading, error }] = useMutation(invokeRegisteredTask, {
    onError: err => {
      console.error(err);
      trigger({ content: err.message });
    },
    variables: {
      environment: environment.id,
    },
    refetchQueries: ['getEnvironment'],
  });

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem running drush archive-dump.',
    placement: 'top',
    duration: 0,
    content: error?.message,
  });

  const handleAdvancedTask = async () => {
    await invokeRegisteredTaskMutation({
      variables: {
        environment: environment.id,
        taskRegistration: advancedTask.id,
        argumentValues: (function () {
          let taskArgs: {
            advancedTaskDefinitionArgumentName: string;
            value: string | number;
          }[] = [];

          Object.keys(advancedTaskArguments).forEach(function (key) {
            var value = advancedTaskArguments[key];
            taskArgs.push({ advancedTaskDefinitionArgumentName: key, value: value });
          });
          return taskArgs;
        })(),
      },
    });
    startTransition(() => {
      refetch();
    });
  };

  useEffect(() => {
    let defaultArgValues: Record<string, string | number | boolean> = {};
    advancedTask.arguments.forEach(item => {
      if (item.defaultValue) {
        defaultArgValues[item.name] = item.defaultValue;
      }
    });
    setAdvancedTaskArguments(defaultArgValues);
  }, []);

  let taskArgumentsExist = false;
  let argumentVariablesHaveValues = true;

  if (advancedTask.arguments) {
    taskArgumentsExist = true;

    argumentVariablesHaveValues = advancedTask.arguments.reduce((allValid, currentArgument) => {
      const argumentName = currentArgument.name;
      const isArgumentOptional = currentArgument.optional;

      const hasValue =
        advancedTaskArguments[argumentName] !== undefined && advancedTaskArguments[argumentName] !== null;
      if (!isArgumentOptional && !hasValue) {
        return false;
      }

      // optional arguments can be missing or have a value, so we allow it
      return allValid && true;
    }, true);
  }

  const renderFields = () => {
    return (
      advancedTask.arguments &&
      advancedTask.arguments.map((arg, index) => {
        switch (arg.type) {
          case 'ENVIRONMENT_SOURCE_NAME':
          case 'ENVIRONMENT_SOURCE_NAME_EXCLUDE_SELF':
            return (
              <SelectEnv key={`env-text-${index}`}>
                <label id="source-env">{arg.displayName || arg.name}:</label>
                <Select
                  aria-labelledby={arg.name}
                  placeholder="Select environment..."
                  value={{
                    label: advancedTaskArguments[arg.name],
                    value: advancedTaskArguments[arg.name],
                  }}
                  onChange={selectedOption => {
                    setAdvancedTaskArguments({
                      ...advancedTaskArguments,
                      [arg.name]: selectedOption.value,
                    });
                  }}
                  options={arg.range?.map(opt => ({ label: opt, value: opt }))}
                />
              </SelectEnv>
            );

          default:
            return (
              <SelectEnv key={`env-text-${index}`}>
                <label id="source-env">{arg.displayName || arg.name}:</label>
                <Input
                  type="text"
                  size="middle"
                  name={arg.name}
                  value={advancedTaskArguments[arg.name]}
                  onChange={event => {
                    setAdvancedTaskArguments({
                      ...advancedTaskArguments,
                      [arg.name]: event.target.value,
                    });
                  }}
                />
              </SelectEnv>
            );
        }
      })
    );
  };

  return (
    <>
      {renderFields()}

      {(advancedTask.confirmationText && (
        <>
          <Confirm
            cancelText="Cancel"
            description={advancedTask.confirmationText}
            okText="Confirm task"
            onConfirm={handleAdvancedTask}
            placement="right"
            title="Confirm action"
          >
            <Button loading={loading} className="task-btn" size="middle" disabled={!argumentVariablesHaveValues}>
              Run task
            </Button>
          </Confirm>
        </>
      )) || (
        <Button
          className="task-btn"
          size="middle"
          test-id="task-btn"
          disabled={(taskArgumentsExist && !argumentVariablesHaveValues) || loading}
          loading={loading}
          onClick={handleAdvancedTask}
        >
          Run task
        </Button>
      )}

      <Fragment>{contextHolder}</Fragment>
    </>
  );
};
export default InvokeRegisteredTask;
