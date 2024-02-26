import React from 'react';
import { Mutation } from 'react-apollo';

import { notification } from 'antd';
import Button from 'components/Button';
import gql from 'graphql-tag';

import { NewDeployment } from './StyledDeployLatest';

const DEPLOY_ENVIRONMENT_LATEST_MUTATION = gql`
  mutation deployEnvironmentLatest($environmentId: Int!) {
    deployEnvironmentLatest(input: { environment: { id: $environmentId } })
  }
`;

/**
 * Button that deploys the latest environment.
 */
const DeployLatest = ({ pageEnvironment: environment, onDeploy, ...rest }) => {
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

  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const openNotificationWithIcon = errorMessage => {
    api['error']({
      message: 'There was a problem deploying.',
      description: errorMessage,
      placement: 'top',
      duration: 0,
      style: { width: '500px' },
    });
  };

  return (
    <NewDeployment>
      {!deploymentsEnabled && (
        <React.Fragment>
          <div className="description">Manual deployments are not available for this environment.</div>
          <Button disabled>Deploy</Button>
        </React.Fragment>
      )}
      {deploymentsEnabled && (
        <React.Fragment>
          <div className="description">
            {environment.deployType === 'branch' && `Start a new deployment of branch ${environment.deployBaseRef}.`}
            {environment.deployType === 'pullrequest' &&
              `Start a new deployment of pull request ${environment.deployTitle}.`}
            {environment.deployType === 'promote' &&
              `Start a new deployment from environment ${environment.project.name}-${environment.deployBaseRef}.`}
          </div>
          <Mutation
            onError={e => console.error(e)}
            mutation={DEPLOY_ENVIRONMENT_LATEST_MUTATION}
            variables={{
              environmentId: environment.id,
            }}
          >
            {(deploy, { loading, error, data }) => {
              const success = data && data.deployEnvironmentLatest === 'success';
              if (success) {
                onDeploy();
              }
              return (
                <React.Fragment>
                  {contextHolder}
                  <Button action={deploy} disabled={loading} loading={loading} testId="deploy">
                    Deploy
                  </Button>
                  {success && (
                    <div className="deploy_result" data-cy="deploy_result">
                      Deployment queued.
                    </div>
                  )}
                  {error && openNotificationWithIcon(error.message)}
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
