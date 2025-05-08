import React from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';
import Button from 'components/Button';
import gql from 'graphql-tag';

const CANCEL_DEPLOYMENT_MUTATION = gql`
  mutation cancelDeployment($deploymentId: Int!) {
    cancelDeployment(input: { deployment: { id: $deploymentId } })
  }
`;

export const CancelDeploymentButton = ({ action, success, loading, error, beforeText, afterText }) => {
  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const openNotificationWithIcon = errorMessage => {
    api['error']({
      message: 'There was a problem cancelling deployment.',
      description: errorMessage,
      placement: 'top',
      duration: 0,
      style: { width: '500px' },
    });
  };
  return (
    <>
      {contextHolder}
      <Button testId="cancelDeployment" action={action} loading={loading} disabled={loading || success}>
        {success ? afterText || 'Cancellation requested' : beforeText || 'Cancel deployment'}
      </Button>
      {error && openNotificationWithIcon(error.message)}
    </>
  );
};

const CancelDeployment = ({ deployment, beforeText, afterText }) => {
  const [cancelDeploy, { loading, error, data }] = useMutation(CANCEL_DEPLOYMENT_MUTATION, {
    variables: {
      deploymentId: deployment.id,
    },
    onError: e => console.error(e),
  });

  return (
    <CancelDeploymentButton
      action={cancelDeploy}
      success={data && data.cancelDeployment === 'success'}
      loading={loading}
      error={error}
      beforeText={beforeText}
      afterText={afterText}
    />
  )};

export default CancelDeployment;
