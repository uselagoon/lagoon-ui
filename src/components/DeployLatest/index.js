import React from 'react';
import { Mutation } from 'react-apollo';

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
const DeployLatest = ({ pageEnvironment: environment, ...rest }) => {
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
                    Deploy
                  </Button>

                  {success && <div className="deploy_result">Deployment queued.</div>}

                  {error && (
                    <div className="deploy_result">
                      <p>There was a problem deploying.</p>
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
