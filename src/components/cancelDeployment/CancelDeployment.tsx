import { Fragment } from 'react';

import { Deployment } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/deployments/(deployments-page)/page';
import { default as cancelDeploy } from '@/lib/mutation/cancelDeployment';
import { StopOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { useNotification } from '@uselagoon/ui-library';
import { Popconfirm, Tooltip } from 'antd';

import { HighLightedDeployment } from './styles';

interface CancelButtonProps {
  action: () => Promise<any>;
  success: boolean;
  loading: boolean;
  error?: {
    message: string;
  };
  beforeText?: string;
  afterText?: string;
  deployName?: string;
}

export const CancelDeploymentButton = ({
  action,
  success,
  loading,
  error,
  beforeText,
  afterText,
  deployName,
}: CancelButtonProps) => {
  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem cancelling deployment.',
    content: error?.message,
    placement: 'top',
    duration: 0,
  });

  if (error) trigger({ content: error.message });

  const cancelDeployText = deployName ? (
    <>
      Are you sure you want to cancel deployment <HighLightedDeployment>{deployName}</HighLightedDeployment>?
    </>
  ) : (
    'Are you sure you want to cancel this deployment?'
  );

  return (
    <>
      <Fragment>{contextHolder}</Fragment>

      {!success && (
        <Popconfirm
          title="Cancel Deployment"
          description={cancelDeployText}
          onConfirm={action}
          okText="Yes"
          cancelText="No"
          styles={{ root: { width: 350 } }}
          okButtonProps={{
            type: 'primary',
            danger: true,
            'data-cy': 'confirm-cancellation',
          }}
          disabled={loading || success}
        >
          <Tooltip title="Cancel Deployment" placement="right">
            <StopOutlined data-cy="cancel-deployment" />
          </Tooltip>
        </Popconfirm>
      )}

      {success ? afterText || 'Cancelled' : beforeText || ''}
    </>
  );
};

const CancelDeployment = ({
  deployment,
  beforeText,
  afterText,
}: {
  deployment: Partial<Deployment>;
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
      deployName={deployment.name}
      beforeText={beforeText}
      afterText={afterText}
    />
  );
};

export default CancelDeployment;
