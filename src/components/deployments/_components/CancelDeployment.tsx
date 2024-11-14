import { Fragment } from 'react';

import { Deployment } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/deployments/(deployments-page)/page';
import { default as cancelDeploy } from '@/lib/mutation/cancelDeployment';
import { StopOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { useNotification } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';

interface CancelButtonProps {
  action: () => Promise<any>;
  success: boolean;
  loading: boolean;
  error?: {
    message: string;
  };
  beforeText?: string;
  afterText?: string;
}

export const CancelDeploymentButton = ({
  action,
  success,
  loading,
  error,
  beforeText,
  afterText,
}: CancelButtonProps) => {
  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem cancelling deployment.',
    content: error?.message,
    placement: 'top',
    duration: 0,
  });

  return (
    <>
      <Fragment>{contextHolder}</Fragment>

      {!success && (
        <Tooltip title="Cancel Deployment" placement="right">
          <StopOutlined onClick={action} disabled={loading || success} />
        </Tooltip>
      )}

      {success ? afterText || 'Cancelled' : beforeText || ''}
      {error && trigger()}
    </>
  );
};

const CancelDeployment = ({
  deployment,
  beforeText,
  afterText,
}: {
  deployment: Deployment;
  beforeText?: string;
  afterText?: string;
}) => {
  const [cancelDeploymentMutation, { data, loading, error }] = useMutation(cancelDeploy, {
    onError: err => {
      console.error(err);
    },
    variables: {
      deploymentId: deployment.id,
    },
    refetchQueries: ['getEnvironment'],
  });

  return (
    <CancelDeploymentButton
      action={cancelDeploymentMutation}
      success={data && data.cancelDeployment === 'success'}
      loading={loading}
      error={error}
      beforeText={beforeText}
      afterText={afterText}
    />
  );
};

export default CancelDeployment;
