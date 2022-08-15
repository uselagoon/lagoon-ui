import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import gql from 'graphql-tag';
import { Message } from 'semantic-ui-react';
import Button from 'components/Button';
import { bp, color, fontSize } from 'lib/variables';

const DEPLOY_ENVIRONMENT_LATEST_MUTATION = gql`
  mutation deployEnvironmentLatest($environmentId: Int!) {
    deployEnvironmentLatest(input: { environment: { id: $environmentId } })
  }
`;

/**
 * Button that deploys the latest environment.
 */
const DeployLatest = ({ pageEnvironment: environment, fetchMore }) => {
  const [success, setSuccess] = useState(false);

  const [deploy, { data, loading, error, called }] = useMutation(DEPLOY_ENVIRONMENT_LATEST_MUTATION, {
    onCompleted: () => fetchMore(),
    variables: {environmentId: environment.id }
  });


  let deploymentsEnabled = true;

  if (
    environment.deployType === 'branch' ||
    environment.deployType === 'promote'
  ) {
    if (!environment.deployBaseRef) {
      deploymentsEnabled = false;
    }
  } else if (environment.deployType === 'pullrequest') {
    if (
      !environment.deployBaseRef &&
      !environment.deployHeadRef &&
      !environment.deployTitle
    ) {
      deploymentsEnabled = false;
    }
  } else {
    deploymentsEnabled = false;
  }

  useEffect(() => {
    if (!loading && data && !error) {
      const success = data && data.deployEnvironmentLatest === 'success';
      setSuccess(success);
    }
  }, [data])

  return (
    <>
    <div className="newDeployment">
      {!deploymentsEnabled && (
        <>
          <div className="description">
            Manual deployments are not available for this environment.
          </div>
          <Button disabled>Deploy</Button>
        </>
      )}
      {deploymentsEnabled && (
        <>
          <div className="description">
            {environment.deployType === 'branch' &&
              `Start a new deployment of branch ${environment.deployBaseRef}.`}
            {environment.deployType === 'pullrequest' &&
              `Start a new deployment of pull request ${
                environment.deployTitle
              }.`}
            {environment.deployType === 'promote' &&
              `Start a new deployment from environment ${
                environment.project.name
              }-${environment.deployBaseRef}.`}
          </div>
          <>
            <Button action={deploy} disabled={loading}>
              Deploy
            </Button>
          </>
        </>
      )}
    </div>
     {error && (
        <Message error={error}>
          <p>There was a problem deploying.</p>
          <p>{error.message}</p>
        </Message>
      )}
      {success && (
        <Message success={success}>Deployment queued.</Message>
      )}
      <style jsx>
      {`
        .newDeployment {
          align-items: center;
          background: ${color.white};
          border: 1px solid ${color.lightestGrey};
          border-radius: 3px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          margin-bottom: 2em;
          padding: 15px;

          @media ${bp.wideUp} {
            min-width: 52%;
          }

          .description {
            color: ${color.darkGrey};
          }
        }
      `}
      </style>
    </>
  );
};

export default DeployLatest;
