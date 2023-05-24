import React from 'react';
import { Mutation } from 'react-apollo';

import Button from 'components/Button';
import gql from 'graphql-tag';
import useTranslation from 'lib/useTranslation';

import { NewDeployment } from './StyledDeployLatest';

const DEPLOY_ENVIRONMENT_LATEST_MUTATION = gql`
  mutation deployEnvironmentLatest($environmentId: Int!) {
    deployEnvironmentLatest(input: { environment: { id: $environmentId } })
  }
`;

/**
 * Button that deploys the latest environment.
 */
const DeployLatest = ({ pageEnvironment: environment, ...rest }) => {
  const t = useTranslation();
  let deploymentsEnabled = true;

  if (environment.deployType === 'branch' || environment.deployType === 'promote') {
    if (!environment.deployBaseRef) {
      deploymentsEnabled = false;
    }
  } else if (environment.deployType === 'pullrequest') {
    if (!environment.deployBaseRef && !environment.deployHeadRef && !environment.deployTitle) {
      deploymentsEnabled = false;
    }
  } else {
    deploymentsEnabled = false;
  }

  return (
    <NewDeployment>
      {!deploymentsEnabled && (
        <React.Fragment>
          <div className="description">{t('deployments.deployLatest.noManualDeployments')}</div>
          <Button disabled>{t('deployments.deployLatest.deploy')}</Button>
        </React.Fragment>
      )}
      {deploymentsEnabled && (
        <React.Fragment>
          <div className="description">
            {environment.deployType === 'branch' &&
              t('deployments.deployLatest.branchDeployment', {
                branch: environment.deployBaseRef,
              })}

            {environment.deployType === 'pullrequest' &&
              t('deployments.deployLatest.prDeployment', {
                title: environment.deployTitle,
              })}

            {environment.deployType === 'promote' &&
              t('deployments.deployLatest.promote', {
                project: environment.project.name,
                ref: environment.deployBaseRef,
              })}
          </div>
          <Mutation
            mutation={DEPLOY_ENVIRONMENT_LATEST_MUTATION}
            variables={{
              environmentId: environment.id,
            }}
          >
            {(deploy, { loading, error, data }) => {
              const success = data && data.deployEnvironmentLatest === 'success';
              return (
                <React.Fragment>
                  <Button action={deploy} disabled={loading}>
                    {t('deployments.deployLatest.deploy')}
                  </Button>

                  {success && <div className="deploy_result">{t('deployments.deployLatest.deploymentQueued')}</div>}

                  {error && (
                    <div className="deploy_result">
                      <p>{t('deployments.deployLatest.deploymentProblem')}</p>
                      <p>{error.message}</p>
                    </div>
                  )}
                </React.Fragment>
              );
            }}
          </Mutation>
        </React.Fragment>
      )}
    </NewDeployment>
  );
};

export default DeployLatest;
