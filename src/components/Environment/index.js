import React from 'react';
import { Mutation } from 'react-apollo';

import Router from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import ActiveStandbyConfirm from 'components/ActiveStandbyConfirm';
import DeleteConfirm from 'components/DeleteConfirm';
import KeyFacts from 'components/KeyFacts';
import giturlparse from 'git-url-parse';
import DeleteEnvironmentMutation from 'lib/mutation/DeleteEnvironment';
import SwitchActiveStandbyMutation from 'lib/mutation/SwitchActiveStandby';
import EnvironmentByOpenshiftProjectNameWithFactsQuery from 'lib/query/EnvironmentByOpenshiftProjectNameWithFacts';
import moment from 'moment';

import { keyFactCategories } from '../../constants/keyFactImageMap';
import { StyledEnvironmentDetails } from './StyledEnvironment';

const deduplicateFacts = facts => {
  const seen = new Set();

  const uniqueFacts = facts.filter(fact => {
    const keyFactAllowed = keyFactCategories.includes(fact.category);
    if (!keyFactAllowed) return false;

    const key = `${fact.name}-${fact.category}-${fact.value}`;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
  return uniqueFacts;
};

/**
 * Displays the environment information.
 */
const Environment = ({ environment }) => {
  const { data, error: factsError } = useQuery(EnvironmentByOpenshiftProjectNameWithFactsQuery, {
    variables: {
      openshiftProjectName: environment.openshiftProjectName,
    },
  });

  const hasFactViewPermission = !factsError?.message?.includes('Unauthorized');
  const environmentFacts = data?.environment?.facts ?? [];

  let gitUrlParsed;

  try {
    gitUrlParsed = giturlparse(environment.project.gitUrl);
  } catch {
    gitUrlParsed = null;
  }

  const gitBranchLink = gitUrlParsed
    ? `${gitUrlParsed.resource}/${gitUrlParsed.full_name}/${
        environment.deployType === 'branch'
          ? `tree/${environment.name}`
          : `pull/${environment.name.replace(/pr-/i, '')}`
      }`
    : '';

  const navigateToTasks = () => {
    const projectName = environment.project.name;

    const taskNavObject = {
      urlObject: {
        pathname: '/tasks',
        query: { openshiftProjectName: environment.openshiftProjectName },
      },
      asPath: `/projects/${projectName}/${environment.openshiftProjectName}/tasks`,
    };

    Router.push(taskNavObject.urlObject, taskNavObject.asPath);
  };

  const handleEnvironmentDelete = () => {
    const projectName = environment.project.name;

    const navigationObject = {
      urlObject: {
        pathname: '/project',
        query: { projectName: projectName },
      },
      asPath: `/projects/${projectName}`,
    };

    Router.push(navigationObject.urlObject, navigationObject.asPath);
  };

  const keyFacts = deduplicateFacts(environmentFacts);

  return (
    <StyledEnvironmentDetails className="details" data-cy="env-details">
      <div className="field-wrapper environmentType">
        <div>
          <label>Environment Type</label>
          <div className="field" data-cy="envType">
            {environment.environmentType}
            {environment.project.productionEnvironment &&
              environment.project.standbyProductionEnvironment &&
              environment.environmentType == 'production' &&
              environment.project.productionEnvironment == environment.name &&
              ' (active)'}
            {environment.project.productionEnvironment &&
              environment.project.standbyProductionEnvironment &&
              environment.environmentType == 'production' &&
              environment.project.standbyProductionEnvironment == environment.name &&
              ' (standby)'}
          </div>
        </div>
      </div>
      <div className="field-wrapper deployType">
        <div>
          <label>Deployment Type</label>
          <div className="field" data-cy="deployType">
            {environment.deployType}
          </div>
        </div>
      </div>
      <div className="field-wrapper created">
        <div>
          <label>Created</label>
          <div className="field">{moment.utc(environment.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}</div>
        </div>
      </div>
      <div className="field-wrapper updated">
        <div>
          <label>Last Deploy</label>
          <div className="field">{moment.utc(environment.updated).local().format('DD MMM YYYY, HH:mm:ss (Z)')}</div>
        </div>
      </div>

      {gitBranchLink ? (
        <div className="field-wrapper source">
          <div>
            <label>Source</label>
            <div className="field">
              <a className="hover-state" data-cy="source" target="_blank" href={`https://${gitBranchLink}`}>
                {gitBranchLink}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="field-wrapper giturl">
          <div>
            <label>Git URL</label>
            <p>{environment.project.gitUrl}</p>
          </div>
        </div>
      )}

      <div className="field-wrapper routes">
        {environment.project.productionEnvironment &&
          environment.project.standbyProductionEnvironment &&
          environment.environmentType == 'production' &&
          environment.project.productionEnvironment == environment.name && (
            <div>
              <label>Active Environment Routes</label>
              <div className="field">
                {environment.project.productionRoutes
                  ? environment.project.productionRoutes.split(',').map(route => (
                      <div key={route}>
                        <a className="hover-state" target="_blank" href={route}>
                          {route}
                        </a>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          )}
        {environment.project.productionEnvironment &&
          environment.project.standbyProductionEnvironment &&
          environment.environmentType == 'production' &&
          environment.project.standbyProductionEnvironment == environment.name && (
            <div>
              <label>Standby Environment Routes</label>
              <div className="field">
                {environment.project.standbyRoutes
                  ? environment.project.standbyRoutes.split(',').map(route => (
                      <div key={route}>
                        <a className="hover-state" target="_blank" href={route}>
                          {route}
                        </a>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          )}
        <div>
          <label>Routes</label>
          <div className="field" data-cy="routes">
            {environment.routes
              ? environment.routes.split(',').map(route => (
                  <div key={route}>
                    <a className="hover-state" target="_blank" href={route}>
                      {route}
                    </a>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>

      {hasFactViewPermission && keyFacts.length > 0 && <KeyFacts keyFacts={keyFacts} />}

      {environment.project.productionEnvironment &&
        environment.project.standbyProductionEnvironment &&
        environment.environmentType == 'production' &&
        environment.project.standbyProductionEnvironment == environment.name && (
          <Mutation mutation={SwitchActiveStandbyMutation} onCompleted={navigateToTasks}>
            {(switchActiveStandby, { loading, called, error, data }) => {
              const switchActiveBranch = () => {
                const input = {
                  project: {
                    name: environment.project.name,
                  },
                };

                switchActiveStandby({ variables: { input } });
              };

              if (!error && called && loading) {
                return <div>Switching Standby Environment to Active...</div>;
              }

              return (
                <ActiveStandbyConfirm
                  activeEnvironment={environment.project.productionEnvironment}
                  standbyEnvironment={environment.project.standbyProductionEnvironment}
                  onProceed={switchActiveBranch}
                />
              );
            }}
          </Mutation>
        )}
      <Mutation
        mutation={DeleteEnvironmentMutation}
        onCompleted={handleEnvironmentDelete}
        onError={e => console.error(e)}
      >
        {(deleteEnvironment, { loading, called, error, data }) => {
          if (error) {
            return <div>{error.message}</div>;
          }

          return (
            <DeleteConfirm
              deleteType="environment"
              deleteName={environment.name}
              loading={loading}
              data={data}
              onDelete={() =>
                deleteEnvironment({
                  variables: {
                    input: {
                      name: environment.name,
                      project: environment.project.name,
                    },
                  },
                })
              }
            />
          );
        }}
      </Mutation>
    </StyledEnvironmentDetails>
  );
};

export default Environment;
