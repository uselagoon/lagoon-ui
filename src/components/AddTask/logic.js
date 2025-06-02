import React from 'react';

import getConfig from 'next/config';

import { gql, useQuery } from '@apollo/client';
import * as R from 'ramda';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';

const { publicRuntimeConfig } = getConfig();

const withSelectedTask = withState('selectedTask', 'setSelectedTask', null);
const withErrMessage = withState('errMessage', 'setErrMessage', null);

const withOptions = withProps(({ pageEnvironment }) => {
  let options = [
    {
      label: 'Clear Drupal caches [drush cache-clear]',
      value: 'DrushCacheClear',
    },
    {
      label: 'Run Drupal cron [drush cron]',
      value: 'DrushCron',
    },
    {
      label: 'Copy database between environments [drush sql-sync]',
      value: 'DrushSqlSync',
    },
    {
      label: 'Copy files between environments [drush rsync]',
      value: 'DrushRsyncFiles',
    },
    {
      label: 'Generate database backup [drush sql-dump]',
      value: 'DrushSqlDump',
    },
    {
      label: 'Generate database and files backup (Drush 8 only) [drush archive-dump]',
      value: 'DrushArchiveDump',
    },
    {
      label: 'Generate login link [drush uli]',
      value: 'DrushUserLogin',
    },
  ];

  // Add Advanced Task Definitions
  let advancedTasks = pageEnvironment.advancedTasks.map(task => {
    let commandstring = task.command ? `[${task.command}]` : '';
    let label = task.description ? `${task.description} ${commandstring}` : '';
    return {
      id: task.id,
      label: label,
      value: 'InvokeRegisteredTask',
      arguments: task.advancedTaskDefinitionArguments,
      confirmationText: task.confirmationText,
    };
  });
  options = [...options, ...advancedTasks];

  // Remove tasks that are blocklisted.
  options = R.reject(option => R.includes(option.value, publicRuntimeConfig.LAGOON_UI_TASK_BLOCKLIST), options);

  return { options };
});
const withNewTaskHanders = withHandlers({
  onCompleted:
    ({ setSelectedTask }) =>
    () => {
      setSelectedTask('Completed');
    },
  onError:
    ({ setSelectedTask, setErrMessage }) =>
    errMsg => {
      setErrMessage(errMsg);
      setSelectedTask('Error');
    },
});

const query = gql`
  query getProject($name: String!) {
    projectByName(name: $name) {
      id
      productionEnvironment
      environments {
        id
        name
        environmentType
      }
    }
  }
`;

const withProjectEnvironments = BaseComponent => props => {
  const { pageEnvironment } = props;
  const { loading, error, data } = useQuery(query, {
    variables: { name: pageEnvironment.project.name },
  });

  if (loading || error) return null;

  const allEnvironments = data.projectByName.environments;

  return <BaseComponent projectEnvironments={allEnvironments} {...props} />;
};

export default compose(withSelectedTask, withErrMessage, withNewTaskHanders, withOptions, withProjectEnvironments);
